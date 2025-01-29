import { ThemeProvider } from "@emotion/react";
import AdminPage from "../components/AdminPage";
import { theme } from "../utils";
import {
  Box,
  Button,
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

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useCallback, useState } from "react";
import FixedTableCell from "../components/FixedTableCell";
import { useNavigate } from "react-router";

const BookRestrictions = () => {
  // 페이지
  const [page, setPage] = useState(1);
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  // 예약 제한 목록 클릭
  const navigate = useNavigate();
  const handleBookRestrictionClick = useCallback(
    (id: number) => {
      navigate(`/book-restrictions/${id}`);
    },
    [navigate]
  );

  const data = [
    {
      id: 1,
      notice: "공지사항1",
      seatCount: 10,
      period: "2021-10-20 ~ 2021-10-30",
      admin: "김철수",
    },
    {
      id: 2,
      notice: "공지사항2",
      seatCount: 15,
      period: "2021-11-01 ~ 2021-11-10",
      admin: "이영희",
    },
    {
      id: 3,
      notice: "공지사항3",
      seatCount: 8,
      period: "2021-11-11 ~ 2021-11-20",
      admin: "박민수",
    },
    {
      id: 4,
      notice: "공지사항4",
      seatCount: 12,
      period: "2021-11-21 ~ 2021-11-30",
      admin: "최지우",
    },
    {
      id: 5,
      notice: "공지사항5",
      seatCount: 20,
      period: "2021-12-01 ~ 2021-12-10",
      admin: "김철수",
    },
    {
      id: 6,
      notice: "공지사항6",
      seatCount: 18,
      period: "2021-12-11 ~ 2021-12-20",
      admin: "이영희",
    },
    {
      id: 7,
      notice: "공지사항7",
      seatCount: 10,
      period: "2021-12-21 ~ 2021-12-30",
      admin: "박민수",
    },
    {
      id: 8,
      notice: "공지사항8",
      seatCount: 14,
      period: "2022-01-01 ~ 2022-01-10",
      admin: "최지우",
    },
    {
      id: 9,
      notice: "공지사항9",
      seatCount: 16,
      period: "2022-01-11 ~ 2022-01-20",
      admin: "김철수",
    },
    {
      id: 10,
      notice: "공지사항10",
      seatCount: 12,
      period: "2022-01-21 ~ 2022-01-30",
      admin: "이영희",
    },
    {
      id: 11,
      notice: "공지사항11",
      seatCount: 9,
      period: "2022-02-01 ~ 2022-02-10",
      admin: "박민수",
    },
    {
      id: 12,
      notice: "공지사항12",
      seatCount: 11,
      period: "2022-02-11 ~ 2022-02-20",
      admin: "최지우",
    },
    {
      id: 13,
      notice: "공지사항13",
      seatCount: 13,
      period: "2022-02-21 ~ 2022-02-28",
      admin: "김철수",
    },
    {
      id: 14,
      notice: "공지사항14",
      seatCount: 17,
      period: "2022-03-01 ~ 2022-03-10",
      admin: "이영희",
    },
    {
      id: 15,
      notice: "공지사항15",
      seatCount: 19,
      period: "2022-03-11 ~ 2022-03-20",
      admin: "박민수",
    },
    {
      id: 16,
      notice: "공지사항16",
      seatCount: 10,
      period: "2022-03-21 ~ 2022-03-30",
      admin: "최지우",
    },
    {
      id: 17,
      notice: "공지사항17",
      seatCount: 15,
      period: "2022-04-01 ~ 2022-04-10",
      admin: "김철수",
    },
    {
      id: 18,
      notice: "공지사항18",
      seatCount: 20,
      period: "2022-04-11 ~ 2022-04-20",
      admin: "이영희",
    },
    {
      id: 19,
      notice: "공지사항19",
      seatCount: 18,
      period: "2022-04-21 ~ 2022-04-30",
      admin: "박민수",
    },
    {
      id: 20,
      notice: "공지사항20",
      seatCount: 12,
      period: "2022-05-01 ~ 2022-05-10",
      admin: "최지우",
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

            {/* 검색어 입력란 */}
            <Box alignSelf="flex-end">
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
            <Table
              sx={{
                tableLayout: "fixed",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell width="10%">번호</TableCell>
                  <TableCell width="30%">공지사항 배너</TableCell>
                  <TableCell width="10%">제한 좌석수</TableCell>
                  <TableCell width="35%">제한 기간</TableCell>
                  <TableCell width="15%">관리자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleBookRestrictionClick(row.id)}
                      sx={{
                        cursor: "pointer",
                        "&:hover td": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        },
                      }}
                    >
                      <FixedTableCell keepline>
                        {(page - 1) * 10 + index + 1}
                      </FixedTableCell>
                      <FixedTableCell keepline>{row.notice}</FixedTableCell>
                      <FixedTableCell>{row.seatCount}</FixedTableCell>
                      <FixedTableCell>{row.period}</FixedTableCell>
                      <FixedTableCell>{row.admin}</FixedTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {/* 예약 제한 추가 */}
            <Box alignSelf="flex-end" marginTop={4}>
              <Button variant="outlined">
                <Typography variant="h2">예약 제한 등록</Typography>
              </Button>
            </Box>
          </Stack>
        </Stack>
      </ThemeProvider>
    </AdminPage>
  );
};

export default BookRestrictions;
