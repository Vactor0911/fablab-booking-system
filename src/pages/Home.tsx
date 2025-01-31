import {
  Box,
  Button,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import FabLabImage from "../assets/FabLabImage.jpg";
import { theme } from "../utils";
import { Link, useNavigate } from "react-router";
import SmapleImage from "../assets/SampleImage.png";
import { useAtomValue } from "jotai";
import { loginStateAtom } from "../states";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";

const LinkCss = {
  textDecoration: "none",
  color: "black",
};

const Home = () => {
  const loginState = useAtomValue(loginStateAtom); // 로그인 상태
  const navigate = useNavigate(); // 페이지 이동

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" minHeight="100vh">
        {/* 배너 */}
        <Stack
          height={{ xs: "auto", sm: "45vh" }}
          minHeight="300px"
          maxHeight="500px"
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
            variant="h1"
            fontSize={{
              xs: "2em",
              sm: "3em",
              md: "4em",
            }}
            margin="80px 0"
            padding="0 30px"
            textAlign="center"
            color="white"
          >
            FabLab 슬로건 입력될 자리
          </Typography>
        </Stack>

        {/* 하단 메뉴 */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{
            xs: 5,
            md: 0,
          }}
          padding={{
            xs: "50px 20px",
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
            spacing={3}
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
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" fontWeight="bold">
                  공지사항
                </Typography>
                <ChevronRightRoundedIcon fontSize="large" color="secondary" />
              </Link>
            </Stack>

            {/* 공지사항 목록 */}
            <Stack direction="column" spacing={2} borderRadius="10px">
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
                    <CircleRoundedIcon fontSize="small" color="primary" />
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
            <Stack direction="row" justifyContent="flex-end" display="flex">
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

          {/* 내 예약현황 */}
          <Stack
            direction="column"
            spacing={loginState ? { xs: 3, md: 5 } : 0}
            width={{
              xs: "100%",
              md: "35vw",
            }}
          >
            {/* 내 예약현황 링크 */}
            <Stack direction="row">
              <Link
                to="/my-reservation"
                css={{ ...LinkCss, display: "flex", alignItems: "center" }}
              >
                <Typography variant="h2">내 예약현황</Typography>
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
                direction="row"
                spacing={2}
                alignItems="center"
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
                  <Typography variant="h3" fontWeight="bold">
                    예약 좌석
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap={"wrap"}>
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      width={"60px"}
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
                  [theme.breakpoints.down("md")]: {
                    marginTop: "30px",
                  },
                }}
                onClick={() => {
                  navigate("/login");
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
