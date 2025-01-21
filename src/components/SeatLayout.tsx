import {
  Box,
  Button,
  Grid2,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../utils";

import { StackProps } from "@mui/material/Stack";
import { useCallback } from "react";

interface SeatButtonProps {
  seatName: string;
  isOccupied?: boolean;
  isRestricted?: boolean;
}

const SeatLayout = (props: StackProps) => {
  // 좌석 버튼 클릭
  const handleSeatButtonClick = useCallback((seatName: string) => {
    console.log(`${seatName} 클릭됨`);
  }, []);

  // 좌석 버튼
  const SeatButton = (props: SeatButtonProps) => {
    const { seatName, isOccupied = false, isRestricted = false } = props;

    let backgroundColor = "#fffcf2";
    let text;
    if (isRestricted) {
      backgroundColor = "#d3d2cb";
      text = "예약불가";
    } else if (isOccupied) {
      backgroundColor = "#44eb4d";
      text = "사용중";
    }

    return (
      <Stack
        component={Button}
        key={seatName}
        fullWidth
        minWidth={0}
        minHeight={{
          xs: "0",
          md: "70px",
        }}
        justifyContent="center"
        alignItems="center"
        border="1px solid #666"
        flex={1}
        position="relative"
        overflow="hidden"
        sx={{
          backgroundColor: backgroundColor,
          color: "black",
        }}
        onClick={() => handleSeatButtonClick(seatName)}
      >
        {/* 중앙 텍스트 */}
        <Typography
          variant="h6"
          display={{
            xs: "block",
            md: "none",
          }}
        >
          {seatName}
        </Typography>
        <Typography
          variant="h6"
          display={{
            xs: "none",
            md: "block",
          }}
        >
          {text}
        </Typography>

        {/* 좌석 이름 */}
        <Typography
          variant="subtitle1"
          position="absolute"
          top={0}
          left={5}
          fontWeight="bold"
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          {seatName}
        </Typography>
      </Stack>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack
        {...props}
        minWidth="700px"
        gap={3}
        position="relative"
        sx={{
          border: "1px solid black",
        }}
      >
        {/* 상단 라벨 */}
        <Stack direction="row" gap={2}>
          {["출입구", "사물함", "고정문"].map((text, index) => (
            <Stack
              key={`top-label${index}`}
              flex={index === 1 ? 6 : 1}
              justifyContent="center"
              sx={{
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <Typography
                variant="h6"
                textAlign="center"
                color="white"
                fontWeight="bold"
              >
                {text}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* 중앙 좌석 배치도 */}
        <Stack direction="row" gap={2} flex={1}>
          {/* 좌측 */}
          <Stack direction="row" flex={1}>
            <Stack flex={3} gap={2}>
              {Array.from({ length: 6 }, (_, index) => index + 1).map(
                (number) =>
                  SeatButton({
                    seatName: `A${number}`,
                  })
              )}
              <Box flex={0.5} />
            </Stack>

            <Box flex={1} />
          </Stack>

          {/* 중앙 */}
          <Stack flex={6} justifyContent="space-evenly" gap={2}>
            {/* 1행 */}
            <Stack direction="row" justifyContent="space-between" gap={2}>
              {Array.from({ length: 4 }, (_, index) => index).map((number) => (
                <Grid2 flex={1} container key={`row1-${number}`}>
                  {Array.from({ length: 4 }, (_, index) => index + 1).map(
                    (number2) => (
                      <Grid2 size={6} key={`row2-${number}-${number2}`}>
                        {SeatButton({
                          seatName: `B${number * 4 + number2}`,
                          isRestricted: true,
                        })}
                      </Grid2>
                    )
                  )}
                </Grid2>
              ))}
            </Stack>

            {/* 2행 */}
            <Stack direction="row" justifyContent="space-between" gap={2}>
              {Array.from({ length: 4 }, (_, index) => index + 4).map(
                (number) => (
                  <Grid2 flex={1} container key={`row2-${number}`}>
                    {Array.from({ length: 4 }, (_, index) => index + 1).map(
                      (number2) => (
                        <Grid2 size={6} key={`row2-${number}-${number2}`}>
                          {SeatButton({
                            seatName: `B${number * 4 + number2}`,
                            isOccupied: true,
                          })}
                        </Grid2>
                      )
                    )}
                  </Grid2>
                )
              )}
            </Stack>
          </Stack>

          {/* 우측 */}
          <Stack direction="row" flex={1}>
            <Box flex={1} />

            <Stack flex={3} gap={2}>
              {Array.from({ length: 6 }, (_, index) => index + 7).map(
                (number) =>
                  SeatButton({
                    seatName: `A${number}`,
                  })
              )}
            </Stack>
          </Stack>
        </Stack>

        {/* 하단 여백 */}
        <Typography variant="h6"></Typography>

        {/* 하단 좌석 배치도 */}
        <Stack direction="row" position="absolute" bottom={0} width="100%">
          <Box flex={1} />
          <Stack
            direction="row"
            flex={7}
            justifyContent="space-between"
            gap={2}
          >
            {Array.from({ length: 9 }, (_, index) => index + 1).map((number) =>
              SeatButton({
                seatName: `C${number}`,
              })
            )}
          </Stack>
          <Box flex={1} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default SeatLayout;
