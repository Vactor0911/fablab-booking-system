import {
  Autocomplete,
  Box,
  Button,
  createTheme,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AdminPage from "../components/AdminPage";
import { theme } from "../utils";
import dayjs, { Dayjs } from "dayjs";
import { Link, useLocation, useNavigate } from "react-router";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import SectionHeader from "../components/SectionHeader";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import SeatSelecter from "../components/SeatSelecter";
import TokenRefresher from "../components/TokenRefresher";
import axiosInstance from "../utils/axiosInstance";
import { useAtomValue } from "jotai";
import { loginStateAtom } from "../states";

const BookRestrictionDetail = () => {
  // 예약 제한 기간
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  // 공지사항 배너 목록
  interface NoticeBanner {
    notice_id: string;
    title: string;
  }
  const [banners, setBanners] = useState<NoticeBanner[]>([]); // 공지사항 배너 목록
  const [banner, setBanner] = useState<NoticeBanner | null>(null); // 선택한 공지사항 배너

  // 공지사항 배너 목록 불러오기
  const fetchNoticeBanners = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/notice/titles");
      setBanners(response.data.result);
    } catch (err) {
      console.error("공지사항 데이터를 가져오는 중 오류 발생:", err);
    }
  }, []);

  useEffect(() => {
    fetchNoticeBanners();
  }, [fetchNoticeBanners]);

  // 공지사항 배너
  const handleBannerChange = useCallback(
    (_event: React.SyntheticEvent<Element, Event>, value: unknown) => {
      setBanner(value as NoticeBanner);
    },
    []
  );

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

  // 특정 예약 제한 정보 불러오기
  const [restrictionId, setRestrictionId] = useState<string | null>(null); // 예약 제한 ID
  const fetchBookRestriction = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/book/restriction/${location.pathname.split("/").pop()}`
      );

      console.log(response);

      setRestrictionId(response.data.restrictions.restriction_id);
      setSelectedSeats(response.data.restrictions.seat_names);
      setStartDate(dayjs(response.data.restrictions.restriction_start_date));
      setEndDate(dayjs(response.data.restrictions.restriction_end_date));
      setBanner(
        banners.find(
          (banner) => banner.notice_id === response.data.restrictions.notice_id
        ) || null
      );
    } catch (err) {
      console.error("예약 제한 데이터를 가져오는 중 오류 발생:", err);
    }
  }, [banners, location.pathname]);

  useEffect(() => {
    fetchBookRestriction();
  }, [fetchBookRestriction]);

  // 등록 버튼 클릭
  const loginState = useAtomValue(loginStateAtom);
  const navigate = useNavigate();

  const handleRegisterButtonClick = useCallback(async () => {
    // 좌석 선택 안함
    if (selectedSeats.length <= 0) {
      alert("금지할 좌석을 선택하세요.");
      return;
    }

    console.log(dayjs());

    // 시작 날짜 부적절
    if (!startDate || startDate.isBefore(dayjs().hour(0).minute(0).second(0))) {
      alert("시작 날짜를 오늘 날짜 이후로 설정하세요.");
      return;
    }

    // 종료 날짜 부적절
    if (!endDate || endDate.isBefore(startDate.add(1, "minute"))) {
      alert("종료 날짜를 시작 날짜 이후로 설정하세요.");
      return;
    }

    // 좌석 이름들을 쉼표로 구분하여 문자열 생성
    const seatNames = selectedSeats.join(",");

    try {
      const csrfResponse = await axiosInstance.get("/csrf-token");
      const csrfToken = csrfResponse.data.csrfToken;

      const response = await axiosInstance.post(
        "/admin/book/restriction",
        {
          selectedSeats, // 전체 좌석 데이터 전송
          seatNames, // 좌석 이름 문자열 전송 예) A1,A2,B3
          startDate: startDate
            ? startDate.format("YYYY-MM-DDTHH:mm")
            : undefined, // 시작 날짜
          endDate: endDate ? endDate.format("YYYY-MM-DDTHH:mm") : undefined, // 종료 날짜
          selectedNotice: banner?.notice_id, // _id를 전송
          userId: loginState.userId, // 관리자 ID
        },
        {
          headers: {
            "CSRF-Token": csrfToken,
          },
        }
      );

      if (response.data.success) {
        alert("좌석 금지가 성공적으로 완료되었습니다.");

        // 초기화
        navigate("/book-restrictions");
      } else {
        alert("예약 제한 등록 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("예약 제한 등록 중 오류 발생:", error);
      alert("예약 제한 등록 중 오류가 발생했습니다.");
    }
  }, [
    banner?.notice_id,
    endDate,
    loginState.userId,
    navigate,
    selectedSeats,
    startDate,
  ]);

  // 수정 버튼 클릭
  const handleEditButtonClick = useCallback(async () => {
    try {
      const csrfResponse = await axiosInstance.get("/csrf-token");
      const csrfToken = csrfResponse.data.csrfToken;

      console.log(banner?.notice_id);

      await axiosInstance.patch(
        `/admin/book/restriction/${location.pathname.split("/").pop()}`,
        {
          restrictionId, // 예약 제한 ID 전송
          selectedSeats, // 좌석 객체 배열 전송
          seatNames: selectedSeats.join(","), // 중요
          startDate: startDate
            ? startDate.format("YYYY-MM-DDTHH:mm")
            : undefined, // 시작 날짜
          endDate: endDate ? endDate.format("YYYY-MM-DDTHH:mm") : undefined, // 종료 날짜
          selectedNotice: banner?.notice_id,
          userId: loginState.userId, // 관리자 ID 전송
        },
        { headers: { "CSRF-Token": csrfToken } }
      );

      alert("수정이 완료되었습니다.");
      navigate("/book-restrictions");
    } catch (err) {
      console.error("수정 중 오류 발생:", err);
      alert("수정 중 오류가 발생했습니다.");
    }
  }, [
    banner?.notice_id,
    endDate,
    location.pathname,
    loginState.userId,
    navigate,
    restrictionId,
    selectedSeats,
    startDate,
  ]);

  // 삭제 버튼 클릭
  const handleDeleteButtonClick = useCallback(async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const csrfResponse = await axiosInstance.get("/csrf-token");
      const csrfToken = csrfResponse.data.csrfToken;

      const response = await axiosInstance.delete(
        `/admin/book/restriction/${location.pathname.split("/").pop()}`,
        {
          data: {
            userId: loginState.userId,
            restrictionId: restrictionId,
          },
          headers: { "CSRF-Token": csrfToken },
        }
      );

      if (response.data.success) {
        alert("삭제가 완료되었습니다.");
        navigate("/book-restrictions");
      } else {
        alert("삭제 중 오류가 발생했습니다.");
      }
    } catch {
      alert("삭제 중 오류가 발생했습니다.");
    }
  }, [location.pathname, loginState.userId, navigate, restrictionId]);

  return (
    <TokenRefresher>
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
                        <Stack
                          direction={{
                            xs: "column",
                            sm: "row",
                          }}
                          gap={2}
                        >
                          <MobileDateTimePicker
                            label="시작 시간"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            minDate={
                              location.pathname === "/book-restrictions/new"
                                ? dayjs().hour(0).minute(0).second(0)
                                : dayjs()
                                    .hour(0)
                                    .minute(0)
                                    .second(0)
                                    .add(-1, "year")
                            }
                            minTime={
                              location.pathname === "/book-restrictions/new"
                                ? dayjs().hour(0).minute(0).second(0)
                                : dayjs()
                                    .hour(0)
                                    .minute(0)
                                    .second(0)
                                    .add(-1, "year")
                            }
                            format="YYYY-MM-DD hh:mm A"
                            sx={{
                              width: "100%",
                              minWidth: "190px",
                            }}
                          />

                          <Box
                            alignSelf="center"
                            display={{
                              xs: "none",
                              sm: "block",
                            }}
                          >
                            <Typography variant="h5">~</Typography>
                          </Box>

                          <MobileDateTimePicker
                            label="종료 시간"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            minDate={startDate ?? dayjs().add(1, "minute")}
                            minTime={startDate ?? dayjs().add(1, "minute")}
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

                    <Autocomplete
                      options={banners}
                      getOptionLabel={(option) => option.title}
                      value={banner}
                      onChange={(event, value) =>
                        handleBannerChange(event, value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="관리자 설정으로 좌석 예약이 제한되고 있습니다."
                          variant="outlined"
                        />
                      )}
                      renderOption={(props, option) => {
                        console.log(option);
                        return (
                          <Box component="li" {...props}>
                            {option.title}
                          </Box>
                        );
                      }}
                    />
                  </Stack>

                  {location.pathname === "/book-restrictions/new" && (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleRegisterButtonClick}
                    >
                      <Typography variant="h2">등록하기</Typography>
                    </Button>
                  )}
                  {location.pathname !== "/book-restrictions/new" && (
                    <Stack direction="row" gap={2}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleEditButtonClick}
                      >
                        <Typography variant="h2">수정하기</Typography>
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={handleDeleteButtonClick}
                      >
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
    </TokenRefresher>
  );
};

export default BookRestrictionDetail;
