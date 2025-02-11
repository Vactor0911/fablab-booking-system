import { Box, Grid2, Stack, StackProps, Typography } from "@mui/material";
import { theme } from "../utils";
import SeatButton from "./SeatButton";

interface SeatSelecterProps extends StackProps {
  multiple?: boolean;
  selectedseats: string[];
  setselectedseats: (seats: string[]) => void;
}

const SeatSelecter = (props: SeatSelecterProps) => {
  const { multiple, selectedseats, setselectedseats } = props;

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
      <Stack direction="row" flex={1}>
        {/* 좌측 A석 */}
        <Stack flex={1}>
          {Array.from({ length: 12 }, (_, i) => i).map((i) =>
            i % 2 === 0 ? (
              <SeatButton
                seatName=""
                title={`A${i / 2 + 1}`}
                key={`A${i / 2 + 1}`}
                onClick={() => {
                  const seatName = `A${i / 2 + 1}`;
                  let newSelectedSeats = multiple ? [...selectedseats] : [];
                  if (newSelectedSeats.includes(seatName)) {
                    newSelectedSeats = newSelectedSeats.filter(
                      (s) => s !== seatName
                    );
                  } else {
                    newSelectedSeats.push(seatName);
                  }
                  setselectedseats(newSelectedSeats);
                }}
                selected={selectedseats.includes(`A${i / 2 + 1}`)}
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
                        seatName=""
                        title={`B${
                          j +
                          Math.floor(j / 3) +
                          (i % 3) * 2 +
                          Math.floor(i / 3) * 16
                        }`}
                        key={`B${
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
                          let newSelectedSeats = multiple
                            ? [...selectedseats]
                            : [];
                          if (newSelectedSeats.includes(seatName)) {
                            newSelectedSeats = newSelectedSeats.filter(
                              (s) => s !== seatName
                            );
                          } else {
                            newSelectedSeats.push(seatName);
                          }
                          setselectedseats(newSelectedSeats);
                        }}
                        selected={selectedseats.includes(
                          `B${
                            j +
                            Math.floor(j / 3) +
                            (i % 3) * 2 +
                            Math.floor(i / 3) * 16
                          }`
                        )}
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
                  seatName=""
                  title={i % 4 === 0 ? `C${i / 4 + 1}` : `D${Math.ceil(i / 4)}`}
                  key={i % 4 === 0 ? `C${i / 4 + 1}` : `D${Math.ceil(i / 4)}`}
                  onClick={() => {
                    const seatName =
                      i % 4 === 0 ? `C${i / 4 + 1}` : `D${Math.ceil(i / 4)}`;
                    let newSelectedSeats = multiple ? [...selectedseats] : [];
                    if (newSelectedSeats.includes(seatName)) {
                      newSelectedSeats = newSelectedSeats.filter(
                        (s) => s !== seatName
                      );
                    } else {
                      newSelectedSeats.push(seatName);
                    }
                    setselectedseats(newSelectedSeats);
                  }}
                  selected={selectedseats.includes(
                    i % 4 === 0 ? `C${i / 4 + 1}` : `D${Math.ceil(i / 4)}`
                  )}
                />
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
                seatName=""
                title={`A${i / 2 + 7}`}
                key={`A${i / 2 + 7}`}
                onClick={() => {
                  const seatName = `A${i / 2 + 7}`;
                  let newSelectedSeats = multiple ? [...selectedseats] : [];
                  if (newSelectedSeats.includes(seatName)) {
                    newSelectedSeats = newSelectedSeats.filter(
                      (s) => s !== seatName
                    );
                  } else {
                    newSelectedSeats.push(seatName);
                  }
                  setselectedseats(newSelectedSeats);
                }}
                selected={selectedseats.includes(`A${i / 2 + 7}`)}
              />
            ) : (
              <Box flex={i === 11 ? 0.7 : 0.2} key={`a${i}`} />
            )
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SeatSelecter;
