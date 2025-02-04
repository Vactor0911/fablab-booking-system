import {
  AppBar,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import { Link, useLocation, useNavigate } from "react-router";
import { useCallback, useRef, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  isDarkModeAtom,
  LoginState,
  loginStateAtom,
  myCurrentReservationAtom,
  Permission,
  seatInfoAtom,
  SeatInfoProps,
} from "../states";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightMode";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DrawerMenu from "./DrawerMenu";
import axiosInstance, { getCsrfToken } from "../utils/axiosInstance";

// Link 요소 CSS
const LinkCss = {
  textDecoration: "none",
  color: "white",
};

// 메뉴 아이템 CSS
const MenuItemCss = {
  "&:hover, &:active": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  },
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 네비게이션 링크 버튼
  const NavLinkButton = (
    text: string,
    props: React.ComponentProps<typeof Button>
  ) => {
    return (
      <Button
        variant="text"
        sx={{
          margin: "10px 0",
          color: "white",
          fontSize: "1.25em",
          fontWeight: "bold",
        }}
        {...props}
      >
        {text}
      </Button>
    );
  };

  // 내 계정 드롭다운 메뉴
  const anchorAccountMenuElem = useRef<HTMLButtonElement>(null); // 내 계정 메뉴 버튼 엘리먼트
  const [accountMenuOpen, setAccountMenuOpen] = useState(false); // 내 계정 메뉴 열림 상태
  const [loginState, setLoginState] = useAtom(loginStateAtom); // 로그인 상태

  // 내 계정 버튼 클릭
  const handleAccountButtonClick = useCallback(() => {
    if (!loginState.isLoggedIn) {
      navigate("/login");
      return;
    }
    setAccountMenuOpen(true);
  }, [loginState, navigate]);

  // 내 계정 메뉴 닫기
  const handleAccountMenuClose = useCallback(() => {
    setAccountMenuOpen(false);
  }, []);

  // 관리 메뉴 드롭다운 메뉴
  const anchorManageMenuElem = useRef<HTMLButtonElement>(null); // 관리 메뉴 버튼 엘리먼트
  const [manageMenuOpen, setManageMenuOpen] = useState(false); // 관리 메뉴 열림 상태

  // 관리 메뉴 버튼 클릭
  const handleManageMenuButtonClick = useCallback(() => {
    if (loginState.permission === Permission.USER) {
      return;
    }
    setManageMenuOpen(true);
  }, [loginState.permission]);

  // 관리 메뉴 닫기
  const handleManageMenuClose = useCallback(() => {
    setManageMenuOpen(false);
  }, []);

  // 드로어 메뉴
  const anchorDrawerElem = useRef<HTMLButtonElement>(null); // 드로어 메뉴 버튼 엘리먼트
  const [drawerOpen, setDrawerOpen] = useState(false); // 드로어 메뉴 열림 상태

  // 드로어 메뉴 열기
  const handleDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  // 드로어 메뉴 버튼 클릭
  const handleDrawerButtonClick = useCallback(() => {
    handleDrawerOpen();
  }, [handleDrawerOpen]);

  // 드로어 메뉴 닫기
  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  // 다크모드
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom); // 다크모드 상태

  // 테마 변경 버튼 클릭
  const handleThemeChangeClick = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, [setIsDarkMode]);

  // 로그아웃 버튼 클릭
  const handleLogoutButtonClick = useCallback(async () => {
    if (!loginState.isLoggedIn) {
      alert("로그인이 필요합니다."); // 로그인 상태가 아닌 경우 알림
      return;
    }

    // CSRF 토큰 가져오기
    const csrfToken = await getCsrfToken();

    const response = await axiosInstance.post(
      "/users/logout",
      {},
      {
        headers: {
          "X-CSRF-Token": csrfToken, // CSRF 토큰 헤더 추가
        },
      }
    );

    try {
      if (response.data.success) {
        // Jotai 상태
        setLoginState({} as LoginState);
        
        // 로컬 스토리지 삭제
        localStorage.removeItem("FabLabLoginState");

        alert("로그아웃이 성공적으로 완료되었습니다."); // 성공 메시지

        navigate("/"); // 메인 페이지로 이동
      } else {
        alert("로그아웃 처리에 실패했습니다."); // 실패 메시지
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요."); // 에러 메시지
    }
  }, [loginState.isLoggedIn, navigate, setLoginState]);

  // 내 예약 정보 불러오기
  const [myCurrentReservation, setMyCurrentReservation] = useAtom(
    myCurrentReservationAtom
  );

  // 좌석 정보 불러오기
  const setSeatInfo = useSetAtom(seatInfoAtom);
  const refreshSeatInfo = useCallback(async () => {
    try {
      // 권한 확인 API 호출
      const response = await axiosInstance.get("/users/info", {
        headers: {
          "X-CSRF-Token": await getCsrfToken(), // CSRF 토큰 헤더 추가
        },
      });

      // 사용자 권한
      const userPermission = response.data.user.permission;

      // 권한에 따른 좌석 정보 불러오기
      const seatsResponse = await axiosInstance.get(
        userPermission === "admin" || userPermission === "superadmin"
          ? "/admin/seats"
          : "/seats"
      );
      const newSeatInfo: Record<string, SeatInfoProps> = {};
      // 좌석 정보 저장
      seatsResponse.data.seats.map(
        (seat: { seat_name: string; state: string; user_name: string }) => {
          newSeatInfo[seat.seat_name] = {
            seatName: seat.seat_name,
            state: seat.state,
            userName: seat.user_name,
          };
        }
      );
      setSeatInfo(newSeatInfo);
    } catch (error) {
      console.error("좌석 데이터를 가져오는 중 오류 발생:", error);
    }
  }, [setSeatInfo]);

  // 퇴실하기 버튼 클릭
  const handleExitButtonClick = useCallback(() => {
    // CSRF 토큰 가져오기
    getCsrfToken()
      .then((csrfToken) => {
        // 좌석 퇴실 API 호출
        return axiosInstance.delete("/reservations", {
          headers: {
            "X-CSRF-Token": csrfToken, // CSRF 토큰 헤더 추가
          },
        });
      })
      .then((response) => {
        alert(
          response.data.message || "좌석 퇴실이 성공적으로 완료되었습니다."
        );
        setMyCurrentReservation(null);
        refreshSeatInfo();
      })
      .catch((error) => {
        console.error("퇴실 처리 중 오류 발생:", error);
        if (error.response?.status === 403) {
          alert("CSRF 토큰 오류: 요청을 다시 시도해 주세요.");
        } else {
          alert(
            error.response?.data?.message || "퇴실 처리 중 오류가 발생했습니다."
          );
        }
      });
  }, [refreshSeatInfo, setMyCurrentReservation]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          backgroundColor:
            location.pathname === "/"
              ? "transparent"
              : theme.palette.primary.main,
          position: location.pathname === "/" ? "absolute" : "relative",
          zIndex: 100,
        }}
      >
        <Toolbar
          sx={{
            height: {
              xs: "60px",
              sm: "80px",
            },
            justifyContent: "space-between",
          }}
        >
          {/* 로고 */}
          <Link to="/" css={LinkCss}>
            <Typography
              variant="h1"
              sx={{
                color: "white",
              }}
            >
              FabLab
            </Typography>
          </Link>

          {/* 네비게이션 바 */}
          <Stack direction="row" gap={2}>
            <Stack
              direction="row"
              gap={2}
              display={{
                xs: "none",
                sm: "flex",
              }}
            >
              {(!loginState.isLoggedIn ||
                loginState.permission === Permission.USER) &&
                NavLinkButton("예약하기", {
                  onClick: () => navigate("/reservation"),
                })}
              {loginState.isLoggedIn &&
                loginState.permission !== Permission.USER &&
                NavLinkButton("관리메뉴", {
                  onClick: handleManageMenuButtonClick,
                  ref: anchorManageMenuElem,
                })}
              {NavLinkButton("팹랩소개", { onClick: () => navigate("/about") })}
              {NavLinkButton("공지사항", {
                onClick: () => navigate("/notice"),
              })}
            </Stack>

            {/* 내 계정 버튼 */}
            <Stack justifyContent="center">
              <Tooltip title={loginState.isLoggedIn ? "내 계정" : "로그인"}>
                <IconButton
                  onClick={handleAccountButtonClick}
                  ref={anchorAccountMenuElem}
                  sx={{ p: 0 }}
                >
                  <AccountCircleRoundedIcon
                    fontSize="large"
                    sx={{
                      color: "white",
                      fontSize: { xs: "1.5em", sm: "2em" },
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>

            {/* 모바일용 햄버거 메뉴 */}
            <Stack
              justifyContent="center"
              display={{
                xs: "flex",
                sm: "none",
              }}
            >
              <Tooltip title="메뉴">
                <IconButton
                  onClick={handleDrawerButtonClick}
                  ref={anchorDrawerElem}
                  sx={{ p: 0 }}
                >
                  <MenuRoundedIcon
                    fontSize="large"
                    sx={{
                      color: "white",
                      fontSize: { xs: "1.5em", sm: "2em" },
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* 내 계정 드롭다운 메뉴 */}
      <Menu
        anchorEl={anchorAccountMenuElem.current}
        open={accountMenuOpen}
        onClose={handleAccountMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          marginTop: "5px",
        }}
      >
        {/* 내 정보 */}
        <MenuItem
          onClick={() => {
            handleAccountMenuClose();
            navigate("/my-page");
          }}
          sx={MenuItemCss}
        >
          <ListItemIcon>
            <PersonRoundedIcon />
          </ListItemIcon>
          <ListItemText>내 정보</ListItemText>
        </MenuItem>

        {/* 내 예약정보 */}
        {loginState.permission === Permission.USER && (
          <MenuItem
            onClick={() => {
              handleAccountMenuClose();
              navigate("/my-reservation");
            }}
            sx={MenuItemCss}
          >
            <ListItemIcon>
              <CalendarMonthRoundedIcon />
            </ListItemIcon>
            <ListItemText>내 예약정보</ListItemText>
          </MenuItem>
        )}

        {/* 퇴실하기 */}
        {loginState.permission === Permission.USER && myCurrentReservation && (
          <MenuItem
            onClick={() => {
              handleAccountMenuClose();
              handleExitButtonClick();
            }}
            sx={{
              ...MenuItemCss,
              color: "red",
            }}
          >
            <ListItemIcon>
              <ExitToAppRoundedIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText>퇴실하기</ListItemText>
          </MenuItem>
        )}

        {/* 라이트모드 */}
        {isDarkMode && (
          <MenuItem
            onClick={() => {
              handleAccountMenuClose();
              handleThemeChangeClick();
            }}
            sx={MenuItemCss}
          >
            <ListItemIcon>
              <LightModeRoundedIcon />
            </ListItemIcon>
            <ListItemText>라이트모드</ListItemText>
          </MenuItem>
        )}

        {/* 로그아웃 */}
        <MenuItem
          onClick={() => {
            handleAccountMenuClose();
            handleLogoutButtonClick();
          }}
          sx={MenuItemCss}
        >
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText>로그아웃</ListItemText>
        </MenuItem>
      </Menu>

      {/* 관리 메뉴 드롭다운 메뉴 */}
      <Menu
        anchorEl={anchorManageMenuElem.current}
        open={manageMenuOpen}
        onClose={handleManageMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          marginTop: "5px",
        }}
      >
        {[
          {
            text: "기본 설정",
            link: "/settings",
          },
          {
            text: "예약 조회",
            link: "/reservation",
          },
          {
            text: "예약 제한 관리",
            link: "/book-restrictions",
          },
          {
            text: "사용자 관리",
            link: "/users",
          },
          {
            text: "로그 관리",
            link: "/logs",
          },
        ].map(({ text, link }, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleManageMenuClose();
              navigate(link);
            }}
            sx={MenuItemCss}
          >
            <ListItemText sx={{ textAlign: "center" }}>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {/* 드로어 메뉴 */}
      <DrawerMenu drawerOpen={drawerOpen} drawerClose={handleDrawerClose} />
    </ThemeProvider>
  );
};

export default Header;
