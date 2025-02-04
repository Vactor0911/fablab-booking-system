import {
  Box,
  Button,
  createTheme,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { TabPanelProps } from "../../pages/Settings";
import { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import axiosInstance from "../../utils/axiosInstance";
import SectionHeader from "../SectionHeader";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useAtomValue } from "jotai";
import { loginStateAtom } from "../../states";

const CommonTabPanel = (props: TabPanelProps) => {
  const { value, index } = props;

  // 기본 예절
  const [basicManners, setBasicManners] = useState(""); // 기본 예절
  const handleBasicMannersChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBasicManners(event.target.value);
    },
    []
  );

  // 이용 가능 시작 시간
  const [openingHour, setOpeningHour] = useState<Dayjs | null>(dayjs()); // 시작 시간
  const [closingHour, setClosingHour] = useState<Dayjs | null>(dayjs()); // 종료 시간

  // 기본 설정 불러오기
  const fetchSettings = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/admin/default-settings");

      console.log(response.data.data);

      setBasicManners(response.data.data.basic_manners);

      const newOpeningHour = response.data.data.available_start_time.split(":");
      setOpeningHour(
        dayjs()
          .hour(Number(newOpeningHour[0]))
          .minute(Number(newOpeningHour[1]))
      );
      const newClosingHour = response.data.data.available_end_time.split(":");
      setClosingHour(
        dayjs()
          .hour(Number(newClosingHour[0]))
          .minute(Number(newClosingHour[1]))
      );
    } catch (err) {
      console.error("설정 데이터를 가져오는 중 오류 발생:", err);
    }
  }, []);

  useEffect(() => {
    if (value !== index) {
      return;
    }
    fetchSettings();
  }, [fetchSettings, index, value]);

  // 수정하기 버튼 클릭
  const loginState = useAtomValue(loginStateAtom);
  const handleCommonEditButtonClick = useCallback(async () => {
    // 기본 예절 미입력
    if (!basicManners) {
      alert("기본 예절을 입력해주세요.");
      return;
    }

    // 기본 예절 내용 부적절
    if (/[`'<>-]/.test(basicManners)) {
      alert("기본 예절에 부적절한 특수 기호가 포함되어 있습니다.");
      return;
    }

    // 이용 시작 시간 미선택
    if (!openingHour) {
      alert("이용 시작 시간을 선택해주세요.");
      return;
    }

    // 이용 종료 시간 미선택
    if (!closingHour) {
      alert("이용 시작 시간을 선택해주세요.");
      return;
    }

    // 이용 종료 시간 범위 부적절
    if (closingHour.isBefore(openingHour)) {
      alert("이용 시간 범위가 적합하지 않습니다.");
      return;
    }

    // 수정 요청
    try {
      const csrfResponse = await axiosInstance.get("/csrf-token");
      const csrfToken = csrfResponse.data.csrfToken;

      await axiosInstance.patch(
        "/admin/default-settings",
        {
          userId: loginState.userId,
          basic_manners: basicManners,
          available_start_time: openingHour.format("HH:mm:00"),
          available_end_time: closingHour.format("HH:mm:00"),
        },
        {
          headers: { "CSRF-Token": csrfToken },
        }
      );
      alert("설정이 저장되었습니다.");
    } catch (err) {
      console.error("설정 저장 중 오류 발생:", err);
      alert(
        `설정 저장에 실패했습니다.\n원인: ${
          (axios.isAxiosError(err) && err.response?.data?.message) ||
          "알 수 없는 오류"
        }`
      );
    }
  }, [basicManners, closingHour, openingHour]);

  return (
    <Box role="tabpanel" hidden={value !== index}>
      <Stack gap={5}>
        {/* 공통 설정 */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          gap={{
            xs: 5,
            md: 10,
          }}
        >
          {/* 기본 예절 */}
          <Stack gap={3} flex={1}>
            <SectionHeader title="기본 예절" />
            <TextField
              multiline
              value={basicManners}
              onChange={handleBasicMannersChange}
              minRows={14}
              maxRows={14}
              fullWidth
            />
          </Stack>

          {/* 이용 가능 시간 */}
          <Stack gap={3} flex={1}>
            <SectionHeader title="이용 가능 시간" />
            <ThemeProvider
              theme={createTheme({
                typography: {
                  h3: {
                    fontSize: "3rem",
                    lineHeight: "3rem",
                  },
                },
              })}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" gap={2}>
                  <Box flex={1}>
                    <MobileTimePicker
                      label="이용 시작 시간"
                      value={openingHour}
                      onChange={setOpeningHour}
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box flex={1}>
                    <MobileTimePicker
                      label="이용 종료 시간"
                      value={closingHour}
                      onChange={setClosingHour}
                      minTime={openingHour?.add(1, "minute")}
                      sx={{ width: "100%" }}
                    />
                  </Box>
                </Stack>
              </LocalizationProvider>
            </ThemeProvider>
          </Stack>
        </Stack>

        {/* 수정 버튼 */}
        <Box
          alignSelf="flex-end"
          width={{
            xs: "100%",
            sm: "auto",
          }}
        >
          <Button
            variant="contained"
            onClick={handleCommonEditButtonClick}
            fullWidth
          >
            <Typography variant="h2">수정하기</Typography>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CommonTabPanel;
