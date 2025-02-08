import {
  Box,
  Button,
  debounce,
  Divider,
  InputAdornment,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AdminPage from "../components/AdminPage";
import { useCallback, useEffect, useMemo, useState } from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import UserDialog from "../components/UserDialog";
import FixedTableCell from "../components/FixedTableCell";
import axiosInstance from "../utils/axiosInstance";
import TokenRefresher from "../components/TokenRefresher";

export interface User {
  id: number;
  studentId: string;
  name: string;
  email: string;
  permission: string;
  recentReservation: string;
  state: string;
}

const Users = () => {
  // 검색 필터
  const [search, setSearch] = useState("");

  // 페이지
  const [page, setPage] = useState(1);
  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  // 사용자 목록 불러오기
  const [users, setUsers] = useState<User[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  const fetchUsers = useCallback(async (page: number, search: string) => {
    try {
      const csrfTokenResponse = await axiosInstance.get("/csrf-token");
      const csrfToken = csrfTokenResponse.data.csrfToken;

      const response = await axiosInstance.get("/admin/users", {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        params: {
          page: page,
          search: search,
        },
      });

      const newUsers = response.data.users.map(
        (user: {
          user_id: number;
          id: string;
          name: string;
          email: string;
          permission: string;
          state: string;
          last_reservation: string;
        }) => {
          let userPermission = "사용자";
          if (user.permission === "admin") {
            userPermission = "관리자";
          } else if (user.permission === "superadmin") {
            userPermission = "최고 관리자";
          }

          const userState = user.state === "active" ? "활성" : "비활성";
          return {
            id: user.user_id,
            studentId: user.id,
            name: user.name,
            email: user.email,
            permission: userPermission,
            state: userState,
            recentReservation: user.last_reservation,
          };
        }
      );

      setUsers(newUsers || []);
      setUserCount(response.data.usersCount);
      setTotalUsers(response.data.totalUsers);
      setTotalAdmins(response.data.totalAdmins);
    } catch (err) {
      console.error("사용자 데이터를 가져오는 중 오류 발생:", err);
    }
  }, []);

  const debouncedFetchUsers = useMemo(
    () => debounce(fetchUsers, 300),
    [fetchUsers]
  );

  useEffect(() => {
    debouncedFetchUsers(page, search);
  }, [debouncedFetchUsers, fetchUsers, page, search]);

  // 유저 관리 대화상자 열림 상태
  const [isUserManageDialogOpen, setIsUserManageDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 관리 버튼 클릭
  const handleManageButtonClick = useCallback((user: User) => {
    setSelectedUser(user);
    setIsUserManageDialogOpen(true);
  }, []);

  // 유저 관리 대화상자 닫기
  const handleUserDialogClose = useCallback(() => {
    setIsUserManageDialogOpen(false);
    setSelectedUser(null);
    fetchUsers(page, search);
  }, [fetchUsers, page, search]);

  return (
    <TokenRefresher>
      <AdminPage>
        <Stack className="page-root">
          <Stack className="base-layout" gap={7}>
            <Stack gap={2}>
              {/* 페이지명 */}
              <Typography variant="h2">사용자 관리</Typography>

              <Divider
                sx={{
                  borderWidth: "1px",
                }}
              />
            </Stack>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              gap={3}
              justifyContent="space-between"
            >
              {/* 사용자 수 */}
              <Stack direction="row" gap={3}>
                {/* 총 사용자 */}
                <Stack gap={1}>
                  <Typography variant="h3">총 사용자</Typography>
                  <Typography variant="h2">{totalUsers}</Typography>
                </Stack>
                {/* 총 관리자 */}
                <Stack gap={1}>
                  <Typography variant="h3">총 관리자</Typography>
                  <Typography variant="h2">{totalAdmins}</Typography>
                </Stack>
              </Stack>

              {/* 검색 필터 */}
              <TextField
                variant="outlined"
                placeholder="학번 / 이름 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>

            <Stack justifyContent="flex-end">
              {/* 페이지 선택 */}
              <Pagination
                count={Math.ceil(userCount / 10)}
                page={page}
                onChange={handlePageChange}
                siblingCount={1}
                boundaryCount={0}
                showFirstButton
                showLastButton
                sx={{
                  alignSelf: "flex-end",
                }}
              />

              {/* 사용자 목록 */}
              <Box sx={{ overflowX: "auto" }}>
                <Table
                  sx={{
                    tableLayout: "fixed",
                    minWidth: "600px",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell width="10%">번호</TableCell>
                      <TableCell width="20%">학번</TableCell>
                      <TableCell width="15%">이름</TableCell>
                      <TableCell width="12%">권한</TableCell>
                      <TableCell width="10%">상태</TableCell>
                      <TableCell width="20%">최근 예약 일자</TableCell>
                      <TableCell width="13%"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          position: "relative",
                          "& .MuiTableCell-root": {
                            padding: "8px 16px",
                          },
                        }}
                      >
                        <FixedTableCell keepline>
                          {userCount - (page - 1) * 10 - index}
                        </FixedTableCell>
                        <FixedTableCell>{user.studentId}</FixedTableCell>
                        <FixedTableCell>{user.name}</FixedTableCell>
                        <FixedTableCell>{user.permission}</FixedTableCell>
                        <FixedTableCell>{user.state}</FixedTableCell>
                        <FixedTableCell>
                          {user.recentReservation}
                        </FixedTableCell>
                        <TableCell>
                          <Box justifyContent="flex-end" display="flex">
                            <Button
                              variant="contained"
                              startIcon={<SettingsRoundedIcon />}
                              onClick={() => handleManageButtonClick(user)}
                            >
                              관리
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        {/* 유저 관리 대화상자 */}
        <UserDialog
          open={isUserManageDialogOpen && !!selectedUser}
          onClose={handleUserDialogClose}
          user={selectedUser}
        />
      </AdminPage>
    </TokenRefresher>
  );
};

export default Users;
