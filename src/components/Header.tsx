import { color } from "../utils/theme";
import Logo from "../assets/logo.png";
import { Link } from "react-router";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { isDarkModeAtom } from "../states";
import { useAtom } from "jotai";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeRoundedIcon from "@mui/icons-material/DarkMode";
import LightModeRoundedIcon from "@mui/icons-material/LightMode";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

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

  const anchorAccountMenuElem = useRef<HTMLDivElement>(null);

  const accountMenuStyle = {
    fontWeight: "bold",
    color: "#666",
    "&:hover": {
      backgroundColor: color.primary,
      color: "white",
    },
  };

  // 다크모드
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

  const handleThemeChangeClick = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <>
      <header
        css={{
          height: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          backgroundColor: color.primary,
        }}
      >
        <Link
          to="/"
          css={{
            textDecoration: "none",
          }}
        >
          <div
            className="logo-container"
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              gap: "10px",
            }}
          >
            <img
              src={Logo}
              alt="logo"
              css={{
                filter: "brightness(10)",
                height: "50px",
              }}
            />
            <h1>FabLab</h1>
          </div>
        </Link>

        <nav css={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <ul
            css={{
              display: "flex",
              gap: "30px",
              listStyle: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <li>
              <Link to="/" css={NavLinkCss}>
                예약하기
              </Link>
            </li>
            <li>
              <Link to="/" css={NavLinkCss}>
                팹랩소개
              </Link>
            </li>
            <li>
              <Link to="/" css={NavLinkCss}>
                공지사항
              </Link>
            </li>
            <li>
              <Link to="/" css={NavLinkCss}>
                내 예약정보
              </Link>
            </li>
          </ul>
          <div
            className="account"
            css={{
              width: "50px",
              height: "50px",
              border: "1px solid black",
              borderRadius: "50%",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={handleAccountClick}
            ref={anchorAccountMenuElem}
          ></div>
        </nav>
      </header>

      {/* 계정 드롭다운 메뉴 */}
      <Menu
        id="basic-menu"
        anchorEl={anchorAccountMenuElem.current}
        open={accountMenuOpen}
        onClose={handleAccountMenuClose}
        sx={{
          marginTop: "5px",
        }}
      >
        <MenuItem onClick={handleAccountMenuClose} sx={accountMenuStyle}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>내 정보</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleAccountMenuClose} sx={accountMenuStyle}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <CalendarMonthRoundedIcon />
          </ListItemIcon>
          <ListItemText>내 예약정보</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleAccountMenuClose} sx={{
          ...accountMenuStyle,
          color: "red",
        }}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <LogoutRoundedIcon />
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
