import {
  Box,
  Button,
  Divider,
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
import FixedTableCell from "../components/FixedTableCell";

const Users = () => {
  // 검색 필터
  const [search, setSearch] = useState("");

  // 페이지
  const [page, setPage] = useState(1);
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  // 유저 관리 대화상자 열림 상태
  const [isUserManageDialogOpen, setIsUserManageDialogOpen] = useState(false);

  // 관리 버튼 클릭
  const handleManageButtonClick = useCallback(() => {
    setIsUserManageDialogOpen(true);
  }, []);

  const data = [
    {
      student_id: 2051001,
      name: "홍길동",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-10-10",
    },
    {
      student_id: 2051002,
      name: "김철수",
      permission: "관리자",
      state: "비활성화",
      recentReservation: "2021-09-15",
    },
    {
      student_id: 2051003,
      name: "이영희",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-08-20",
    },
    {
      student_id: 2051004,
      name: "박민수",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-07-25",
    },
    {
      student_id: 2051005,
      name: "최지우",
      permission: "관리자",
      state: "비활성화",
      recentReservation: "2021-06-30",
    },
    {
      student_id: 2051006,
      name: "정수현",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-05-10",
    },
    {
      student_id: 2051007,
      name: "한지민",
      permission: "사용자",
      state: "비활성화",
      recentReservation: "2021-04-15",
    },
    {
      student_id: 2051008,
      name: "송중기",
      permission: "관리자",
      state: "활성화",
      recentReservation: "2021-03-20",
    },
    {
      student_id: 2051009,
      name: "유재석",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2021-02-25",
    },
    {
      student_id: 2051010,
      name: "강호동",
      permission: "사용자",
      state: "비활성화",
      recentReservation: "2021-01-30",
    },
    {
      student_id: 2051011,
      name: "이효리",
      permission: "관리자",
      state: "활성화",
      recentReservation: "2020-12-15",
    },
    {
      student_id: 2051012,
      name: "김혜수",
      permission: "사용자",
      state: "활성화",
      recentReservation: "2020-11-20",
    },
    {
      student_id: 2051013,
      name: "조인성",
      permission: "사용자",
      state: "비활성화",
      recentReservation: "2020-10-25",
    },
    {
      student_id: 2051014,
      name: "전지현",
      permission: "관리자",
      state: "활성화",
      recentReservation: "2020-09-30",
    },
    {
      student_id: 2051015,
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
                      <TableCell width="15%">상태</TableCell>
                      <TableCell width="20%">최근 예약 일자</TableCell>
                      <TableCell width="8%"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .filter(
                        (row) =>
                          row.name.includes(search) ||
                          row.student_id.toString().includes(search)
                      )
                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
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
                          <FixedTableCell keepline>
                            {(page - 1) * 10 + index + 1}
                          </FixedTableCell>
                          <FixedTableCell>{row.student_id}</FixedTableCell>
                          <FixedTableCell>{row.name}</FixedTableCell>
                          <FixedTableCell>{row.permission}</FixedTableCell>
                          <FixedTableCell>{row.state}</FixedTableCell>
                          <FixedTableCell>
                            {row.recentReservation}
                          </FixedTableCell>
                          <TableCell>
                            <Box justifyContent="flex-end" display="flex">
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
                                    xs: "inline-flex",
                                    md: "none",
                                  },
                                }}
                              >
                                <SettingsRoundedIcon />
                              </IconButton>
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
