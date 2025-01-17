import {
  Box,
  Button,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import FabLabImage from "../assets/FabLabImage.jpg";
import { theme } from "../utils";
import { Link } from "react-router";
import SmapleImage from "../assets/SampleImage.png";
import { Interpolation, Theme } from "@emotion/react";
import { useAtomValue } from "jotai";
import { loginStateAtom } from "../states";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";

const LinkCss = {
  textDecoration: "none",
  color: "black",
};

const MobileNavLinkCss: Interpolation<Theme> = {
  ...LinkCss,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const Home = () => {
  const loginState = useAtomValue(loginStateAtom); // 로그인 상태

  return (
    <ThemeProvider theme={theme}>
      <Stack className="page-root" direction="column" minHeight="100vh">
        {/* 배너 */}
        <Stack
          height="45vh"
          minHeight="300px"
          maxHeight="500px"
          padding="80px 0"
          display={{
            xs: "none",
            sm: "flex",
          }}
          justifyContent="center"
          alignItems="center"
          position="relative"
          overflow="hidden"
          sx={{
            "&:before, &:after": {
              content: "''",
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
            },
            "&:before": {
              background: "linear-gradient(black, transparent)",
              backgroundImage: `url(${FabLabImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(5px)",
              transform: "scale(1.1)",
              zIndex: "-2",
            },
            "&:after": {
              background:
                "linear-gradient(rgba(0, 0, 0, 0.7), transparent 50%)",
              zIndex: "-1",
            },
          }}
        >
          <Typography
            variant="h2"
            padding="0 30px"
            textAlign="center"
            fontWeight="bold"
            color="white"
          >
            FabLab 슬로건 입력될 자리
          </Typography>
        </Stack>

        {/* 하단 메뉴 */}
        <Stack
          direction={{ xs: "column-reverse", sm: "column", md: "row" }}
          spacing={{
            xs: 3,
            md: 0,
          }}
          padding={{
            xs: "20px",
            sm: "50px 30px",
            md: "50px 0",
          }}
          justifyContent={{
            xs: "flex-start",
            md: "space-evenly",
          }}
        >
          {/* 공지사항 */}
          <Stack
            direction="column"
            spacing={5}
            width={{
              xs: "100%",
              md: "45vw",
            }}
            overflow="hidden"
          >
            {/* 공지사항 링크 */}
            <Stack direction="row">
              <Link
                to="/notice"
                css={{
                  ...LinkCss,
                  display: "flex",
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  공지사항
                </Typography>
                <ChevronRightRoundedIcon fontSize="large" color="secondary" />
              </Link>
            </Stack>

            {/* 공지사항 목록 */}
            <Stack
              direction="column"
              spacing={2}
              padding={{
                xs: "20px 10px",
                sm: "0",
              }}
              border={{
                xs: "1px solid #afafaf",
                sm: "none",
              }}
              borderRadius="10px"
            >
              {[
                "공지사항1",
                "공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2",
                "공지사항3",
                "공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4",
                "공지사항5",
                "공지사항6",
              ].map((notice, index) => (
                <Stack key={`notice${index}`} direction="row">
                  <Link
                    to="/notice"
                    css={{
                      ...LinkCss,
                      display: "flex",
                      alignItems: "center",
                      overflow: "hidden",
                      gap: "10px",
                    }}
                  >
                    <CircleRoundedIcon
                      fontSize="small"
                      color="primary"
                      sx={{
                        display: { xs: "none", sm: "inline-block" },
                      }}
                    />
                    <CampaignRoundedIcon
                      sx={{
                        display: { xs: "inline-block", sm: "none" },
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {notice}
                    </Typography>
                  </Link>
                </Stack>
              ))}
            </Stack>

            {/* 더보기 버튼 */}
            <Stack
              direction="row"
              justifyContent="flex-end"
              display={{ xs: "none", sm: "flex" }}
            >
              <Link to="/notice" css={LinkCss}>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  fontWeight="bold"
                >
                  더보기
                </Typography>
              </Link>
            </Stack>
          </Stack>

          {/* 구분선 */}
          <Divider
            flexItem
            sx={{
              borderWidth: "2px",
              borderRadius: "10px",
              [theme.breakpoints.down("md")]: { display: "none" },
            }}
          />

          {/* 모바일용 종합정보시스템 링크 */}
          <MuiLink
            href="https://i.mokwon.ac.kr/"
            underline="none"
            padding="20px 0"
            display={{
              xs: "flex",
              sm: "none",
            }}
            justifyContent="center"
            alignItems="center"
            gap={1}
            border="1px solid #afafaf"
            borderRadius="15px"
            color="white"
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Box component="img" alt="목원대 로고" src="" />
            <Typography variant="subtitle1" fontWeight="bold">
              종합 정보 시스템
            </Typography>
          </MuiLink>

          {/* 모바일용 네비게이션 바 */}
          <Stack
            display={{
              xs: "flex",
              sm: "none",
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link to="/reservation" css={MobileNavLinkCss}>
              <CalendarMonthRoundedIcon />
              <Typography variant="subtitle1" fontWeight="bold">
                예약하기
              </Typography>
            </Link>
            <Link to="/about" css={MobileNavLinkCss}>
              <ImportContactsRoundedIcon />
              <Typography variant="subtitle1" fontWeight="bold">
                팹랩소개
              </Typography>
            </Link>
            <MuiLink
              href="https://www.mokwon.ac.kr/"
              underline="none"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="black"
            >
              <LanguageRoundedIcon />
              <Typography variant="subtitle1" fontWeight="bold">
                목원홈
              </Typography>
            </MuiLink>
            <MuiLink
              href="https://www.mokwon.ac.kr/computer/"
              underline="none"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="black"
            >
              <LanguageRoundedIcon />
              <Typography variant="subtitle1" fontWeight="bold">
                컴공홈
              </Typography>
            </MuiLink>
          </Stack>

          {/* 내 예약현황 */}
          <Stack
            direction="column"
            spacing={loginState ? { xs: 2, sm: 3, md: 5 } : 0}
            width={{
              xs: "100%",
              md: "35vw",
            }}
          >
            {/* 내 예약현황 링크 */}
            <Stack direction="row">
              <Link to="/my-reservation" css={{ ...LinkCss, display: "flex" }}>
                <Typography variant="h5" fontWeight="bold">
                  내 예약현황
                </Typography>
                <ChevronRightRoundedIcon fontSize="large" color="secondary" />
              </Link>
            </Stack>

            {/* 예약 좌석 */}
            <Link
              to="/my-reservation"
              css={{
                ...LinkCss,
                display: loginState ? "flex" : "none",
              }}
            >
              <Stack
                direction={{
                  xs: "row-reverse",
                  sm: "row",
                }}
                spacing={2}
                alignItems="center"
                padding={{
                  xs: "15px",
                  sm: "0",
                }}
                border={{
                  xs: "1px solid #afafaf",
                  sm: "none",
                }}
                borderRadius={"10px"}
              >
                {/* 좌석 사진 */}
                <Box
                  component="img"
                  alt="좌석 사진"
                  src={SmapleImage}
                  width={{ xs: "80px", sm: "150px", md: "130px" }}
                  borderRadius="10px"
                />

                {/* 예약 정보 */}
                <Stack direction="column" flex={1}>
                  <Typography variant="h6" fontWeight="bold">
                    예약 좌석
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={{
                      xs: 0,
                      sm: 1,
                    }}
                    flexWrap={"wrap"}
                  >
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      width={"60px"}
                      display={{ xs: "none", sm: "block" }}
                      fontWeight="bold"
                    >
                      예약 날짜
                    </Typography>
                    <Typography variant="subtitle1">
                      1월 15일 (수) 13:00 ~ 22:00
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      width={"60px"}
                      fontWeight="bold"
                    >
                      선택 좌석
                    </Typography>
                    <Typography variant="subtitle1">A11</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      width={"60px"}
                      fontWeight="bold"
                    >
                      PC 지원
                    </Typography>
                    <Typography variant="subtitle1">Windows 11</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Link>

            {/* 퇴실하기 버튼 */}
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<ExitToAppRoundedIcon />}
              size="large"
              sx={{
                display: loginState ? "inline-flex" : "none",
                ".MuiSvgIcon-root": {
                  fontSize: "2em",
                },
                [theme.breakpoints.only("xs")]: {
                  display: "none",
                },
              }}
            >
              <h2>퇴실하기</h2>
            </Button>

            {/* 로그인 버튼 */}
            <Stack justifyContent="center" flex={1}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<VpnKeyRoundedIcon />}
                size="large"
                sx={{
                  display: loginState ? "none" : "inline-flex",
                  ".MuiSvgIcon-root": {
                    fontSize: "2em",
                  },
                  [theme.breakpoints.only("xs")]: {
                    display: "none",
                  },
                }}
              >
                <h2>로그인</h2>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default Home;
