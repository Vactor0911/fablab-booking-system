import { Button, createTheme, ThemeProvider, Typography } from "@mui/material";

// 좌석 버튼
interface SeatButtonProps {
  title?: string;
  content?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const SeatButton = (props: SeatButtonProps) => {
  const { title, content, backgroundColor = "#fffcf2" } = props;

  // 버튼 테마 색상
  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: backgroundColor,
      },
    },
    typography: {
      fontFamily: ["Pretendard-Regular", "sans-serif"].join(","),
      h1: {
        fontWeight: "bold",
      },
    },
  });

  return (
    <ThemeProvider theme={buttonTheme}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          boxShadow: "none",
          backgroundColor: backgroundColor,
          border: "1px solid #666666",
          padding: 0,
          "&:hover": {
            zIndex: 1,
          }
        }}
        {...props}
      >
        <Typography variant="h5">
          {title}
        </Typography>
        <Typography variant="h5">{content}</Typography>
      </Button>
    </ThemeProvider>
  );
};

export default SeatButton;
