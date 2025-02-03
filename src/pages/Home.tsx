import {
  Box,
  Button,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import FabLabImage from "../assets/FabLabImage.jpg";
import { theme } from "../utils";
import { Link, useNavigate } from "react-router";
import SmapleImage from "../assets/SampleImage.png";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  loginStateAtom,
  myCurrentReservationAtom,
  Permission,
  reservationSeatAtom,
} from "../states";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";
import { useCallback, useEffect, useState } from "react";
import TokenRefresher from "../components/TokenRefresher";
import axiosInstance, { getCsrfToken } from "../utils/axiosInstance";

const LinkCss = {
  textDecoration: "none",
  color: "black",
};

// 내 예약 정보 인터페이스

const Home = () => {
  const loginState = useAtomValue(loginStateAtom); // 로그인 상태
  const navigate = useNavigate(); // 페이지 이동

  // 내 예약 정보 불러오기
  const [myCurrentReservation, setMyCurrentReservation] = useAtom(
    myCurrentReservationAtom
  );

  const handleRefreshMyReservation = useCallback(async () => {
    // 로그인 상태일 경우에만 예약 정보 불러오기
    if (!loginState.isLoggedIn || loginState.permission !== Permission.USER) {
      return;
    }

    try {
      const csrfToken = await getCsrfToken();
      const response = await axiosInstance.get(`/users/reservations/current`, {
        headers: {
          "CSRF-Token": csrfToken, // CSRF 보호를 위한 토큰 헤더 추가
        },
      });

      // 예약 정보가 없다면 종료
      if (response.data.reservations.length === 0) {
        setMyCurrentReservation(null);
        return;
      }

      const newMyCurrentReservation = {
        bookDate: response.data.reservations[0].bookDate,
        seatName: response.data.reservations[0].seatName,
        pcSupport: response.data.reservations[0].pcSupport,
        image: response.data.reservations[0].image,
      };
      setMyCurrentReservation(newMyCurrentReservation);
    } catch (err) {
      console.error("예약 정보를 가져오는 중 오류 발생:", err);
      return [];
    }
  }, [loginState.isLoggedIn, loginState.permission, setMyCurrentReservation]);

  useEffect(() => {
    handleRefreshMyReservation();
  }, [
    handleRefreshMyReservation,
    loginState.isLoggedIn,
    loginState.permission,
  ]);

  // 퇴실하기 버튼 클릭
  const setReservationSeat = useSetAtom(reservationSeatAtom);
  const handleExitButtonClick = useCallback(() => {
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
        setReservationSeat("");
        setMyCurrentReservation(null);
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
  }, [setMyCurrentReservation, setReservationSeat]);

  // 공지사항 불러오기
  interface Notice {
    notice_uuid: string;
    title: string;
  }
  
  const [notices, setNotices] = useState<Notice[]>([]);
  const fetchNotices = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/notice/search`, {
        params: {
          query: "",
          page: 1,
        },
      }); // API 호출
      setNotices(response.data.notices || []);
    } catch (err) {
      console.error("공지사항 데이터를 가져오는 중 오류 발생:", err);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return (
    <TokenRefresher>
      <ThemeProvider theme={theme}>
        <Stack direction="column" minHeight="100vh">
          {/* 배너 */}
          <Stack
            height={{ xs: "auto", sm: "45vh" }}
            minHeight="300px"
            maxHeight="500px"
            justifyContent="center"
            alignItems="center"
            position="relative"
            overflow="hidden"
            sx={{
              "&:before, &:after": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
              },
              "&:before": {
                background: "linear-gradient(black, transparent)",
                backgroundImage: `url(${FabLabImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "blur(5px)",
                transform: "scale(1.1)",
                zIndex: "-2",
              },
              "&:after": {
                background:
                  "linear-gradient(rgba(0, 0, 0, 0.7), transparent 50%)",
                zIndex: "-1",
              },
            }}
          >
            <Typography
              variant="h1"
              fontSize={{
                xs: "2em",
                sm: "3em",
                md: "4em",
              }}
              margin="80px 0"
              padding="0 30px"
              textAlign="center"
              color="white"
            >
              FabLab 슬로건 입력될 자리
            </Typography>
          </Stack>

          {/* 하단 메뉴 */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{
              xs: 5,
              md: 0,
            }}
            padding={{
              xs: "50px 20px",
              sm: "50px 30px",
              md: "50px 0",
            }}
            justifyContent={{
              xs: "flex-start",
              md: "space-evenly",
            }}
          >
            {/* 공지사항 */}
            <Stack
              direction="column"
              spacing={3}
              width={{
                xs: "100%",
                md: "45vw",
              }}
              overflow="hidden"
            >
              {/* 공지사항 링크 */}
              <Stack direction="row">
                <Link
                  to="/notice"
                  css={{
                    ...LinkCss,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h2" fontWeight="bold">
                    공지사항
                  </Typography>
                  <ChevronRightRoundedIcon fontSize="large" color="secondary" />
                </Link>
              </Stack>

              {/* 공지사항 목록 */}
              <Stack direction="column" spacing={2} borderRadius="10px">
                {notices.slice(0, 6).map((notice, index) => (
                  <Stack key={`notice${index}`} direction="row">
                    <Link
                      to={`/notice/${notice.notice_uuid}`}
                      css={{
                        ...LinkCss,
                        display: "flex",
                        alignItems: "center",
                        overflow: "hidden",
                        gap: "10px",
                      }}
                    >
                      <CircleRoundedIcon fontSize="small" color="primary" />
                      <Typography
                        variant="subtitle1"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {notice.title}
                      </Typography>
                    </Link>
                  </Stack>
                ))}
              </Stack>

              {/* 더보기 버튼 */}
              <Stack direction="row" justifyContent="flex-end" display="flex">
                <Link to="/notice" css={LinkCss}>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    fontWeight="bold"
                  >
                    더보기
                  </Typography>
                </Link>
              </Stack>
            </Stack>

            {/* 구분선 */}
            <Divider
              flexItem
              sx={{
                borderWidth: "2px",
                borderRadius: "10px",
                [theme.breakpoints.down("md")]: { display: "none" },
              }}
            />

            <Stack
              direction="column"
              spacing={loginState.isLoggedIn ? { xs: 3, md: 5 } : 0}
              width={{
                xs: "100%",
                md: "35vw",
              }}
            >
              {!loginState.isLoggedIn ||
              loginState.permission === Permission.USER ? (
                // 내 예약현황 링크
                <>
                  <Stack direction="row">
                    <Link
                      to="/my-reservation"
                      css={{
                        ...LinkCss,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h2">내 예약현황</Typography>
                      <ChevronRightRoundedIcon
                        fontSize="large"
                        color="secondary"
                      />
                    </Link>
                  </Stack>

                  {/* 예약 좌석 */}
                  <Link
                    to="/my-reservation"
                    css={{
                      ...LinkCss,
                      display:
                        loginState.isLoggedIn && myCurrentReservation
                          ? "flex"
                          : "none",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      borderRadius={"10px"}
                    >
                      {/* 좌석 사진 */}
                      <Box
                        component="img"
                        alt="좌석 사진"
                        src={myCurrentReservation?.image || SmapleImage}
                        width={{ xs: "80px", sm: "150px", md: "130px" }}
                        borderRadius="10px"
                      />

                      {/* 예약 정보 */}
                      <Stack direction="column" flex={1}>
                        <Typography variant="h3" fontWeight="bold">
                          예약 좌석
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap={"wrap"}>
                          <Typography
                            variant="subtitle1"
                            color="secondary"
                            width={"60px"}
                            fontWeight="bold"
                          >
                            예약 날짜
                          </Typography>
                          <Typography variant="subtitle1">
                            {myCurrentReservation?.bookDate}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Typography
                            variant="subtitle1"
                            color="secondary"
                            width={"60px"}
                            fontWeight="bold"
                          >
                            선택 좌석
                          </Typography>
                          <Typography variant="subtitle1">
                            {myCurrentReservation?.seatName}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Typography
                            variant="subtitle1"
                            color="secondary"
                            width={"60px"}
                            fontWeight="bold"
                          >
                            PC 지원
                          </Typography>
                          <Typography variant="subtitle1">
                            {myCurrentReservation?.pcSupport}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Link>

                  {/* 퇴실하기 버튼 */}
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<ExitToAppRoundedIcon />}
                    size="large"
                    sx={{
                      display:
                        loginState.isLoggedIn && myCurrentReservation
                          ? "inline-flex"
                          : "none",
                      ".MuiSvgIcon-root": {
                        fontSize: "2em",
                      },
                    }}
                    onClick={handleExitButtonClick}
                  >
                    <Typography variant="h2">퇴실하기</Typography>
                  </Button>

                  {/* 예약 정보 없음 텍스트 */}
                  <Stack
                    flex={1}
                    display={
                      loginState.isLoggedIn && !myCurrentReservation
                        ? "flex"
                        : "none"
                    }
                    justifyContent="center"
                  >
                    <Typography variant="h1" textAlign="center">
                      예약된 좌석이 없습니다
                    </Typography>
                  </Stack>

                  {/* 로그인 버튼 */}
                  <Stack
                    justifyContent="center"
                    flex={1}
                    display={loginState.isLoggedIn ? "none" : "flex"}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<VpnKeyRoundedIcon />}
                      size="large"
                      sx={{
                        ".MuiSvgIcon-root": {
                          fontSize: "2em",
                        },
                        [theme.breakpoints.down("md")]: {
                          marginTop: "30px",
                        },
                      }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      <Typography variant="h2">로그인</Typography>
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  {/* 예약 조회 링크 */}
                  <Stack direction="row">
                    <Link
                      to="/reservation"
                      css={{
                        ...LinkCss,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h2">예약 조회</Typography>
                      <ChevronRightRoundedIcon
                        fontSize="large"
                        color="secondary"
                      />
                    </Link>
                  </Stack>

                  {/* 예약 조회 버튼 */}
                  <Stack justifyContent="center" flex={1}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<EventSeatRoundedIcon />}
                      size="large"
                      sx={{
                        ".MuiSvgIcon-root": {
                          fontSize: "2em",
                        },
                        [theme.breakpoints.down("md")]: {
                          marginTop: "30px",
                        },
                      }}
                      onClick={() => {
                        navigate("/reservation");
                      }}
                    >
                      <Typography variant="h2">예약 조회</Typography>
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </ThemeProvider>
    </TokenRefresher>
  );
};

export default Home;
