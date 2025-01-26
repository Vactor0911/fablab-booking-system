import {
  Box,
  InputAdornment,
  Pagination,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
    },
    [navigate]
  );

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
          <TableContainer
            component={Box}
            sx={{
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>번호</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>제목</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>작성일자</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>조회수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notices
                  .slice((page - 1) * 9, (page - 1) * 9 + 9)
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
                          color:
                            notice.id === notices[0].id ? "white" : "black",
                        },
                        "&:hover td": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        },
                      }}
                    >
                      <TableCell>{notice.id}</TableCell>
                      <TableCell
                        sx={{
                          flex: 1,
                          maxWidth: "300px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {notice.title}
                      </TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {notice.date}
                      </TableCell>
                      <TableCell>{notice.views}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default Notice;
