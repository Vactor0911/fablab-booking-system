import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  SwipeableDrawer,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import { Link, useLocation, useNavigate } from "react-router";
import { useCallback, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isDarkModeAtom, loginStateAtom } from "../states";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkMode";
import LightModeRoundedIcon from "@mui/icons-material/LightMode";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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
  const NavLinkButton = (text: string, to: string) => {
    return (
      <Button
        variant="text"
        sx={{
          margin: "10px 0",
          color: "white",
          fontSize: "1.25em",
          fontWeight: "bold",
        }}
        onClick={() => navigate(to)}
      >
        {text}
      </Button>
    );
  };

  // 드로어 네비게이션 버튼
  const DrawerNavButton = (text: string, to: string) => {
    return (
      <ListItemButton
        onClick={() => handleDrawerNavButtonClick(to)}
        sx={{
          backgroundColor: location.pathname === to ? "white" : "transparent",
          color:
            location.pathname === to ? theme.palette.primary.main : "white",
        }}
      >
        <ListItemText
          primary={text}
          slotProps={{ primary: { fontWeight: "bold" } }}
        />
      </ListItemButton>
    );
  };

  // 내 계정 드롭다운 메뉴
  const anchorAccountMenuElem = useRef<HTMLButtonElement>(null); // 내 계정 메뉴 버튼 엘리먼트
  const [accountMenuOpen, setAccountMenuOpen] = useState(false); // 내 계정 메뉴 열림 상태
  const loginState = useAtomValue(loginStateAtom); // 로그인 상태

  // 드로어 메뉴
  const anchorDrawerElem = useRef<HTMLButtonElement>(null); // 드로어 메뉴 버튼 엘리먼트
  const [drawerOpen, setDrawerOpen] = useState(false); // 드로어 메뉴 열림 상태

  // 내 계정 버튼 클릭
  const handleAccountButtonClick = useCallback(() => {
    if (!loginState) {
      navigate("/login");
      return;
    }
    setAccountMenuOpen(true);
  }, [loginState, navigate]);

  // 내 계정 메뉴 닫기
  const handleAccountMenuClose = useCallback(() => {
    setAccountMenuOpen(false);
  }, []);

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

  // 드로어 메뉴 네비게이션 버튼 클릭
  const handleDrawerNavButtonClick = useCallback(
    (to: string) => {
      handleDrawerClose();
      navigate(to);
    },
    [handleDrawerClose, navigate]
  );

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
              variant="h4"
              fontWeight="bold"
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
              {NavLinkButton("예약하기", "/reservation")}
              {NavLinkButton("팹랩소개", "/about")}
              {NavLinkButton("공지사항", "/notice")}
            </Stack>

            {/* 내 계정 버튼 */}
            <Stack justifyContent="center">
              <Tooltip title={loginState ? "내 계정" : "로그인"}>
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
        <MenuItem onClick={handleAccountMenuClose} sx={MenuItemCss}>
          <ListItemIcon>
            <PersonRoundedIcon />
          </ListItemIcon>
          <ListItemText>내 정보</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleAccountMenuClose} sx={MenuItemCss}>
          <ListItemIcon>
            <CalendarMonthRoundedIcon />
          </ListItemIcon>
          <ListItemText>내 예약정보</ListItemText>
        </MenuItem>
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
        <MenuItem onClick={handleAccountMenuClose} sx={MenuItemCss}>
          <ListItemIcon>
            <HelpOutlineRoundedIcon />
          </ListItemIcon>
          <ListItemText>도움말</ListItemText>
        </MenuItem>
      </Menu>

      {/* 드로어 메뉴 */}
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <Stack
          width={250}
          height="100%"
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {/* 상단 버튼 */}
          <Stack
            direction="row"
            padding={1}
            justifyContent="flex-end"
            boxShadow={2}
          >
            <IconButton onClick={handleDrawerClose} sx={{ p: 0 }}>
              <CloseRoundedIcon
                sx={{
                  fontSize: "2em",
                  color: "white",
                }}
              />
            </IconButton>
          </Stack>

          {/* 네비게이션 메뉴 */}
          <List
            disablePadding
            sx={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {DrawerNavButton("예약하기", "/reservation")}
            {DrawerNavButton("팹랩소개", "/about")}
            {DrawerNavButton("공지사항", "/notice")}
          </List>
        </Stack>
      </SwipeableDrawer>
    </ThemeProvider>
  );
};

export default Header;
