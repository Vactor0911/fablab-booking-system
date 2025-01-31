import {
  Button,
  ButtonProps,
  createTheme,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";

// 좌석 버튼
interface SeatButtonProps extends ButtonProps {
  title: string;
  content?: string;
}

const SeatButton = (props: SeatButtonProps) => {
  const { title, content } = props;

  // 버튼 테마 색상
  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: "#fffcf2",
      },
    },
    typography: {
      fontFamily: ["Pretendard-Regular", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={buttonTheme}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          boxShadow: "none",
          backgroundColor: "#fffcf2",
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
            {title}
          </Typography>

          <Typography variant="subtitle1" fontSize={{
            xs: "1em",
            md: "1.25em",
          }} sx={{
            position: "absolute",
            width: "100%",
            top: "37%",
            left: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {content}
          </Typography>
        </Stack>
      </Button>
    </ThemeProvider>
  );
};

export default SeatButton;
