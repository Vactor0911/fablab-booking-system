import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import SectionHeader from "../components/SectionHeader";
import { useCallback, useState } from "react";
import FixedTableCell from "../components/FixedTableCell";

const MyReservation = () => {
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
      state: "예약중",
      date: "2021-10-20 13:30",
      seat: "A01",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-21 14:00",
      seat: "A02",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-22 15:30",
      seat: "A03",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-23 16:00",
      seat: "A04",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-24 17:30",
      seat: "A05",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-25 18:00",
      seat: "A06",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-26 19:30",
      seat: "A07",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-27 20:00",
      seat: "A08",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-28 21:30",
      seat: "A09",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-29 22:00",
      seat: "A10",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-30 23:30",
      seat: "A11",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-10-31 12:00",
      seat: "A12",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-11-01 13:30",
      seat: "A13",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-11-02 14:00",
      seat: "A14",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-11-03 15:30",
      seat: "A15",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-11-04 16:00",
      seat: "A16",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-11-05 17:30",
      seat: "A17",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-11-06 18:00",
      seat: "A18",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-11-07 19:30",
      seat: "A19",
      note: "비고",
    },
    {
      state: "예약종료",
      date: "2021-11-08 20:00",
      seat: "A20",
      note: "비고",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Stack className="page-root">
        <Stack className="base-layout" gap={5}>
          {/* 페이지명 */}
          <Typography variant="h2">내 예약정보</Typography>

          <SectionHeader title="예약내역" underline />

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

          <Table
            sx={{
              tableLayout: "fixed",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell width="10%">상태</TableCell>
                <TableCell width="30%">일시</TableCell>
                <TableCell width="20%">좌석</TableCell>
                <TableCell width="40%">퇴실 사유</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        row.state === "예약중" && index === 0 && page === 1
                          ? "#ddaeb7"
                          : "inherit",
                    }}
                  >
                    <FixedTableCell
                      keepline
                      sx={{
                        color:
                          row.state === "예약중" && index === 0 && page === 1
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    >
                      {row.state}
                    </FixedTableCell>
                    <FixedTableCell>{row.date}</FixedTableCell>
                    <FixedTableCell>{row.seat}</FixedTableCell>
                    <FixedTableCell>{row.note}</FixedTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default MyReservation;
