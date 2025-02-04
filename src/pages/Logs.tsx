import { ThemeProvider } from "@emotion/react";
import AdminPage from "../components/AdminPage";
import { theme } from "../utils";
import {
  Box,
  debounce,
  Divider,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useCallback, useEffect, useMemo, useState } from "react";
import FixedTableCell from "../components/FixedTableCell";
import TokenRefresher from "../components/TokenRefresher";
import axiosInstance from "../utils/axiosInstance";

/**
 * 로그의 종류와 액션에 따라 표시되는 타입을 반환한다.
 * @param logType 로그 종류 (book, notice, restriction)
 * @param action 로그 액션 (book: book, end, cancel / notice: create, edit, delete / restriction: create, edit, delete)
 * @returns 로그 타입
 */
const getLogType = (logType: string, action: string) => {
  switch (logType) {
    case "book": // 예약
      switch (action) {
        case "book":
          return "예약";
        case "end":
          return "퇴실";
        case "cancel":
          return "강제 퇴실";
      }
      break;
    case "notice": // 공지사항
      switch (action) {
        case "create":
          return "공지사항 작성";
        case "edit":
          return "공지사항 수정";
        case "delete":
          return "공지사항 삭제";
      }
      break;
    case "restriction": // 예약 제한
      switch (action) {
        case "create":
          return "예약 제한 추가";
        case "edit":
          return "예약 제한 수정";
        case "delete":
          return "예약 제한 삭제";
      }
      break;
  }
};

const Logs = () => {
  // 필터
  const [filter, setFilter] = useState("all");
  const handleFilterChange = useCallback((e: SelectChangeEvent<string>) => {
    setFilter(e.target.value);
    setPage(1);
  }, []);

  // 검색어 필터
  const [search, setSearch] = useState("");
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    []
  );

  // 페이지
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  // 로그 조회
  interface Log {
    type: string;
    user: string;
    admin: string;
    seat: string;
    date: string;
    note: string;
  }

  const [logs, setLogs] = useState<Log[]>([]);
  const [logsCount, setLogsCount] = useState(0);

  const fetchLogs = useCallback(
    async (page: number, filter: string, search: string) => {
      try {
        const csrfTokenResponse = await axiosInstance.get("/csrf-token");
        const csrfToken = csrfTokenResponse.data.csrfToken;

        const response = await axiosInstance.get(`/admin/logs/${filter}`, {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          params: {
            page: page,
            search: search,
          },
        });

        const newLogs = response.data.logs.map(
          (log: {
            log_type: string;
            log_action: string;
            user_id: string;
            user_name: string;
            admin_id: string;
            admin_name: string;
            seat_name: string;
            log_date: string;
            restriction_reason: string;
          }) => ({
            type: getLogType(log.log_type, log.log_action),
            user: log.user_id ? `${log.user_id} ${log.user_name}` : "",
            admin: log.admin_id ? `${log.admin_id} ${log.admin_name}` : "",
            seat: log.seat_name,
            date: log.log_date,
            note: log.restriction_reason,
          })
        );

        setLogs(newLogs);

        const newTotalPages = Math.max(
          1,
          Math.ceil(response.data.totalLogs / 10)
        );
        setLogsCount(response.data.totalLogs);
        setTotalPages(newTotalPages);
        setPage(Math.min(page, newTotalPages));
      } catch (err) {
        console.error("로그 데이터를 가져오는 중 오류 발생:", err);
      }
    },
    []
  );

  // 로그 조회 API 호출 디바운싱
  const debouncedFetchLogs = useMemo(
    () => debounce(() => fetchLogs(page, filter, search), 500),
    [fetchLogs, filter, page, search]
  );

  // 로그 조회 API 호출
  useEffect(() => {
    debouncedFetchLogs();
  }, [debouncedFetchLogs]);

  return (
    <TokenRefresher>
      <AdminPage>
        <ThemeProvider theme={theme}>
          <Stack className="page-root">
            <Stack className="base-layout" gap={2}>
              {/* 페이지명 */}
              <Typography variant="h2">로그 관리</Typography>

              {/* 구분선 */}
              <Divider
                sx={{
                  borderWidth: "1px",
                }}
              />

              <Stack direction="row" gap={1} justifyContent="flex-end">
                {/* 필터 콤보박스 */}
                <Box width="110px">
                  <Select
                    value={filter}
                    onChange={handleFilterChange}
                    fullWidth
                  >
                    <MenuItem value="all">전체</MenuItem>
                    <MenuItem value="book">예약</MenuItem>
                    <MenuItem value="end">퇴실</MenuItem>
                    <MenuItem value="cancel">강제 퇴실</MenuItem>
                    <MenuItem value="notice/all">공지사항</MenuItem>
                    <MenuItem value="book_restriction/all">예약 제한</MenuItem>
                  </Select>
                </Box>

                {/* 검색어 입력란 */}
                <Box>
                  <TextField
                    variant="outlined"
                    placeholder="학번 / 이름 검색"
                    value={search}
                    onChange={handleSearchChange}
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
                </Box>
              </Stack>

              {/* 페이지 선택 */}
              <Pagination
                count={totalPages}
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

              {/* 로그 목록 */}
              <Box
                sx={{
                  overflowX: "auto",
                }}
              >
                <Table
                  sx={{
                    tableLayout: "fixed",
                    minWidth: "600px",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell width="7%">번호</TableCell>
                      <TableCell width="13%">로그 종류</TableCell>
                      <TableCell width="15%">예약자 정보</TableCell>
                      <TableCell width="15%">관리자 정보</TableCell>
                      <TableCell width="10%">좌석 정보</TableCell>
                      <TableCell width="15%">기록 일자</TableCell>
                      <TableCell width="25%">비고</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logs.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: "#f4f4f6",
                          },
                        }}
                      >
                        <FixedTableCell keepline>
                          {logsCount - (page - 1) * 10 - index}
                        </FixedTableCell>
                        <FixedTableCell>{row.type}</FixedTableCell>
                        <FixedTableCell>{row.user}</FixedTableCell>
                        <FixedTableCell>{row.admin}</FixedTableCell>
                        <FixedTableCell>{row.seat}</FixedTableCell>
                        <FixedTableCell>{row.date}</FixedTableCell>
                        <FixedTableCell>{row.note}</FixedTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Stack>
          </Stack>
        </ThemeProvider>
      </AdminPage>
    </TokenRefresher>
  );
};

export default Logs;
