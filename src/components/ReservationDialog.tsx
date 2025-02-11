import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SampleImage from "../assets/SampleImage.png";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { dateFormatter } from "../utils";
import { useCallback, useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  loginStateAtom,
  myCurrentReservationAtom,
  Permission,
  reservationSeatAtom,
} from "../states";
import axiosInstance, {
  getCsrfToken,
  SERVER_HOST,
} from "../utils/axiosInstance";
import TokenRefresher from "./TokenRefresher";
import { useNavigate } from "react-router";
import axios from "axios";
import dayjs from "dayjs";

interface ReservationDialogProps {
  seatName: string;
  open: boolean;
  onClose: () => void;
}

const ReservationDialog = (props: ReservationDialogProps) => {
  const { seatName, open, onClose } = props;

  const [ettiqutte, setEttiqutte] = useState("");
  const [caution, setCaution] = useState("");
  const [pcSupport, setPcSupport] = useState("");
  const [seatImage, setSeatImage] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [endTime, setEndTime] = useState({ hour: 0, minute: 0 });
  const [isBooked, setIsBooked] = useState(false);
  const [person, setPerson] = useState(""); // TODO: 명칭 변경 필요

  const loginState = useAtomValue(loginStateAtom);

  // 정보 불러오기
  const fetchSeatInfo = useCallback(async () => {
    // 좌석 이름이 없으면 종료
    if (!seatName) {
      return;
    }

    try {
      let seatInfo;
      if (loginState.isLoggedIn) {
        // 권한 확인 API 호출
        const response = await axiosInstance.get("/users/info", {
          headers: {
            "X-CSRF-Token": await getCsrfToken(), // CSRF 토큰 헤더 추가
          },
        });

        // 사용자 권한
        const userPermission = response.data.user.permission;

        // 권한에 따른 좌석 정보 불러오기
        let seatsResponse;
        if (userPermission === "admin" || userPermission === "superadmin") {
          seatsResponse = await axiosInstance.get(`/admin/seats/${seatName}`);
        } else {
          seatsResponse = await axios.get(`${SERVER_HOST}/seats/${seatName}`);
        }
        seatInfo = seatsResponse.data.seat;
      } else {
        const seatsResponse = await axios.get(
          `${SERVER_HOST}/seats/${seatName}`
        );
        seatInfo = seatsResponse.data.seat;
      }

      setEttiqutte(seatInfo.basicManners);
      setCaution(seatInfo.warning);
      setPcSupport(seatInfo.pc_support);
      setSeatImage(seatInfo.image);

      const newIsBooked = !!seatInfo.userName && seatInfo.userName !== "없음";
      setIsBooked(newIsBooked);

      const reservationStartTime = seatInfo.reservationTime;
      const availableEndTime = seatInfo.availableEndTime.substring(0, 5);

      const newEndTime = availableEndTime.split(":");
      setEndTime({ hour: newEndTime[0], minute: newEndTime[1] });

      if (!newIsBooked && loginState.permission !== Permission.USER) {
        setReservationTime("예약 없음");
      } else if (reservationStartTime) {
        setReservationTime(`${reservationStartTime} ~ ${availableEndTime}`);
      } else {
        setReservationTime(
          `${new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })} ~ ${availableEndTime}`
        );
      }

      const newPerson = `${seatInfo.userStudentId} ${seatInfo.userName}`;
      setPerson(newIsBooked ? newPerson : "예약 없음");
    } catch (error) {
      console.error("좌석 데이터를 가져오는 중 오류 발생:", error);
    }
  }, [loginState.isLoggedIn, loginState.permission, seatName]);

  useEffect(() => {
    fetchSeatInfo();
  }, [fetchSeatInfo]);

  // 예약 버튼 클릭
  const navigate = useNavigate();
  const handleReservationButtonClick = useCallback(async () => {
    if (!loginState.isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      onClose();
      navigate("/login");
      return;
    }

    try {
      axiosInstance
        .post(
          "/reservations",
          {
            userId: loginState.userId,
            seat_name: seatName,
          },
          {
            headers: {
              "X-CSRF-Token": await getCsrfToken(), // CSRF 토큰 추가
            },
          }
        )
        .then(() => {
          alert("성공적으로 예약되었습니다.");
        })
        .catch((error) => {
          console.error("예약 요청 실패:", error);
          if (error.response?.status === 403) {
            alert("CSRF 토큰 오류: 요청을 다시 시도해 주세요.");
          } else {
            alert(
              `예약에 실패했습니다.\n원인: ${
                error.response?.data?.message || "알 수 없는 오류"
              }`
            );
          }
        })
        .finally(() => {
          onClose();
          window.location.reload(); // 창 새로고침
        });
    } catch (error) {
      console.error("예약 중 오류 발생:", error);
      alert("예약 중 오류가 발생했습니다.");
    }
  }, [loginState.isLoggedIn, loginState.userId, navigate, onClose, seatName]);

  // 강제 퇴실 사유
  const [reason, setReason] = useState("");
  const handleReasonChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReason(e.target.value);
    },
    []
  );

  // 강제 퇴실 버튼 클릭
  const [isForceCancelSending, setIsForceCancelSending] = useState(false);
  const handleForceCancelButtonClick = useCallback(() => {
    setIsForceCancelSending(true);

    getCsrfToken()
      .then((csrfToken) => {
        return axiosInstance.post(
          `/admin/force-exit`,
          {
            seatName: seatName,
            reason: reason,
            userId: loginState.userId,
          },
          {
            headers: {
              "X-CSRF-Token": csrfToken,
            },
          }
        );
      })
      .then((response) => {
        alert(response.data.message); // 이메일 전송 결과도 포함된 메시지 표시
      })
      .catch((error) => {
        console.error("강제퇴실 처리 중 오류 발생:", error);
        alert("강제 퇴실 처리 중 오류가 발생했습니다.");
      })
      .finally(() => {
        onClose();
        setIsForceCancelSending(false);
        window.location.reload(); // 창 새로고침
      });
  }, [loginState.userId, onClose, reason, seatName]);

  // 내 예약 정보 불러오기
  const [reservationSeat, setReservationSeat] = useAtom(reservationSeatAtom);
  const setMyCurrentReservation = useSetAtom(myCurrentReservationAtom);

  // 퇴실 버튼 클릭
  const handleExitButtonClick = useCallback(async () => {
    // CSRF 토큰 가져오기
    getCsrfToken()
      .then((csrfToken) => {
        // 좌석 퇴실 API 호출
        return axiosInstance.delete("/reservations", {
          headers: {
            "X-CSRF-Token": csrfToken, // CSRF 토큰 헤더 추가
          },
        });
      })
      .then((response) => {
        alert(
          response.data.message || "좌석 퇴실이 성공적으로 완료되었습니다."
        );
        onClose();
        setReservationSeat("");
        setMyCurrentReservation(null);
        window.location.reload(); // 창 새로고침
      })
      .catch((error) => {
        console.error("퇴실 처리 중 오류 발생:", error);
        if (error.response?.status === 403) {
          alert("CSRF 토큰 오류: 요청을 다시 시도해 주세요.");
        } else {
          alert(
            error.response?.data?.message || "퇴실 처리 중 오류가 발생했습니다."
          );
        }
      });
  }, [onClose, setMyCurrentReservation, setReservationSeat]);

  return (
    <TokenRefresher>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          padding: "20px",
          "& .MuiDialog-paper": {
            margin: "0",
            width: "100%",
          },
        }}
        fullWidth
      >
        <DialogTitle
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* 대화상자 제목 */}
          FabLab
          {/* 닫기 버튼 */}
          <IconButton aria-label="close" onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        {/* 구분선 */}
        <Divider variant="middle" />

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* 좌석명 */}
          <Typography variant="h2">{seatName} 좌석</Typography>

          {/* 좌석 정보 */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap-reverse"
            gap={2}
          >
            <Stack direction="row" spacing={2}>
              {/* 컬럼명 */}
              <Stack gap={0.5}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight="bold"
                >
                  예약좌석
                </Typography>
                {loginState.permission !== Permission.USER && (
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    fontWeight="bold"
                  >
                    예약자
                  </Typography>
                )}
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight="bold"
                >
                  예약날짜
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight="bold"
                >
                  예약시간
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight="bold"
                >
                  PC 지원
                </Typography>
              </Stack>

              {/* 값 */}
              <Stack spacing={0.5}>
                <Typography variant="subtitle1">{seatName}</Typography>
                {loginState.permission !== Permission.USER && (
                  <Typography variant="subtitle1">{person}</Typography>
                )}
                <Typography variant="subtitle1">
                  {isBooked || loginState.permission === Permission.USER
                    ? dateFormatter.format(new Date())
                    : "예약 없음"}
                </Typography>
                <Typography variant="subtitle1">{reservationTime}</Typography>
                <Typography variant="subtitle1">{pcSupport}</Typography>
              </Stack>
            </Stack>

            {/* 좌석 사진 */}
            <Box
              component="img"
              alt="좌석 사진"
              src={seatImage ? seatImage : SampleImage}
              width="130px"
              border="1px solid #727272"
              borderRadius="10px"
              boxShadow="3px 3px 3px rgba(0,0,0,0.4)"
            />
          </Stack>

          {/* 기본 예절 */}
          <Stack padding="5px 15px" sx={{ backgroundColor: "#f4f4f6" }}>
            <TextField
              multiline
              value={ettiqutte}
              variant="standard"
              disabled
              sx={{
                "& .MuiInput-input": {
                  WebkitTextFillColor: "black !important",
                },
                "& .MuiInputBase-root:before": {
                  content: "none",
                },
              }}
            />
          </Stack>

          {/* 주의사항 */}
          <Stack>
            {/* 주의사항 제목 */}
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
              * 주의사항 *
            </Typography>

            {/* 내용 */}
            <Stack padding="5px 15px" sx={{ backgroundColor: "#f4f4f6" }}>
              <TextField
                multiline
                value={caution}
                variant="standard"
                disabled
                sx={{
                  "& .MuiInput-input": {
                    WebkitTextFillColor: "black !important",
                  },
                  "& .MuiInputBase-root:before": {
                    content: "none",
                  },
                }}
              />
            </Stack>
          </Stack>

          {/* 예약 버튼 */}
          <Button
            variant="contained"
            sx={{
              fontSize: "1.5em",
              fontWeight: "bold",
              display:
                !loginState.isLoggedIn ||
                (loginState.permission === Permission.USER && !reservationSeat)
                  ? "block"
                  : "none",
            }}
            onClick={handleReservationButtonClick}
            disabled={
              !dayjs().isBefore(
                dayjs().hour(endTime.hour).minute(endTime.minute)
              )
            }
          >
            {dayjs().isBefore(dayjs().hour(endTime.hour).minute(endTime.minute))
              ? "동의 후 예약"
              : "운영 시간이 아닙니다."}
          </Button>

          {/* 관리자용 강제 퇴실 버튼 */}
          <Stack
            gap={4}
            display={
              loginState.isLoggedIn &&
              loginState.permission !== Permission.USER &&
              isBooked
                ? "flex"
                : "none"
            }
          >
            <Stack>
              <Typography variant="subtitle1" color="primary" fontWeight="bold">
                강제 퇴실
              </Typography>
              <TextField
                placeholder="강제 퇴실 사유"
                value={reason}
                onChange={handleReasonChange}
              />
            </Stack>
            <Button
              variant="outlined"
              color="error"
              sx={{
                fontSize: "1.5em",
                fontWeight: "bold",
              }}
              onClick={handleForceCancelButtonClick}
              loading={isForceCancelSending}
              loadingPosition="start"
            >
              강제 퇴실
            </Button>
          </Stack>

          {/* 퇴실 버튼 */}
          <Button
            variant="outlined"
            color="error"
            sx={{
              fontSize: "1.5em",
              fontWeight: "bold",
              display:
                loginState.isLoggedIn &&
                loginState.permission === Permission.USER &&
                reservationSeat === seatName
                  ? "block"
                  : "none",
            }}
            onClick={handleExitButtonClick}
          >
            퇴실하기
          </Button>
        </DialogContent>
      </Dialog>
    </TokenRefresher>
  );
};

export default ReservationDialog;
