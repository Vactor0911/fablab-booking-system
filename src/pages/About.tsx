import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import CircleIcon from "@mui/icons-material/Circle";

const StyledListItem = ({ text }: { text: string }) => {
  return (
    <ListItem
      sx={{
        padding: "3px 0",
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: "auto",
          marginRight: "0.5em",
        }}
      >
        <CircleIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="subtitle1">{text}</Typography>
    </ListItem>
  );
};

const About = () => {
  return (
    <ThemeProvider theme={theme}>
      <Stack className="page-root">
        <Stack className="base-layout" gap={2}>
          {/* 팹랩 소개 */}
          <Typography variant="h2" fontWeight="bold">
            팹랩 소개
          </Typography>

          {/* 구분선 */}
          <Divider
            sx={{
              borderWidth: "1px",
              borderRadius: "2px",
            }}
          />

          {/* 팹랩 소개 내용 */}
          <Stack
            gap={5}
            padding={2}
            border={`7px double ${theme.palette.primary.main}`}
            fontSize="1.2em"
          >
            {/* 팹랩이란 */}
            <Stack gap={1}>
              <Typography variant="h2">팹랩이란?</Typography>
              <Typography variant="subtitle1" color="primary" fontSize="1.1em">
                컴공인의 꿈을 키우는 창의공간 팹랩
              </Typography>
              <Typography variant="subtitle1">
                팹랩(Fab-Lab)은 "Fabrication Laboratory"의 약자로, MIT 미디어랩
                닐 거센필드 교수가 고안한 디지털 제작 공방을 말합니다. 이 공간은
                교육, 학습, 회의, 토론, 연구개발, 제작을 연계하는 다목적 기능의
                학습 공간입니다.
              </Typography>
              <List>
                <StyledListItem text="Learn: 도구의 사용법을 배우고" />
                <StyledListItem text="Make: 도구를 사용하여 물건을 만들며" />
                <StyledListItem text="Share: 경험과 지식을 공유하는 학습 과정을 제공합니다." />
              </List>
            </Stack>

            {/* 팹랩 운영 정보 */}
            <Stack gap={1}>
              <Typography variant="h3">팹랩 운영 정보</Typography>
              <List>
                <StyledListItem text="위치: 목원대학교 컴퓨터공학과 D337호" />
                <StyledListItem text="운영 시간: 월 ~ 금 (공휴일 제외), 09:00 ~ 22:00" />
                <StyledListItem text="심야 사용 (22:00 ~ 24:00) 및 주말 사용 : 팹랩 서포터즈나 학과사무실에 신청 후 사용가능" />
                <StyledListItem
                  text={`사용 권한: 재학생 신청자 1회 신청으로 졸업시까지 사용 권한 부여, 사용 신청은 학과에서 연 2회 예정으로 온라인 신청 및 오프라인 지문 등록을 진행함.
                특별 기간(시험기간 등)에는 시간 외 사용에 대한 별도 공지가 예정됨`}
                />
              </List>
            </Stack>

            {/* 팹랩 시설 정보 */}
            <Stack gap={1}>
              <Typography variant="h3">팹랩 시설 정보</Typography>
              <List>
                <StyledListItem text="학습 및 실습 공간" />
                <StyledListItem text="4인석 테이블 8개 (각 테이블에 6구 콘센트, 43인치 모니터 및 HDMI케이블 설치)" />
                <StyledListItem text="창가 바 테이블석 10석 (아이맥 3대 및 개인 노트북 사용 가능, 콘센트 설치)" />
                <StyledListItem text="팹랩 내 공용 기계기구 86인치 전자칠판, 86인치 대형 모니터, 전자교탁, 복합기 구비" />
                <StyledListItem text="1인석 12석 (PC 및 모니터 제공, 서포터즈 우선 배치)" />
              </List>
            </Stack>

            {/* 팹랩 서포터즈 제도 */}
            <Stack gap={1}>
              <Typography variant="h3">팹랩 서포터즈 제도</Typography>
              <List>
                <StyledListItem text="활동 내용: 이용자 관리, 시설 관리 및 점검, 기자재 관리" />
                <StyledListItem text="야간 및 공휴일 출입 허가, 비교과 프로그램 우선 참여, 학과 장학금 우선 추천" />
              </List>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default About;
