import { color } from "../utils/theme";
import { Link, useLocation, useNavigate } from "react-router";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { isDarkModeAtom } from "../states";
import { useAtom } from "jotai";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkMode";
import LightModeRoundedIcon from "@mui/icons-material/LightMode";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const NavLinkCss = {
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.2em",
};

const Header = () => {
  // 계정 드롭다운 메뉴
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleAccountClick = () => {
    setAccountMenuOpen(true);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuOpen(false);
  };

  const anchorAccountMenuElem = useRef<HTMLButtonElement>(null);

  const accountMenuStyle = {
    fontWeight: "bold",
    color: "#666",
    "&:hover": {
      backgroundColor: color.primary,
      color: "white",
    },
    "&:active": {
      backgroundColor: color.primary,
      color: "white",
    },
  };

  // 다크모드
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

  const handleThemeChangeClick = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.setAttribute(
      "theme",
      !isDarkMode ? "dark" : "light"
    );
  };

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header
        css={{
          width: "100%",
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          backgroundColor:
            location.pathname === "/" ? "transparent" : color.primary,
          position: location.pathname === "/" ? "absolute" : "relative",
          zIndex: 100,
          "@media (max-width: 480px)": {
            height: "60px",
            backgroundColor: "transparent",
            position: "relative",
          },
        }}
      >
        <Link
          to="/"
          css={{
            textDecoration: "none",
            color: "white",
            "@media (max-width: 480px)": {
              color: "black",
            },
          }}
        >
          <h1>FabLab</h1>
        </Link>

        {/* 네비게이션 바 */}
        <nav
          css={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            "@media (max-width: 480px)": {
              gap: "5px",
            },
          }}
        >
          <ul
            css={{
              display: "flex",
              gap: "30px",
              listStyle: "none",
              color: "white",
              fontWeight: "bold",
              ".pc-item": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              ".mobile-item": {
                display: "none",
              },
              "@media (max-width: 520px)": {
                gap: "15px",
              },
              "@media (max-width: 480px)": {
                gap: "5px",
                ".pc-item": {
                  display: "none",
                },
                ".mobile-item": {
                  display: "block",
                },
              },
            }}
          >
            {/* PC, 태블릿용 네비게이션 링크 */}
            <li className="pc-item">
              <Link to="/reservation" css={NavLinkCss}>
                예약하기
              </Link>
            </li>
            <li className="pc-item">
              <Link to="/" css={NavLinkCss}>
                팹랩소개
              </Link>
            </li>
            <li className="pc-item">
              <Link to="/" css={NavLinkCss}>
                공지사항
              </Link>
            </li>
            {/* 모바일용 아이콘 버튼 */}
            <li className="mobile-item">
              <IconButton
                size="small"
                onClick={() => {
                  navigate("/");
                }}
              >
                <HomeRoundedIcon fontSize="large" />
              </IconButton>
            </li>
            {/* 내 계정 버튼 */}
            <li className="btn-account">
              <IconButton
                onClick={handleAccountClick}
                ref={anchorAccountMenuElem}
                size="small"
              >
                <AccountCircleIcon
                  fontSize="large"
                  sx={{
                    "@media (min-width: 480px)": {
                      fontSize: "50px",
                      color: "white",
                    },
                  }}
                />
              </IconButton>
            </li>
          </ul>
        </nav>
      </header>

      {/* 계정 드롭다운 메뉴 */}
      <Menu
        id="account-menu"
        anchorEl={anchorAccountMenuElem.current}
        open={accountMenuOpen}
        onClose={handleAccountMenuClose}
        sx={{
          marginTop: "5px",
        }}
      >
        <MenuItem onClick={handleAccountMenuClose} sx={accountMenuStyle}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <PersonRoundedIcon />
          </ListItemIcon>
          <ListItemText>내 정보</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleAccountMenuClose} sx={accountMenuStyle}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <CalendarMonthRoundedIcon />
          </ListItemIcon>
          <ListItemText>내 예약정보</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleAccountMenuClose}
          sx={{
            ...accountMenuStyle,
            color: "red",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <ExitToAppRoundedIcon />
          </ListItemIcon>
          <ListItemText>퇴실하기</ListItemText>
        </MenuItem>
        {isDarkMode && (
          <MenuItem
            onClick={() => {
              handleAccountMenuClose();
              handleThemeChangeClick();
            }}
            sx={accountMenuStyle}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
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
            sx={accountMenuStyle}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <DarkModeRoundedIcon />
            </ListItemIcon>
            <ListItemText>다크모드</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={handleAccountMenuClose} sx={accountMenuStyle}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <HelpOutlineRoundedIcon />
          </ListItemIcon>
          <ListItemText>도움말</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
