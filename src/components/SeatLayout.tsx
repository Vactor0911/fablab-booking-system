import { Box, Grid2, Stack, StackProps, Typography } from "@mui/material";
import { theme } from "../utils";
import SeatButton from "./SeatButton";
import { FireExtinguisher, MedicalDevices } from "./pictograms";

interface SeatLayoutProps extends StackProps {
  onSeatButtonClick: (seatName: string) => void;
}

const SeatLayout = (props: SeatLayoutProps) => {
  const { onSeatButtonClick } = props;

  return (
    <Stack flex={1} gap={5} {...props}>
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
      <Stack direction="row" flex={1} position="relative">
        {/* 좌측 A석 */}
        <Stack flex={1}>
          {Array.from({ length: 12 }, (_, i) => i).map((i) =>
            i % 2 === 0 ? (
              <SeatButton
                seatName={`A${i / 2 + 1}`}
                onClick={() => {
                  const seatName = `A${i / 2 + 1}`;
                  onSeatButtonClick(seatName);
                }}
              />
            ) : (
              <Box flex={i === 11 ? 0.7 : 0.2} key={`a${i}`} />
            )
          )}
        </Stack>

        <Box flex={0.5} />

        {/* 중앙 B석 */}
        <Stack flex={9.5}>
          <Box flex={0.8} />

          <Grid2 container columns={11} flex={5}>
            {Array.from({ length: 5 }, (_, i) => i).map((i) =>
              i === 2 ? (
                <Grid2 size={11} display="flex" key={`b${i}`}>
                  <Box />
                </Grid2>
              ) : (
                Array.from({ length: 11 }, (_, j) => j + 1).map((j) =>
                  j % 3 === 0 ? (
                    <Grid2 size={1} display="flex" key={`b${i}${j}`}>
                      <Box />
                    </Grid2>
                  ) : (
                    <Grid2 size={1} display="flex" key={`b${i}${j}`}>
                      <SeatButton
                        seatName={`B${
                          j +
                          Math.floor(j / 3) +
                          (i % 3) * 2 +
                          Math.floor(i / 3) * 16
                        }`}
                        onClick={() => {
                          const seatName = `B${
                            j +
                            Math.floor(j / 3) +
                            (i % 3) * 2 +
                            Math.floor(i / 3) * 16
                          }`;
                          onSeatButtonClick(seatName);
                        }}
                      />
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
              i % 2 === 0 ? (
                <SeatButton
                  seatName={
                    i % 4 === 0 ? `C${i / 4 + 1}` : `D${Math.ceil(i / 4)}`
                  }
                  onClick={() => {
                    const seatName =
                      i % 4 === 0 ? `C${i / 4 + 1}` : `D${Math.ceil(i / 4)}`;
                    onSeatButtonClick(seatName);
                  }}
                />
              ) : i === 5 ? (
                <Box
                  flex={0.2}
                  key={`cd${i}`}
                  display="flex"
                  alignItems="flex-end"
                >
                  <FireExtinguisher />
                </Box>
              ) : (
                <Box flex={0.2} key={`cd${i}`} />
              )
            )}
          </Stack>
        </Stack>

        <Box flex={0.5} />

        {/* 우측 A석 */}
        <Stack flex={1}>
          {Array.from({ length: 12 }, (_, i) => i).map((i) =>
            i % 2 === 0 ? (
              <SeatButton
                seatName={`A${i / 2 + 7}`}
                onClick={() => {
                  const seatName = `A${i / 2 + 7}`;
                  onSeatButtonClick(seatName);
                }}
              />
            ) : (
              <Box flex={i === 11 ? 0.7 : 0.2} key={`a${i}`} />
            )
          )}
        </Stack>

        {/* 좌측 장비 배치도 */}
        <Stack direction="row" position="absolute" top={-30} left={0}>
          <MedicalDevices />
          <FireExtinguisher />
        </Stack>

        {/* 우측 장비 배치도 */}
        <Stack direction="row" position="absolute" top={-30} right={0}>
          <FireExtinguisher />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SeatLayout;
