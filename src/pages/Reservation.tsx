import { Box, Stack, ThemeProvider } from "@mui/material";
import NoticeBanner from "../components/NoticeBanner";
import SeatLayout from "../components/SeatLayout";
import { theme } from "../utils";
import ReservationDialog from "../components/ReservationDialog";
import { useCallback, useEffect, useState } from "react";
import axiosInstance, { getCsrfToken } from "../utils/axiosInstance";
import TokenRefresher from "../components/TokenRefresher";
import { useAtomValue, useSetAtom } from "jotai";
import { loginStateAtom, Permission, reservationSeatAtom } from "../states";

const Reservation = () => {
  const [seatInfo, setSeatInfo] = useState({}); // 좌석 정보

  // 좌석 정보 불러오기
  const refreshSeatInfo = useCallback(async () => {
    try {
      // 권한 확인 API 호출
      const response = await axiosInstance.get("/users/info", {
        headers: {
          "X-CSRF-Token": await getCsrfToken(), // CSRF 토큰 헤더 추가
        },
      });

      // 사용자 권한
      const userPermission = response.data.user.permission;

      // 권한에 따른 좌석 정보 불러오기
      const seatsResponse = await axiosInstance.get(
        userPermission === "admin" || userPermission === "superadmin"
          ? "/admin/seats"
          : "/seats"
      );
      const newSeatInfo: { [key: string]: unknown } = {};
      // 좌석 정보 저장
      seatsResponse.data.seats.map(
        (seat: { seat_name: string; state: string; user_name: string }) => {
          newSeatInfo[seat.seat_name] = {
            seatName: seat.seat_name,
            state: seat.state,
            userName: seat.user_name,
          };
        }
      );
      console.log(newSeatInfo);
      setSeatInfo(newSeatInfo);
    } catch (error) {
      console.error("좌석 데이터를 가져오는 중 오류 발생:", error);
    }
  }, []);

  // 내 예약 정보 불러오기
  const loginState = useAtomValue(loginStateAtom);
  const setReservationSeat = useSetAtom(reservationSeatAtom); // 예약된 좌석 이름

  const refreshMyReservation = useCallback(async () => {
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

      setReservationSeat(response.data.reservations[0].seatName);
    } catch (err) {
      console.error("예약 정보를 가져오는 중 오류 발생:", err);
      return [];
    }
  }, [loginState.isLoggedIn, loginState.permission, setReservationSeat]);

  // 페이지 접속시 좌석 정보 불러오기
  useEffect(() => {
    refreshSeatInfo();
    refreshMyReservation();
  }, [refreshMyReservation, refreshSeatInfo]);

  const [seatName, setSeatName] = useState(""); // 선택된 좌석 이름
  const [reservationDialogOpen, setReservationDialogOpen] = useState(false); // 예약 대화상자 열림 여부

  // 예약 대화상자 열기
  const handleReservationDialogOpen = useCallback((seatName: string) => {
    setSeatName(seatName);
    setReservationDialogOpen(true);
  }, []);

  // 예약 대화상자 닫기
  const handleReservationDialogClose = useCallback(() => {
    refreshSeatInfo();
    refreshMyReservation();
    setReservationDialogOpen(false);
  }, [refreshMyReservation, refreshSeatInfo]);

  return (
    <TokenRefresher>
      <ThemeProvider theme={theme}>
        <Stack className="page-root">
          {/* 공지사항 배너 */}
          <Box width="100%" padding="10px 0">
            <NoticeBanner
              message="공지사항 어쩌구 저쩌구... 대충 내일까지 이러 저러한 이유로 팹랩 못쓴단 안내문"
              moreCount={3}
            />
          </Box>

          {/* 좌석 배치도 */}
          <Stack
            width="100%"
            flex={1}
            sx={{
              overflowX: "auto",
            }}
          >
            <SeatLayout
              minWidth="600px"
              minHeight="450px"
              margin="20px 20px"
              onSeatButtonClick={handleReservationDialogOpen}
              seatInfo={seatInfo}
            />
          </Stack>
        </Stack>

        <ReservationDialog
          seatName={seatName}
          open={reservationDialogOpen}
          onClose={handleReservationDialogClose}
        />
      </ThemeProvider>
    </TokenRefresher>
  );
};

export default Reservation;
