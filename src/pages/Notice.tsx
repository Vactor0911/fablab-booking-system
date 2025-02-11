import {
  Box,
  Button,
  debounce,
  Divider,
  InputAdornment,
  List,
  Pagination,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  useColorScheme,
} from "@mui/material";
import { theme } from "../utils";
import { useCallback, useEffect, useState, useMemo } from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router";
import FixedTableCell from "../components/FixedTableCell";
import { useAtomValue } from "jotai";
import { loginStateAtom, Permission } from "../states";
import axiosInstance from "../utils/axiosInstance";
import TokenRefresher from "../components/TokenRefresher";

interface Notice {
  notice_uuid: string;
  notice_id: string;
  title: string;
  date: string;
  views: number;
}

const Notice = () => {
  // 탭 메뉴
  const [tabIndex] = useState("all"); // 탭 메뉴 인덱스

  // 페이지 선택
  const [page, setPage] = useState(1); // 페이지
  const [noticeCount, setNoticeCount] = useState(0); // 전체 공지사항 수
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // 공지사항 목록
  const [notices, setNotices] = useState<Notice[]>([]);

  const fetchNotices = useCallback(
    async (searchTitle: string = "") => {
      // 공지사항 목록 불러오기
      try {
        const response = await axiosInstance.get(`/notice/search`, {
          params: {
            query: searchTitle,
            page: page,
          },
        }); // API 호출
        setNotices(response.data.notices || []);
        setNoticeCount(response.data.totalCount);
      } catch (err) {
        console.error("공지사항 데이터를 가져오는 중 오류 발생:", err);
      }
    },
    [page]
  );

  // 제목 검색 필터 변경
  const [searchTitle, setSearchTitle] = useState(""); // 제목 검색 필터

  const debouncedFetchNotices = useMemo(
    () => debounce(fetchNotices, 500),
    [fetchNotices]
  );

  const handleSearchTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTitle = e.target.value;
      setSearchTitle(newSearchTitle);
      debouncedFetchNotices(newSearchTitle);
    },
    [debouncedFetchNotices]
  );

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  // 공지사항 클릭
  const navigate = useNavigate();
  const handleNoticeClick = useCallback(
    (id: string) => {
      navigate(`/notice/${id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate]
  );

  // 글쓰기 버튼 클릭
  const handleNewNoticeClick = useCallback(() => {
    navigate("/notice/new");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  const loginState = useAtomValue(loginStateAtom);

  const { mode } = useColorScheme();

  return (
    <TokenRefresher>
      <Stack className="page-root">
        <Stack className="base-layout" gap={3}>
          {/* 페이지명 */}
          <Typography variant="h2">공지사항</Typography>

          <Box
            sx={{
              boxShadow: `0 -2px 0 0 ${
                mode === "light"
                  ? theme.palette.divider
                  : "rgba(255, 255, 255, 0.5)"
              } inset`,
              position: "relative",
            }}
          >
            {/* 탭 메뉴 */}
            <Tabs value={tabIndex}>
              <Tab
                label="전체"
                value="all"
                sx={{ fontSize: "1.17em", fontWeight: "bold" }}
              />
            </Tabs>

            {/* 제목 검색 */}
            <TextField
              variant="outlined"
              placeholder="제목 검색"
              value={searchTitle}
              onChange={handleSearchTitleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                position: "absolute",
                right: 0,
                bottom: 10,
                width: {
                  xs: "200px",
                  sm: "300px",
                  md: "400px",
                },
              }}
            />
          </Box>

          {/* 페이지 선택 */}
          <Pagination
            count={Math.ceil(noticeCount / 10)}
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

          {/* 공지사항 테이블 */}
          <Table
            sx={{
              tableLayout: "fixed",
              display: {
                xs: "none",
                sm: "table",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell width="10%">번호</TableCell>
                <TableCell width="55%">제목</TableCell>
                <TableCell width="23%">작성일자</TableCell>
                <TableCell width="12%">조회수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notices.map((notice, index) => (
                <TableRow
                  key={`notice${notice.notice_id}`}
                  onClick={() => {
                    handleNoticeClick(notice.notice_uuid);
                  }}
                  sx={{
                    cursor: "pointer",
                    "& td": {
                      padding: {
                        xs: "10px 15px",
                        sm: "15px",
                      },
                      backgroundColor:
                        notice.notice_id === notices[0].notice_id
                          ? theme.palette.primary.main
                          : "none",
                      color:
                        notice.notice_id === notices[0].notice_id
                          ? "white"
                          : "inherit",
                    },
                    "&:hover td": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                >
                  <FixedTableCell keepline>
                    {noticeCount - (page - 1) * 10 - index}
                  </FixedTableCell>
                  <FixedTableCell>{notice.title}</FixedTableCell>
                  <FixedTableCell>{notice.date}</FixedTableCell>
                  <FixedTableCell keepline>{notice.views}</FixedTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* 모바일용 공지사항 목록 */}
          <List
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}
          >
            {notices.map((notice) => (
              <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
                key={`notice${notice.notice_id}`}
                sx={{
                  cursor: "pointer",
                  padding: "10px",
                  backgroundColor:
                    notice.notice_id === notices[0].notice_id
                      ? theme.palette.primary.main
                      : "none",
                  color:
                    notice.notice_id === notices[0].notice_id
                      ? "white"
                      : "inherit",
                  borderBottom: `1px solid #aaa`,
                  "&:nth-of-type(even)": {
                    backgroundColor: mode === "light" ? "#f4f4f4" : "#444",
                    color: "inherit",
                  },
                  "&:nth-of-type(1)": {
                    borderTop: `1px solid #aaa`,
                  },
                }}
              >
                <Typography variant="body2" alignSelf="center">
                  {notice.notice_id}
                </Typography>
                <Stack
                  key={`notice${notice.notice_id}`}
                  onClick={() => {
                    handleNoticeClick(notice.notice_uuid);
                  }}
                  width="90%"
                  gap={1}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {notice.title}
                  </Typography>
                  <Stack direction="row" gap={2}>
                    <Typography variant="body2">{notice.date}</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography variant="body2">{notice.views}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </List>

          {/* 글쓰기 버튼 */}
          <Box
            alignSelf="flex-end"
            display={
              loginState.isLoggedIn && loginState.permission !== Permission.USER
                ? "block"
                : "none"
            }
          >
            <Button variant="outlined" onClick={handleNewNoticeClick}>
              <Typography variant="h2">글쓰기</Typography>
            </Button>
          </Box>
        </Stack>
      </Stack>
    </TokenRefresher>
  );
};

export default Notice;
