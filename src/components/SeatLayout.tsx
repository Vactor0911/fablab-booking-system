import {
  Box,
  Grid2,
  Stack,
  StackProps,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import SeatButton from "./SeatButton";

// 양쪽 A석 스택
const SideSeatStack = (props: StackProps) => {
  return <Stack {...props}>{props.children}</Stack>;
};

const SeatLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Stack flex={1} gap={5}>
        {/* 상단 라벨 */}
        <Stack direction="row" gap={2}>
          {["출입구", "사물함", "고정문"].map((text, index) => (
            <Typography
              key={`top-label${index}`}
              variant="h4"
              flex={index === 1 ? 9.5 : 1}
              textAlign="center"
              padding="5px"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
              }}
            >
              {text}
            </Typography>
          ))}
        </Stack>

        {/* 중앙 좌석 배치도 */}
        <Stack direction="row" flex={1}>
          {/* 좌측 A석 */}
          <SideSeatStack flex={1}>
            {Array.from({ length: 12 }, (_, i) => i).map((i) =>
              i % 2 === 0 ? <SeatButton /> : <Box flex={i === 11 ? 0.7 : 0.2} />
            )}
          </SideSeatStack>

          <Box flex={0.5} />

          {/* 중앙 B석 */}
          <Stack flex={9.5}>
            <Box flex={0.8} />

            <Grid2 container columns={11} flex={5}>
              {Array.from({ length: 5 }, (_, i) => i).map((i) =>
                i === 2 ? (
                  <Grid2 size={11} display="flex">
                    <Box />
                  </Grid2>
                ) : (
                  Array.from({ length: 11 }, (_, j) => j + 1).map((j) =>
                    j % 3 === 0 ? (
                      <Grid2 size={1} display="flex">
                        <Box />
                      </Grid2>
                    ) : (
                      <Grid2 size={1} display="flex">
                        <SeatButton />
                      </Grid2>
                    )
                  )
                )
              )}
            </Grid2>

            <Box flex={0.8} />

            {/* 하단 C, D석 */}
            <Stack direction="row" flex={1}>
              {Array.from({ length: 17 }, (_, i) => i).map((i) =>
                i % 2 === 0 ? (<SeatButton />) : <Box flex={0.2} />
            )}
            </Stack>
          </Stack>

          <Box flex={0.5} />

          {/* 우측 A석 */}
          <SideSeatStack flex={1}>
            {Array.from({ length: 12 }, (_, i) => i).map((i) =>
              i % 2 === 0 ? <SeatButton /> : <Box flex={i === 11 ? 0.7 : 0.2} />
            )}
          </SideSeatStack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default SeatLayout;
