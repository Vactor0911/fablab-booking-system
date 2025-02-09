import {
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
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

  // 드로어 메뉴 네비게이션 버튼 클릭
  const handleDrawerNavButtonClick = useCallback(
    (to: string) => {
      drawerClose();
      navigate(to);
    },
    [drawerClose, navigate]
  );

  // 관리 메뉴
  const [manageMenuOpen, setManageMenuOpen] = useState(false);

  // 관리 메뉴 버튼 클릭
  const handleManageMenuButtonClick = useCallback(() => {
    setManageMenuOpen(!manageMenuOpen);
  }, [manageMenuOpen]);

  // 드로어 네비게이션 버튼
  const DrawerNavButton = ({
    text,
    to,
    onClick,
  }: {
    text: string;
    to: string;
    onClick?: () => void;
  }) => {
    return (
      <ListItemButton
        onClick={() => {
          handleDrawerNavButtonClick(to);
          if (onClick) onClick();
        }}
        sx={{
          backgroundColor: location.pathname === to ? "white" : "inherit",
          color:
            location.pathname === to ? theme.palette.primary.main : "white",
          "&:active, &:hover": {
            backgroundColor: location.pathname === to ? "white" : "inherit",
          },
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
      <Drawer anchor="right" open={drawerOpen} onClose={drawerClose}>
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
            <IconButton onClick={drawerClose} sx={{ p: 0 }}>
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
              marginTop: "2px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {/* 예약하기 */}
            {(!loginState.isLoggedIn ||
              loginState.permission === Permission.USER) && (
              <DrawerNavButton text="예약하기" to="/reservation" />
            )}

            {/* 관리자용 메뉴 */}
            {loginState.isLoggedIn &&
              loginState.permission !== Permission.USER && (
                <>
                  {/* 관리 메뉴 */}
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

                  {/* 접이식 메뉴 */}
                  <Collapse in={manageMenuOpen}>
                    <List
                      disablePadding
                      sx={{
                        backgroundColor: "#49101d",
                        "& .MuiListItemButton-root": {
                          paddingLeft: "30px",
                        },
                      }}
                    >
                      <DrawerNavButton text="기본 설정" to="/settings" />
                      <DrawerNavButton text="예약 조회" to="/reservation" />
                      <DrawerNavButton
                        text="예약 제한 관리"
                        to="/book-restrictions"
                      />
                      <DrawerNavButton text="사용자 관리" to="/users" />
                      <DrawerNavButton text="로그 관리" to="/logs" />
                    </List>
                  </Collapse>
                </>
              )}

            {/* 공통 표시 메뉴 */}
            <DrawerNavButton
              text="팹랩소개"
              to="/about"
              onClick={() => {
                setManageMenuOpen(false);
              }}
            />
            <DrawerNavButton
              text="공지사항"
              to="/notice"
              onClick={() => {
                setManageMenuOpen(false);
              }}
            />
          </List>
        </Stack>
      </Drawer>
  );
};

export default DrawerMenu;
