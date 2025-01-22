import { Box, Stack, ThemeProvider } from "@mui/material";
import NoticeBanner from "../components/NoticeBanner";
import SeatLayout from "../components/SeatLayout";
import { theme } from "../utils";
import ReservationDialog from "../components/ReservationDialog";

const Reservation = () => {
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
          <SeatLayout flex={1} margin="20px 20px" />
        </Stack>
      </Stack>

      <ReservationDialog seatName="A1" open={true} onClose={() => {}} />
    </ThemeProvider>
  );
};

export default Reservation;
