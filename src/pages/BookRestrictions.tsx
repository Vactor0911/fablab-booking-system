import AdminPage from "../components/AdminPage";
import { theme } from "../utils";
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

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useCallback, useEffect, useMemo, useState } from "react";
import FixedTableCell from "../components/FixedTableCell";
import { useNavigate } from "react-router";
import axiosInstance from "../utils/axiosInstance";
import TokenRefresher from "../components/TokenRefresher";

const BookRestrictions = () => {
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

  // 예약 제한 조회
  interface BookRestriction {
    uuid: string;
    notice: string;
    seatCount: number;
    period: string;
    admin: string;
  }

  const [bookRestrictions, setBookRestrictions] = useState<BookRestriction[]>(
    []
  );
  const [bookRestrictionCount, setBookRestrictionCount] = useState(0);

  const fetchBookRestrictions = useCallback(
    async (page: number, search: string) => {
      try {
        const csrfResponse = await axiosInstance.get("/csrf-token");
        const csrfToken = csrfResponse.data.csrfToken;

        const response = await axiosInstance.get("/admin/book/restriction", {
          headers: {
            "X-CSRF-Token": csrfToken, // CSRF 토큰 헤더 추가
          },
          params: {
            page: page,
            search: search,
          },
        });

        const newBookRestrictions = response.data.restrictions.map(
          (bookRestriction: {
            restriction_uuid: string;
            notice_title: string;
            seat_names: Array<string>;
            restriction_start_date: string;
            restriction_end_date: string;
            admin_id: string;
            admin_name: string;
          }) => ({
            uuid: bookRestriction.restriction_uuid,
            notice:
              bookRestriction.notice_title ??
              "관리자 설정으로 좌석 예약이 제한되고 있습니다.",
            seatCount: bookRestriction.seat_names.length,
            period: `${bookRestriction.restriction_start_date} ~ ${bookRestriction.restriction_end_date}`,
            admin: `${bookRestriction.admin_id} ${bookRestriction.admin_name}`,
          })
        );
        setBookRestrictions(newBookRestrictions);
        setBookRestrictionCount(response.data.totalRestrictions);
        setTotalPages(Math.ceil(response.data.totalRestrictions / 10));
      } catch (err) {
        console.error("예약 제한 데이터를 가져오는 중 오류 발생:", err);
      }
    },
    []
  );

  // 예약 제한 조회 API 호출 디바운싱
  const debouncedFetchBookRestrictions = useMemo(
    () => debounce(() => fetchBookRestrictions(page, search), 300),
    [fetchBookRestrictions, page, search]
  );

  // 예약 제한 조회 API 호출
  useEffect(() => {
    debouncedFetchBookRestrictions();
  }, [search, page, debouncedFetchBookRestrictions]);

  // 예약 제한 목록 클릭
  const navigate = useNavigate();
  const handleBookRestrictionClick = useCallback(
    (uuid: string) => {
      navigate(`/book-restrictions/${uuid}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate]
  );

  // 예약 제한 등록 버튼 클릭
  const handleNewBookRestrictionClick = useCallback(() => {
    navigate("/book-restrictions/new");
  }, [navigate]);

  return (
    <TokenRefresher>
      <AdminPage>
        <Stack className="page-root">
          <Stack className="base-layout" gap={2}>
            {/* 페이지명 */}
            <Typography variant="h2">예약 제한 관리</Typography>

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
                    <TableCell width="30%">공지사항 배너</TableCell>
                    <TableCell width="10%">제한 좌석수</TableCell>
                    <TableCell width="35%">제한 기간</TableCell>
                    <TableCell width="15%">관리자</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookRestrictions
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        onClick={() => handleBookRestrictionClick(row.uuid)}
                        sx={{
                          cursor: "pointer",
                          "&:hover td": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                          },
                        }}
                      >
                        <FixedTableCell keepline>
                          {bookRestrictionCount - (page - 1) * 10 - index}
                        </FixedTableCell>
                        <FixedTableCell keepline>{row.notice}</FixedTableCell>
                        <FixedTableCell>{row.seatCount}</FixedTableCell>
                        <FixedTableCell>{row.period}</FixedTableCell>
                        <FixedTableCell>{row.admin}</FixedTableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>

            {/* 예약 제한 추가 */}
            <Box alignSelf="flex-end" marginTop={4}>
              <Button
                variant="outlined"
                onClick={handleNewBookRestrictionClick}
              >
                <Typography variant="h2">예약 제한 등록</Typography>
              </Button>
            </Box>
          </Stack>
        </Stack>
      </AdminPage>
    </TokenRefresher>
  );
};

export default BookRestrictions;
