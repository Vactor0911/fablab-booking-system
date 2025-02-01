import {
  Box,
  Button,
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
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import { useCallback, useState } from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router";
import FixedTableCell from "../components/FixedTableCell";
import { useAtomValue } from "jotai";
import { loginStateAtom, Permission } from "../states";

const Notice = () => {
  // 탭 메뉴
  const [tabIndex, setTabIndex] = useState("all"); // 탭 메뉴 인덱스
  const handleTabIndexChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setTabIndex(newValue);
  };

  // 페이지 선택
  const [page, setPage] = useState(1); // 페이지
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // 공지사항 목록
  const notices = [
    {
      id: 20,
      title: "공지사항20",
      date: "2021-10-20",
      views: 200,
    },
    {
      id: 19,
      title: "공지사항19",
      date: "2021-10-19",
      views: 190,
    },
    {
      id: 18,
      title: "공지사항18",
      date: "2021-10-18",
      views: 180,
    },
    {
      id: 17,
      title: "공지사항17",
      date: "2021-10-17",
      views: 170,
    },
    {
      id: 16,
      title: "공지사항16",
      date: "2021-10-16",
      views: 160,
    },
    {
      id: 15,
      title: "공지사항15",
      date: "2021-10-15",
      views: 150,
    },
    {
      id: 14,
      title: "공지사항14",
      date: "2021-10-14",
      views: 140,
    },
    {
      id: 13,
      title: "공지사항13",
      date: "2021-10-13",
      views: 130,
    },
    {
      id: 12,
      title: "공지사항12",
      date: "2021-10-12",
      views: 120,
    },
    {
      id: 11,
      title: "공지사항11",
      date: "2021-10-11",
      views: 110,
    },
    {
      id: 10,
      title:
        "공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10공지사항10",
      date: "2021-10-10",
      views: 100,
    },
    {
      id: 9,
      title: "공지사항9",
      date: "2021-10-09",
      views: 90,
    },
    {
      id: 8,
      title: "공지사항8",
      date: "2021-10-08",
      views: 80,
    },
    {
      id: 7,
      title: "공지사항7",
      date: "2021-10-07",
      views: 70,
    },
    {
      id: 6,
      title:
        "공지사항6공지사항6공지사항6공지사항6공지사항6공지사항6공지사항6공지사항6공지사항6공지사항6",
      date: "2021-10-06",
      views: 60,
    },
    {
      id: 5,
      title: "공지사항5",
      date: "2021-10-05",
      views: 50,
    },
    {
      id: 4,
      title: "공지사항4",
      date: "2021-10-04",
      views: 40,
    },
    {
      id: 3,
      title: "공지사항3",
      date: "2021-10-03",
      views: 30,
    },
    {
      id: 2,
      title: "공지사항2공지사항2공지사항2공지사항2",
      date: "2021-10-02",
      views: 20,
    },
    {
      id: 1,
      title: "공지사항1",
      date: "2021-10-01",
      views: 10,
    },
  ];

  // 공지사항 클릭
  const navigate = useNavigate();
  const handleNoticeClick = useCallback(
    (id: number) => {
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

  return (
    <ThemeProvider theme={theme}>
      <Stack className="page-root">
        <Stack className="base-layout" gap={3}>
          {/* 페이지명 */}
          <Typography variant="h2">공지사항</Typography>

          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              position: "relative",
            }}
          >
            {/* 탭 메뉴 */}
            <Tabs value={tabIndex} onChange={handleTabIndexChange}>
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
              {notices
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((notice) => (
                  <TableRow
                    key={`notice${notice.id}`}
                    onClick={() => {
                      handleNoticeClick(notice.id);
                    }}
                    sx={{
                      cursor: "pointer",
                      "& td": {
                        padding: {
                          xs: "10px 15px",
                          sm: "15px",
                        },
                        backgroundColor:
                          notice.id === notices[0].id
                            ? theme.palette.primary.main
                            : "none",
                        color: notice.id === notices[0].id ? "white" : "black",
                      },
                      "&:hover td": {
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                      },
                    }}
                  >
                    <FixedTableCell keepline>{notice.id}</FixedTableCell>
                    <FixedTableCell>{notice.title}</FixedTableCell>
                    <FixedTableCell>{notice.date}</FixedTableCell>
                    <FixedTableCell keepline>{notice.views}</FixedTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* 모바일용 공지사항 목록 */}
          <List>
            {notices
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((notice) => (
                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  key={`notice${notice.id}`}
                  sx={{
                    cursor: "pointer",
                    padding: "10px",
                    backgroundColor:
                      notice.id === notices[0].id
                        ? theme.palette.primary.main
                        : "none",
                    color: notice.id === notices[0].id ? "white" : "black",
                    borderBottom: "1px solid #aaa",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                    "&:nth-child(even)": {
                      backgroundColor: "#f4f4f6",
                      color: "black",
                    },
                    "&:nth-child(1)": {
                      borderTop: "1px solid #aaa",
                    },
                  }}
                >
                  <Typography variant="body2" alignSelf="center">
                    {notice.id}
                  </Typography>
                  <Stack
                    key={`notice${notice.id}`}
                    onClick={() => {
                      handleNoticeClick(notice.id);
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
    </ThemeProvider>
  );
};

export default Notice;
