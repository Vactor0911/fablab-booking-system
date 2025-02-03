import {
  Box,
  Button,
  createTheme,
  MenuItem,
  Select,
  SelectChangeEvent,
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
import SmapleImage from "../assets/SampleImage.png";
import SeatSelecter from "../components/SeatSelecter";

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
    (_event: React.SyntheticEvent, newValue: string) => {
      setTabIndex(newValue);
    },
    []
  );

  // 이용 가능 시작 시간
  const [openingHour, setOpeningHour] = useState<Dayjs | null>(dayjs()); // 시작 시간
  const [closingHour, setClosingHour] = useState<Dayjs | null>(dayjs()); // 종료 시간

  // 공통 메뉴 수정하기 버튼 클릭
  const handleCommonEditButtonClick = useCallback(() => {}, []);

  // 좌석 정보 메뉴 수정하기 버튼 클릭
  const handleSeatInfoEditButtonClick = useCallback(() => {}, []);

  // 좌석 사진 변경
  const [image, setImage] = useState<string | null>(null);
  const [, setImageRaw] = useState<File | null>(null);
  const handleSeatImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files[0]) {
        const newImage = files[0];
        setImage(URL.createObjectURL(newImage)); // URL로 이미지 저장
        setImageRaw(newImage); // 파일 객체를 그대로 저장
      }
    },
    []
  );

  // PC 지원
  const [pcSupport, setPcSupport] = useState("none");
  const handlePcSupportChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setPcSupport(event.target.value as string);
    },
    []
  );

  // 주의 사항
  const [caution, setCaution] = useState("");
  const handleCautionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCaution(event.target.value);
    },
    []
  );

  // 좌석 선택기
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  return (
    <AdminPage>
      <ThemeProvider theme={theme}>
        <Stack className="page-root">
          <Stack className="base-layout" gap={3}>
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

            {/* 탭 패널 (공통) */}
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
            </TabPanel>

            {/* 탭 패널 (좌석 정보) */}
            <TabPanel value={tabIndex} index="seat-info">
              <Stack
                direction={{
                  xs: "column-reverse",
                  md: "row",
                }}
                gap={5}
                flex={1}
              >
                {/* 좌측 컨테이너 */}
                <Stack gap={5} flex={1}>
                  {/* 좌석명 */}
                  <Stack gap={1}>
                    <SectionHeader title="좌석명" underline />
                    <Typography variant="h2">{selectedSeats[0] ? selectedSeats[0] : "선택 안함"}</Typography>
                  </Stack>

                  {/* 좌석 사진 */}
                  <Stack gap={2}>
                    <SectionHeader title="좌석 사진" underline />

                    <Box
                      component="img"
                      alt="좌석 사진"
                      src={image ?? SmapleImage}
                      alignSelf="center"
                      sx={{
                        width: "150px",
                        borderRadius: "10px",
                        boxShadow: 3,
                      }}
                    />

                    {/* 업로드 버튼 */}
                    <Box alignSelf="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        role={undefined}
                        tabIndex={-1}
                        sx={{
                          borderRadius: "30px",
                          padding: "5px 30px",
                          position: "relative",
                        }}
                      >
                        업로드
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          onChange={handleSeatImageChange}
                          css={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            bottom: 0,
                            left: 0,
                            opacity: 0,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        />
                      </Button>
                    </Box>
                  </Stack>

                  {/* PC 지원 정보 */}
                  <Stack gap={1}>
                    <SectionHeader title="PC 지원" underline />
                    <Select value={pcSupport} onChange={handlePcSupportChange}>
                      <MenuItem value="none">없음</MenuItem>
                      <MenuItem value="windows">Windows</MenuItem>
                      <MenuItem value="mac">MAC</MenuItem>
                    </Select>
                  </Stack>

                  {/* 주의사항 */}
                  <Stack gap={1}>
                    <SectionHeader title="주의사항" underline />
                    <TextField
                      variant="filled"
                      value={caution}
                      onChange={handleCautionChange}
                      sx={{
                        "& .MuiFilledInput-root input": {
                          padding: "12px",
                        },
                      }}
                    />
                  </Stack>

                  {/* 수정 버튼 */}
                  <Button
                    variant="contained"
                    onClick={handleSeatInfoEditButtonClick}
                    fullWidth
                  >
                    <Typography variant="h2">수정하기</Typography>
                  </Button>
                </Stack>

                {/* 좌석 선택기 */}
                <Box overflow="auto" flex={2}>
                  <SeatSelecter
                    minWidth="600px"
                    minHeight="400px"
                    selectedseats={selectedSeats}
                    setselectedseats={setSelectedSeats}
                  />
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
