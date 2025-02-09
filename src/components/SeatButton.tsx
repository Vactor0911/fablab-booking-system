import {
  Button,
  ButtonProps,
  createTheme,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useAtomValue } from "jotai";
import {
  bookRestrictedSeatsAtom,
  loginStateAtom,
  Permission,
  reservationSeatAtom,
  seatInfoAtom,
} from "../states";

// 좌석 버튼
interface SeatButtonProps extends ButtonProps {
  seatName: string;
  selected?: boolean;
}

const SeatButton = (props: SeatButtonProps) => {
  const { seatName, selected } = props;
  const loginState = useAtomValue(loginStateAtom);
  const seatInfo =
    useAtomValue<Record<string, { state: string; userName: string }>>(
      seatInfoAtom
    );
  const reservedSeat = useAtomValue(reservationSeatAtom);
  const bookRestrictedSeats = useAtomValue(bookRestrictedSeatsAtom);

  // 버튼 테마 색상
  const buttonTheme = createTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            // 빈 좌석
            main: "#fffcf2",
          },
          secondary: {
            // 예약된 좌석
            main: "#33c33b",
          },
          error: {
            // 예약 제한된 좌석
            main: "#e0e0e0",
          },
          success: {
            // 선택된 좌석
            main: "#a72b43",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            // 빈 좌석
            main: "#787878",
          },
          secondary: {
            // 예약된 좌석
            main: "#bababa",
          },
          error: {
            // 예약 제한된 좌석
            main: "#bababa",
          },
          success: {
            // 선택된 좌석
            main: "#a72b43",
          },
        },
      },
    },
    typography: {
      fontFamily: ["Pretendard-Regular", "sans-serif"].join(","),
    },
  });

  const isBooked = seatInfo[seatName]?.state === "book";

  return (
    <ThemeProvider theme={buttonTheme}>
      <Button
        key={seatName}
        variant="contained"
        fullWidth
        color={
          isBooked
            ? "secondary"
            : selected
            ? "success"
            : bookRestrictedSeats.includes(seatName)
            ? "error"
            : "primary"
        }
        disabled={
          (isBooked || bookRestrictedSeats.includes(seatName)) &&
          ((reservedSeat !== seatName &&
            loginState.permission === Permission.USER) ||
            !loginState.isLoggedIn)
        }
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          boxShadow: "none",
          color: selected ? "white" : "black",
          border: "1px solid #666666",
          padding: "0 5px",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            zIndex: 1,
          },
        }}
        {...props}
      >
        <Stack width="100%" height="100%" overflow="hidden" minWidth={0}>
          <Typography variant="subtitle1" textAlign="left" color="textPrimary">
            {seatName}
          </Typography>

          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "1em",
              md: "1.25em",
            }}
            sx={{
              position: "absolute",
              width: "100%",
              top: "37%",
              left: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {seatInfo[seatName]?.userName}
          </Typography>
        </Stack>
      </Button>
    </ThemeProvider>
  );
};

export default SeatButton;
