import { createTheme } from "@mui/material";
import { color } from "./theme";

/**
 * MUI 테마 객체
 */
export const theme = createTheme({
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          "&.page-root": {
            alignItems: "center",
            // xs
            "@media (max-width: 600px)": {
              minHeight: "calc(100vh - 60px)",
            },
            // sm
            "@media (min-width: 601px)": {
              minHeight: "calc(100vh - 80px)",
            },
          },
          "&.base-layout": {
            padding: "50px 0",
            paddingBottom: "100px",
            // xs
            "@media (max-width: 600px)": {
              width: "90%",
            },
            // sm
            "@media (min-width: 601px)": {
              width: "85%",
            },
            // md
            "@media (min-width: 901px)": {
              width: "75%",
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
        },
      },
    },
  },
  palette: {
    primary: { main: color.primary },
    secondary: { main: "#6e6e6e" },
  },
  typography: {
    fontFamily: ["Pretendard-Regular", "sans-serif"].join(","),
    h1: {
      fontSize: "2em",
      lineHeight: "2em",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5em",
      lineHeight: "1.5em",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.17em",
      lineHeight: "1.17em",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1em",
      lineHeight: "1em",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "0.83em",
      lineHeight: "0.83em",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "0.67em",
      lineHeight: "0.67em",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: "1em",
      lineHeight: "1.5em",
    },
    subtitle2: {
      fontSize: "0.83em",
      lineHeight: "0.125em",
    },
  },
});

/**
 * N부터 M까지 K씩 증가하는 배열을 반환하는 함수
 * @param startOrEnd 시작값 (N); 만약 end가 주어지지 않으면 0부터 시작
 * @param end 종료값 (M); 만약 end가 주어지지 않으면 startOrEnd까지 반환
 * @param step 증감값 (K); 만약 주어지지 않으면 +1
 * @returns N부터 M까지 K씩 증가하는 배열 객체
 */
export const range = (startOrEnd: number, end?: number, step = 1) => {
  const start = end === undefined ? 0 : startOrEnd;
  const finalEnd = end === undefined ? startOrEnd : end;
  return Array.from(
    { length: (finalEnd - start - 1) / step + 1 },
    (_, i) => start + i * step
  );
};

// 날짜 포맷터
export const dateFormatter = Intl.DateTimeFormat("sv-SE");
