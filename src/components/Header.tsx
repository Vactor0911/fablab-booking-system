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
import { useAtom, useAtomValue } from "jotai";
import { isDarkModeAtom, loginStateAtom, Permission } from "../states";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkMode";
import LightModeRoundedIcon from "@mui/icons-material/LightMode";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DrawerMenu from "./DrawerMenu";

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
  const loginState = useAtomValue(loginStateAtom); // 로그인 상태

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
  }, []);

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
              {loginState.permission === Permission.USER &&
                NavLinkButton("예약하기", {
                  onClick: () => navigate("/reservation"),
                })}
              {loginState.permission !== Permission.USER &&
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
        {loginState.permission === Permission.USER && (
          <MenuItem
            onClick={handleAccountMenuClose}
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

        {/* 다크모드 */}
        {!isDarkMode && (
          <MenuItem
            onClick={() => {
              handleAccountMenuClose();
              handleThemeChangeClick();
            }}
            sx={MenuItemCss}
          >
            <ListItemIcon>
              <DarkModeRoundedIcon />
            </ListItemIcon>
            <ListItemText>다크모드</ListItemText>
          </MenuItem>
        )}

        {/* 도움말 */}
        <MenuItem onClick={handleAccountMenuClose} sx={MenuItemCss}>
          <ListItemIcon>
            <HelpOutlineRoundedIcon />
          </ListItemIcon>
          <ListItemText>도움말</ListItemText>
        </MenuItem>

        {/* 로그아웃 */}
        <MenuItem onClick={handleAccountMenuClose} sx={MenuItemCss}>
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
        ].map(({ text, link }) => (
          <MenuItem
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
