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
  const seatInfo = useAtomValue(seatInfoAtom);
  const reservedSeat = useAtomValue(reservationSeatAtom);

  // 버튼 테마 색상
  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: "#fffcf2",
      },
      secondary: {
        main: "#33c33b",
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
        color={isBooked ? "secondary" : "primary"}
        disabled={
          isBooked &&
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
          backgroundColor: selected
            ? "#a72b43"
            : isBooked
            ? "#33c33b"
            : "#fffcf2",
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
          <Typography variant="subtitle1" textAlign="left">
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
