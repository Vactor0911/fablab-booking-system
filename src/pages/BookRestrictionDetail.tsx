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
import { useCallback, useEffect, useState } from "react";

const BookRestrictionDetail = () => {
  // 예약 제한 기간
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  // 공지사항 배너 목록
  const [banners, setBanners] = useState<string[]>([
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

            <Stack direction="row">
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
              <Stack gap={2} flex={2}></Stack>
            </Stack>
          </Stack>
        </Stack>
      </ThemeProvider>
    </AdminPage>
  );
};

export default BookRestrictionDetail;
