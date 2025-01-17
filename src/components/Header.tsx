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
import { isDarkModeAtom, loginStateAtom } from "../states";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkMode";
import LightModeRoundedIcon from "@mui/icons-material/LightMode";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

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

  // 내 계정 드롭다운 메뉴
  const anchorAccountMenuElem = useRef<HTMLButtonElement>(null); // 내 계정 메뉴 버튼 엘리먼트
  const [accountMenuOpen, setAccountMenuOpen] = useState(false); // 내 계정 메뉴 열림 상태
  const loginState = useAtomValue(loginStateAtom); // 로그인 상태

  // 내 계정 버튼 클릭
  const handleAccountClick = useCallback(() => {
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
          [theme.breakpoints.only("xs")]: {
            backgroundColor: "transparent",
            position: "relative",
          },
        }}
      >
        <Toolbar
          sx={{
            height: "80px",
            [theme.breakpoints.only("xs")]: {
              height: "60px",
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
                [theme.breakpoints.only("xs")]: { color: "black" },
              }}
            >
              FabLab
            </Typography>
          </Link>

          {/* 네비게이션 바 */}
          <Stack
            direction="row"
            gap={{
              xs: 0,
              sm: 2,
            }}
          >
            {/* PC, 태블릿용 네비게이션 바 */}
            <Stack direction="row" gap={2} display={{ xs: "none", sm: "flex" }}>
              {NavLinkButton("예약하기", "/reservation")}
              {NavLinkButton("팹랩소개", "/about")}
              {NavLinkButton("공지사항", "/notice")}
            </Stack>

            {/* 모바일용 네비게이션 바 */}
            <Stack display={{ xs: "flex", sm: "none" }}>
              <Tooltip title="메인으로">
                <IconButton onClick={() => navigate("/")}>
                  <HomeRoundedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Stack>

            {/* 내 계정 버튼 */}
            <Stack justifyContent="center">
              <Tooltip title="내 계정">
                <IconButton
                  onClick={handleAccountClick}
                  ref={anchorAccountMenuElem}
                  sx={{ p: 0 }}
                >
                  <AccountCircleRoundedIcon
                    fontSize="large"
                    sx={{
                      [theme.breakpoints.up("sm")]: {
                        color: "white",
                        fontSize: "2em",
                      },
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
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
    </ThemeProvider>
  );
};

export default Header;
