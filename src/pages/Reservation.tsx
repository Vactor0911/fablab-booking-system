import { Box, Stack, ThemeProvider } from "@mui/material";
import NoticeBanner from "../components/NoticeBanner";
import SeatLayout from "../components/SeatLayout";
import { theme } from "../utils";
import ReservationDialog from "../components/ReservationDialog";
import { useCallback, useState } from "react";

const Reservation = () => {
  const [seatName, setSeatName] = useState("");
  const [reservationDialogOpen, setReservationDialogOpen] = useState(false);

  const handleReservationDialogOpen = useCallback((seatName: string) => {
    setSeatName(seatName);
    setReservationDialogOpen(true);
  }, []);

  // 예약 대화상자 닫기
  const handleReservationDialogClose = useCallback(() => {
    setReservationDialogOpen(false);
  }, []);

  return (
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
          <SeatLayout minWidth="600px" minHeight="450px" margin="20px 20px" onSeatButtonClick={handleReservationDialogOpen} />
        </Stack>
      </Stack>

      <ReservationDialog seatName={seatName} open={reservationDialogOpen} onClose={handleReservationDialogClose} />
    </ThemeProvider>
  );
};

export default Reservation;
