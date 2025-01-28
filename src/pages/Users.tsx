import {
  Button,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import AdminPage from "../components/AdminPage";
import { useCallback, useState } from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import UserDialog from "../components/UserDialog";

const Users = () => {
  // 검색 필터
  const [search, setSearch] = useState("");

  // 페이지
  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // 유저 관리 대화상자 열림 상태
  const [isUserManageDialogOpen, setIsUserManageDialogOpen] = useState(false);

  // 관리 버튼 클릭
  const handleManageButtonClick = useCallback(() => {
    setIsUserManageDialogOpen(true);
  }, []);

  const data = [
    {
      id: 2051001,
      name: "홍길동",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-10-10",
    },
    {
      id: 2051002,
      name: "김철수",
      permission: "관리자",
      state: "비활성화",
      recentReservation: "2021-09-15",
    },
    {
      id: 2051003,
      name: "이영희",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-08-20",
    },
    {
      id: 2051004,
      name: "박민수",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-07-25",
    },
    {
      id: 2051005,
      name: "최지우",
      permission: "관리자",
      state: "비활성화",
      recentReservation: "2021-06-30",
    },
    {
      id: 2051006,
      name: "정수현",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-05-10",
    },
    {
      id: 2051007,
      name: "한지민",
      permission: "사용자",
      state: "비활성화",
      recentReservation: "2021-04-15",
    },
    {
      id: 2051008,
      name: "송중기",
      permission: "관리자",
      state: "활성화",
      recentReservation: "2021-03-20",
    },
    {
      id: 2051009,
      name: "유재석",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-02-25",
    },
    {
      id: 2051010,
      name: "강호동",
      permission: "사용자",
      state: "비활성화",
      recentReservation: "2021-01-30",
    },
    {
      id: 2051011,
      name: "이효리",
      permission: "관리자",
      state: "활성화",
      recentReservation: "2020-12-15",
    },
    {
      id: 2051012,
      name: "김혜수",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2020-11-20",
    },
    {
      id: 2051013,
      name: "조인성",
      permission: "사용자",
      state: "비활성화",
      recentReservation: "2020-10-25",
    },
    {
      id: 2051014,
      name: "전지현",
      permission: "관리자",
      state: "활성화",
      recentReservation: "2020-09-30",
    },
    {
      id: 2051015,
      name: "하정우",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2020-08-15",
    },
  ];

  return (
    <AdminPage>
      <ThemeProvider theme={theme}>
        <Stack className="page-root">
          <Stack className="base-layout" gap={7}>
            {/* 페이지명 */}
            <Typography variant="h2">사용자 관리</Typography>

            <Stack direction="row" justifyContent="space-between">
              {/* 사용자 수 */}
              <Stack direction="row" gap={3}>
                {/* 총 사용자 */}
                <Stack gap={1}>
                  <Typography variant="h3">총 사용자</Typography>
                  <Typography variant="h2">235</Typography>
                </Stack>
                {/* 총 관리자 */}
                <Stack gap={1}>
                  <Typography variant="h3">총 관리자</Typography>
                  <Typography variant="h2">5</Typography>
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
                count={10}
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

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="5%">번호</TableCell>
                    <TableCell width="20%">학번</TableCell>
                    <TableCell width="20%">이름</TableCell>
                    <TableCell width="10%">권한</TableCell>
                    <TableCell width="10%">상태</TableCell>
                    <TableCell
                      sx={{
                        width: {
                          xs: "34%",
                          md: "30%",
                        },
                      }}
                    >
                      최근 예약 일자
                    </TableCell>
                    <TableCell
                      sx={{
                        width: {
                          xs: "1%",
                          md: "5%",
                        },
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .filter(
                      (row) =>
                        row.name.includes(search) ||
                        row.id.toString().includes(search)
                    )
                    .slice((page - 1) * 7, (page - 1) * 7 + 7)
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          position: "relative",
                          "& .MuiTableCell-root": {
                            padding: "8px 16px",
                          },
                        }}
                      >
                        <TableCell>{(page - 1) * 7 + index + 1}</TableCell>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.permission}</TableCell>
                        <TableCell>{row.state}</TableCell>
                        <TableCell>{row.recentReservation}</TableCell>
                        <TableCell>
                          {/* PC용 버튼 */}
                          <Button
                            variant="contained"
                            startIcon={<SettingsRoundedIcon />}
                            onClick={handleManageButtonClick}
                            sx={{
                              display: {
                                xs: "none",
                                md: "inline-flex",
                              },
                            }}
                          >
                            관리
                          </Button>

                          {/* 태블릿용 버튼 */}
                          <IconButton
                            onClick={handleManageButtonClick}
                            sx={{
                              padding: 0,
                              display: {
                                xs: "none",
                                sm: "inline-flex",
                                md: "none",
                              },
                            }}
                          >
                            <SettingsRoundedIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </Stack>
      </ThemeProvider>

      {/* 유저 관리 대화상자 */}
      <UserDialog
        open={isUserManageDialogOpen}
        onClose={() => setIsUserManageDialogOpen(false)}
      />
    </AdminPage>
  );
};

export default Users;
