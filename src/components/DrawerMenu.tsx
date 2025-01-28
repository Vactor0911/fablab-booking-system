import {
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { theme } from "../utils";
import { loginStateAtom, Permission } from "../states";
import { useAtomValue } from "jotai";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

interface DrawerMenuProps {
  drawerOpen: boolean;
  drawerClose: () => void;
}

const DrawerMenu = (props: DrawerMenuProps) => {
  const { drawerOpen, drawerClose } = props;
  const navigate = useNavigate();
  const loginState = useAtomValue(loginStateAtom);

  // 드로어 메뉴 닫기
  const handleDrawerClose = useCallback(() => {
    drawerClose();
    setManageMenuOpen(false);
  }, [drawerClose]);

  // 드로어 메뉴 네비게이션 버튼 클릭
  const handleDrawerNavButtonClick = useCallback(
    (to: string) => {
      handleDrawerClose();
      navigate(to);
    },
    [handleDrawerClose, navigate]
  );

  // 관리 메뉴
  const [manageMenuOpen, setManageMenuOpen] = useState(false);

  // 관리 메뉴 버튼 클릭
  const handleManageMenuButtonClick = useCallback(() => {
    setManageMenuOpen(!manageMenuOpen);
  }, [manageMenuOpen]);

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

  return (
    <ThemeProvider theme={theme}>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
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
                  fontSize: "1.5em",
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
            {loginState.permission === Permission.USER &&
              DrawerNavButton("예약하기", "/reservation")}

            {/* 관리자용 메뉴 */}
            {loginState.permission !== Permission.USER && (
              <>
                <ListItemButton
                  onClick={handleManageMenuButtonClick}
                  sx={{
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                >
                  <ListItemText
                    primary="관리메뉴"
                    slotProps={{ primary: { fontWeight: "bold" } }}
                  />
                  {manageMenuOpen ? (
                    <ExpandLessRoundedIcon />
                  ) : (
                    <ExpandMoreRoundedIcon />
                  )}
                </ListItemButton>
                <Collapse in={manageMenuOpen}>
                  <List
                    disablePadding
                    sx={{
                      "& .MuiListItemButton-root": {
                        paddingLeft: "30px",
                      },
                    }}
                  >
                    {DrawerNavButton("기본 설정", "/settings")}
                    {DrawerNavButton("예약 제한 관리", "/book-restrictions")}
                    {DrawerNavButton("사용자 관리", "/uers")}
                    {DrawerNavButton("로그 관리", "/logs")}
                  </List>
                </Collapse>
              </>
            )}
            {DrawerNavButton("팹랩소개", "/about")}
            {DrawerNavButton("공지사항", "/notice")}
          </List>
        </Stack>
      </Drawer>
    </ThemeProvider>
  );
};

export default DrawerMenu;
