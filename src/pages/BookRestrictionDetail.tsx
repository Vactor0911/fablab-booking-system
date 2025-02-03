import {
  Box,
  Button,
  createTheme,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AdminPage from "../components/AdminPage";
import { theme } from "../utils";
import dayjs, { Dayjs } from "dayjs";
import { Link, useLocation } from "react-router";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import SectionHeader from "../components/SectionHeader";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import SeatSelecter from "../components/SeatSelecter";

const BookRestrictionDetail = () => {
  // 예약 제한 기간
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  // 공지사항 배너 목록
  const [banners] = useState<string[]>([
    "관리자에 의해 좌석 예약이 제한되고 있습니다.",
    "제한 사유 1",
    "제한 사유 2",
    "제한 사유 3",
  ]);
  useEffect(() => {
    // TODO: 공지사항 배너 목록을 불러오는 API 호출
  }, []);

  // 공지사항 배너
  const [banner, setBanner] = useState("0");
  const handleBannerChange = useCallback((event: SelectChangeEvent<string>) => {
    setBanner(event.target.value);
  }, []);

  const location = useLocation();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // 열별 좌석 수
  const seatsPerRow = useMemo(
    () => ({
      A: 12,
      B: 32,
      C: 5,
      D: 4,
    }),
    []
  );

  // 좌석 전체 선택 버튼 클릭
  const handleSeatSelectAllButtonClick = useCallback(() => {
    const newSelectedSeats: string[] = [];

    Array.from({ length: seatsPerRow["A"] }, (_, i) => `A${i + 1}`).map(
      (seatName) => {
        newSelectedSeats.push(seatName);
      }
    );
    Array.from({ length: seatsPerRow["B"] }, (_, i) => `B${i + 1}`).map(
      (seatName) => {
        newSelectedSeats.push(seatName);
      }
    );
    Array.from({ length: seatsPerRow["C"] }, (_, i) => `C${i + 1}`).map(
      (seatName) => {
        newSelectedSeats.push(seatName);
      }
    );
    Array.from({ length: seatsPerRow["D"] }, (_, i) => `D${i + 1}`).map(
      (seatName) => {
        newSelectedSeats.push(seatName);
      }
    );

    setSelectedSeats(newSelectedSeats);
  }, [seatsPerRow]);

  // 좌석 전체 취소 버튼 클릭
  const handleSeatCancelAllButtonClick = useCallback(() => {
    setSelectedSeats([]);
  }, []);

  // 열 선택 버튼 클릭
  const handleSeatRowButtonClick = useCallback(
    (row: keyof typeof seatsPerRow) => {
      let newSelectedSeats: string[] = [...selectedSeats];
      if (
        newSelectedSeats.filter((name) => name.startsWith(row)).length <
        seatsPerRow[row]
      ) {
        Array.from(
          { length: seatsPerRow[row] },
          (_, i) => `${row}${i + 1}`
        ).map((seatName) => {
          if (!newSelectedSeats.includes(seatName)) {
            newSelectedSeats.push(seatName);
          }
        });
      } else {
        newSelectedSeats = newSelectedSeats.filter(
          (seatName) => !seatName.startsWith(row)
        );
      }
      setSelectedSeats(newSelectedSeats);
    },
    [seatsPerRow, selectedSeats]
  );

  return (
    <AdminPage>
      <ThemeProvider theme={theme}>
        <Stack className="page-root">
          <Stack className="base-layout" gap={5}>
            {/* 페이지명 */}
            <Stack direction="row">
              <Link
                to="/book-restrictions"
                css={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronLeftRoundedIcon fontSize="large" color="secondary" />
                <Typography variant="h2" fontWeight="bold">
                  예약 제한 관리
                </Typography>
              </Link>
            </Stack>

            <Stack
              direction={{
                xs: "column-reverse",
                md: "row",
              }}
              gap={5}
              flexWrap={{
                xs: "nowrap",
                md: "wrap-reverse",
              }}
            >
              {/* 좌측 컨테이너 */}
              <Stack gap={5} flex={1}>
                <Stack gap={2}>
                  {/* 날짜 / 시간 선택기 */}
                  <SectionHeader title="날짜 / 시간" underline />

                  <ThemeProvider
                    theme={createTheme({
                      typography: {
                        h3: {
                          fontSize: "3rem",
                        },
                      },
                    })}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack direction="row" gap={2}>
                        <MobileDateTimePicker
                          label="시작 시간"
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                          minDate={dayjs()}
                          sx={{
                            width: "100%",
                            minWidth: "190px",
                          }}
                        />

                        <Box alignSelf="center">
                          <Typography variant="h5">~</Typography>
                        </Box>

                        <MobileDateTimePicker
                          label="종료 시간"
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                          minDate={startDate ?? dayjs()}
                          format="YYYY-MM-DD hh:mm A"
                          sx={{
                            width: "100%",
                            minWidth: "190px",
                          }}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </ThemeProvider>
                </Stack>

                <Stack gap={2}>
                  {/* 공지사항 배너 선택기 */}
                  <SectionHeader title="공지사항 배너" underline />

                  <Select value={banner} onChange={handleBannerChange}>
                    {banners.map((banner, index) => (
                      <MenuItem key={index} value={index}>
                        {banner}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>

                {location.pathname === "/book-restrictions/new" && (
                  <Button variant="contained" fullWidth>
                    <Typography variant="h2">등록하기</Typography>
                  </Button>
                )}
                {location.pathname !== "/book-restrictions/new" && (
                  <Stack direction="row" gap={2}>
                    <Button variant="contained" fullWidth>
                      <Typography variant="h2">수정하기</Typography>
                    </Button>

                    <Button variant="outlined" color="error" fullWidth>
                      <Typography variant="h2">삭제하기</Typography>
                    </Button>
                  </Stack>
                )}
              </Stack>

              {/* 우측 컨테이너 */}
              <Stack flex={2} gap={2}>
                {/* 전체 선택기 */}
                <Stack direction="row" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleSeatSelectAllButtonClick}
                  >
                    전체 선택
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleSeatCancelAllButtonClick}
                  >
                    전체 취소
                  </Button>
                </Stack>

                {/* 좌석 선택기 */}
                <Box overflow="auto">
                  <SeatSelecter
                    minWidth="600px"
                    minHeight="400px"
                    multiple
                    selectedseats={selectedSeats}
                    setselectedseats={setSelectedSeats}
                  />
                </Box>

                {/* 좌석 열 선택기 */}
                <Stack direction="row" justifyContent="space-evenly">
                  <Button
                    color={
                      selectedSeats.filter((name) => name.startsWith("A"))
                        .length >= seatsPerRow["A"]
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => handleSeatRowButtonClick("A")}
                  >
                    <Typography variant="h1">A 좌석</Typography>
                  </Button>
                  <Button
                    color={
                      selectedSeats.filter((name) => name.startsWith("B"))
                        .length >= seatsPerRow["B"]
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => handleSeatRowButtonClick("B")}
                  >
                    <Typography variant="h1">B 좌석</Typography>
                  </Button>
                  <Button
                    color={
                      selectedSeats.filter((name) => name.startsWith("C"))
                        .length >= seatsPerRow["C"]
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => handleSeatRowButtonClick("C")}
                  >
                    <Typography variant="h1">C 좌석</Typography>
                  </Button>
                  <Button
                    color={
                      selectedSeats.filter((name) => name.startsWith("D"))
                        .length >= seatsPerRow["D"]
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => handleSeatRowButtonClick("D")}
                  >
                    <Typography variant="h1">D 좌석</Typography>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ThemeProvider>
    </AdminPage>
  );
};

export default BookRestrictionDetail;
