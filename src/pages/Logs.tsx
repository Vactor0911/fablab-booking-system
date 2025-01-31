import { ThemeProvider } from "@emotion/react";
import AdminPage from "../components/AdminPage";
import { theme } from "../utils";
import {
  Box,
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
import { useCallback, useState } from "react";
import FixedTableCell from "../components/FixedTableCell";

const Logs = () => {
  // 필터
  const [filter, setFilter] = useState("all");
  const handleFilterChange = useCallback((e: SelectChangeEvent<string>) => {
    setFilter(e.target.value);
  }, []);

  // 페이지
  const [page, setPage] = useState(1);
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const data = [
    {
      id: 1,
      type: "예약",
      user: "2051001/홍길동",
      admin: "2051000/김철수",
      seat: "A01",
      date: "2021-10-20",
      note: "비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고비고",
    },
    {
      id: 2,
      type: "퇴실",
      user: "2051002/이순신",
      admin: "2051000/김철수",
      seat: "A02",
      date: "2021-10-21",
      note: "비고",
    },
    {
      id: 3,
      type: "강제 퇴실",
      user: "2051003/박문수",
      admin: "2051000/김철수",
      seat: "A03",
      date: "2021-10-22",
      note: "비고",
    },
    {
      id: 4,
      type: "공지사항",
      user: "2051004/정약용",
      admin: "2051000/김철수",
      seat: "A04",
      date: "2021-10-23",
      note: "비고",
    },
    {
      id: 5,
      type: "예약 제한",
      user: "2051005/김유신",
      admin: "2051000/김철수",
      seat: "A05",
      date: "2021-10-24",
      note: "비고",
    },
    {
      id: 6,
      type: "예약",
      user: "2051006/유관순",
      admin: "2051000/김철수",
      seat: "A06",
      date: "2021-10-25",
      note: "비고",
    },
    {
      id: 7,
      type: "퇴실",
      user: "2051007/안중근",
      admin: "2051000/김철수",
      seat: "A07",
      date: "2021-10-26",
      note: "비고",
    },
    {
      id: 8,
      type: "강제 퇴실",
      user: "2051008/윤봉길",
      admin: "2051000/김철수",
      seat: "A08",
      date: "2021-10-27",
      note: "비고",
    },
    {
      id: 9,
      type: "공지사항",
      user: "2051009/김구",
      admin: "2051000/김철수",
      seat: "A09",
      date: "2021-10-28",
      note: "비고",
    },
    {
      id: 10,
      type: "예약 제한",
      user: "2051010/신사임당",
      admin: "2051000/김철수",
      seat: "A10",
      date: "2021-10-29",
      note: "비고",
    },
    {
      id: 11,
      type: "예약",
      user: "2051011/세종대왕",
      admin: "2051000/김철수",
      seat: "A11",
      date: "2021-10-30",
      note: "비고",
    },
    {
      id: 12,
      type: "퇴실",
      user: "2051012/장영실",
      admin: "2051000/김철수",
      seat: "A12",
      date: "2021-10-31",
      note: "비고",
    },
    {
      id: 13,
      type: "강제 퇴실",
      user: "2051013/이황",
      admin: "2051000/김철수",
      seat: "A13",
      date: "2021-11-01",
      note: "비고",
    },
    {
      id: 14,
      type: "공지사항",
      user: "2051014/이이",
      admin: "2051000/김철수",
      seat: "A14",
      date: "2021-11-02",
      note: "비고",
    },
    {
      id: 15,
      type: "예약 제한",
      user: "2051015/허준",
      admin: "2051000/김철수",
      seat: "A15",
      date: "2021-11-03",
      note: "비고",
    },
    {
      id: 16,
      type: "예약",
      user: "2051016/신채호",
      admin: "2051000/김철수",
      seat: "A16",
      date: "2021-11-04",
      note: "비고",
    },
    {
      id: 17,
      type: "퇴실",
      user: "2051017/안창호",
      admin: "2051000/김철수",
      seat: "A17",
      date: "2021-11-05",
      note: "비고",
    },
    {
      id: 18,
      type: "강제 퇴실",
      user: "2051018/김좌진",
      admin: "2051000/김철수",
      seat: "A18",
      date: "2021-11-06",
      note: "비고",
    },
    {
      id: 19,
      type: "공지사항",
      user: "2051019 유성룡",
      admin: "2051000/김철수",
      seat: "A19",
      date: "2021-11-07",
      note: "비고",
    },
    {
      id: 20,
      type: "예약 제한",
      user: "2051020/이순신",
      admin: "2051000/김철수",
      seat: "A20",
      date: "2021-11-08",
      note: "비고",
    },
  ];

  return (
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
                <Select value={filter} onChange={handleFilterChange} fullWidth>
                  <MenuItem value="all">전체</MenuItem>
                  <MenuItem value="reservation">예약</MenuItem>
                  <MenuItem value="leave">퇴실</MenuItem>
                  <MenuItem value="force-leave">강제 퇴실</MenuItem>
                  <MenuItem value="notice">공지사항</MenuItem>
                  <MenuItem value="restriction">예약 제한</MenuItem>
                </Select>
              </Box>

              {/* 검색어 입력란 */}
              <Box>
                <TextField
                  variant="outlined"
                  placeholder="학번 / 이름 검색"
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
                    <TableCell width="10%">번호</TableCell>
                    <TableCell width="10%">로그 종류</TableCell>
                    <TableCell width="15%">예약자 정보</TableCell>
                    <TableCell width="15%">관리자 정보</TableCell>
                    <TableCell width="10%">좌석 정보</TableCell>
                    <TableCell width="15%">기록 일자</TableCell>
                    <TableCell width="25%">비고</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <FixedTableCell keepline>
                          {(page - 1) * 10 + index + 1}
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
  );
};

export default Logs;
