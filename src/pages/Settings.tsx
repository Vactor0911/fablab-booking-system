import {
  Box,
  Button,
  createTheme,
  Stack,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import AdminPage from "../components/AdminPage";
import { ReactNode, useCallback, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers";

interface TabPanelProps {
  value: string;
  index: string;
  children?: ReactNode;
}

const TabPanel = (props: TabPanelProps) => {
  const { value, index, children } = props;

  return (
    <Box role="tabpanel" hidden={value !== index}>
      {children}
    </Box>
  );
};

const Settings = () => {
  // 탭 메뉴
  const [tabIndex, setTabIndex] = useState("common"); // 탭 메뉴 인덱스
  const handleTabIndexChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setTabIndex(newValue);
    },
    []
  );

  // 이용 가능 시작 시간
  const [openingHour, setOpeningHour] = useState<Dayjs | null>(dayjs()); // 시작 시간
  const [closingHour, setClosingHour] = useState<Dayjs | null>(dayjs()); // 종료 시간

  // 수정하기 버튼 클릭
  const handleEditButtonClick = useCallback(() => {}, []);

  return (
    <AdminPage>
      <ThemeProvider theme={theme}>
        <Stack className="page-root">
          <Stack className="base-layout" gap={7}>
            {/* 페이지명 */}
            <Typography variant="h2">기본 설정</Typography>

            {/* 탭 메뉴 */}
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                position: "relative",
              }}
            >
              {/* 탭 메뉴 */}
              <Tabs value={tabIndex} onChange={handleTabIndexChange}>
                <Tab
                  label="공통"
                  value="common"
                  sx={{ fontSize: "1.17em", fontWeight: "bold" }}
                />
                <Tab
                  label="좌석 정보"
                  value="seat-info"
                  sx={{ fontSize: "1.17em", fontWeight: "bold" }}
                />
              </Tabs>
            </Box>

            {/* 탭 패널 */}
            <TabPanel value={tabIndex} index="common">
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
                    <TextField multiline minRows={14} maxRows={14} fullWidth />
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
                              sx={{ width: "100%" }}
                            />
                          </Box>
                        </Stack>
                      </LocalizationProvider>
                    </ThemeProvider>
                  </Stack>
                </Stack>

                {/* 수정 버튼 */}
                <Box alignSelf="flex-end" width={{
                    xs: "100%",
                    sm: "auto",
                }}>
                  <Button variant="contained" onClick={handleEditButtonClick} fullWidth>
                    <Typography variant="h2">수정하기</Typography>
                  </Button>
                </Box>
              </Stack>
            </TabPanel>
          </Stack>
        </Stack>
      </ThemeProvider>
    </AdminPage>
  );
};

export default Settings;
