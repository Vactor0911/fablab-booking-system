import { createTheme } from "@mui/material";
import { color } from "./theme";

/**
 * MUI 테마 객체
 */
export const theme = createTheme({
  palette: {
    primary: { main: color.primary },
    secondary: { main: "#fff" },
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
  const start = (end === undefined ? 0 : startOrEnd);
  const finalEnd = (end === undefined ? startOrEnd : end);
  return Array.from(
    { length: (finalEnd - start - 1) / step + 1 },
    (_, i) => start + i * step
  );
};
