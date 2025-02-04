import { Box, Stack, ThemeProvider } from "@mui/material";
import NoticeBanner from "../components/NoticeBanner";
import SeatLayout from "../components/SeatLayout";
import { dateFormatter, theme } from "../utils";
import ReservationDialog from "../components/ReservationDialog";
import { useCallback, useEffect, useState } from "react";
import axiosInstance, { getCsrfToken } from "../utils/axiosInstance";
import TokenRefresher from "../components/TokenRefresher";
import { useAtomValue, useSetAtom } from "jotai";
import {
  loginStateAtom,
  myCurrentReservationAtom,
  Permission,
  reservationSeatAtom,
  seatInfoAtom,
  SeatInfoProps,
} from "../states";
import Notice from "./Notice";

const Reservation = () => {
  const setSeatInfo = useSetAtom(seatInfoAtom); // 좌석 정보

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
      const newSeatInfo: Record<string, SeatInfoProps> = {};
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
      setSeatInfo(newSeatInfo);
    } catch (error) {
      console.error("좌석 데이터를 가져오는 중 오류 발생:", error);
    }
  }, [setSeatInfo]);

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
          "X-CSRF-Token": csrfToken, // CSRF 보호를 위한 토큰 헤더 추가
        },
      });

      setReservationSeat(response.data.reservations[0]?.seatName);
    } catch (err) {
      console.error("예약 정보를 가져오는 중 오류 발생:", err);
      return [];
    }
  }, [loginState.isLoggedIn, loginState.permission, setReservationSeat]);

  // 내 예약 정보 불러오기
  const setMyCurrentReservation = useSetAtom(myCurrentReservationAtom);

  const handleRefreshMyReservation = useCallback(async () => {
    // 로그인 상태일 경우에만 예약 정보 불러오기
    if (!loginState.isLoggedIn || loginState.permission !== Permission.USER) {
      return;
    }

    try {
      const csrfToken = await getCsrfToken();
      const response = await axiosInstance.get(`/users/reservations/current`, {
        headers: {
          "X-CSRF-Token": csrfToken, // CSRF 보호를 위한 토큰 헤더 추가
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

  // 페이지 접속시 좌석 정보 불러오기
  useEffect(() => {
    refreshSeatInfo();
    refreshMyReservation();
    handleRefreshMyReservation();
  }, [handleRefreshMyReservation, refreshMyReservation, refreshSeatInfo]);

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
    handleRefreshMyReservation();
  }, [handleRefreshMyReservation, refreshMyReservation, refreshSeatInfo]);

  // 공지사항 불러오기
  const [notices, setNotices] = useState<Notice[]>([]);

  const fetchNotices = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/notice/search`, {
        params: {
          query: "",
          page: 1,
        },
      }); // API 호출
      setNotices(
        response.data.notices.filter(
          (notice: Notice) => notice.date === dateFormatter.format(new Date())
        )
      );
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
        <Stack className="page-root">
          {/* 공지사항 배너 */}
          <Box
            width="100%"
            padding="10px 0"
            display={notices && notices.length > 0 ? "block" : "none"}
          >
            {notices && (
              <NoticeBanner
                message={notices[0]?.title}
                moreCount={notices.length - 1}
              />
            )}
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
