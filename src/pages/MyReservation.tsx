import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useColorScheme,
} from "@mui/material";
import { theme } from "../utils";
import SectionHeader from "../components/SectionHeader";
import { useCallback, useEffect, useState } from "react";
import FixedTableCell from "../components/FixedTableCell";
import { useNavigate } from "react-router";
import { useAtomValue } from "jotai";
import { loginStateAtom, Permission } from "../states";
import axiosInstance, { getCsrfToken } from "../utils/axiosInstance";

const MyReservation = () => {
  const navigate = useNavigate();
  const loginState = useAtomValue(loginStateAtom);

  useEffect(() => {
    if (!loginState.isLoggedIn || loginState.permission !== Permission.USER) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
  }, [loginState.isLoggedIn, loginState.permission, navigate]);

  // 페이지
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  // 내 예약 정보 불러오기
  interface MyReservation {
    state: string;
    date: string;
    seat: string;
    note?: string;
  }

  const [myReservation, setMyReservation] = useState<MyReservation[]>([]);

  const fetchMyReservation = useCallback(async () => {
    // CSRF 토큰 가져오기
    getCsrfToken()
      .then((csrfToken) => {
        // CSRF 토큰을 포함하여 API 호출
        return axiosInstance.get(`/users/reservations`, {
          headers: {
            "X-CSRF-Token": csrfToken, // CSRF 보호를 위한 토큰 헤더 추가
          },
          params: {
            page: page,
          },
        });
      })
      .then((response) => {
        setTotalPages(Math.ceil(response.data.totalReservations / 10));
        const newMyReservation = response.data.reservations.map(
          (reservation: {
            state: string;
            book_date: string;
            seat_name: string;
            cancel_reason: string;
          }) => {
            let state = "예약중";
            switch (reservation.state) {
              case "end":
                state = "퇴실";
                break;
              case "cancel":
                state = "강제 퇴실";
                break;
            }

            return {
              state: state,
              date: reservation.book_date,
              seat: reservation.seat_name,
              note: reservation.cancel_reason,
            };
          }
        );
        setMyReservation(newMyReservation);
      })
      .catch((err) => {
        console.error("예약 정보를 가져오는 중 오류 발생:", err);
      });
  }, [page]);

  useEffect(() => {
    fetchMyReservation();
  }, [fetchMyReservation, page]);

  const { mode } = useColorScheme();

  return (
    <Stack className="page-root">
      <Stack className="base-layout" gap={5}>
        {/* 페이지명 */}
        <Typography variant="h2">내 예약정보</Typography>

        <SectionHeader title="예약내역" underline />

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

        <Table
          sx={{
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell width="15%">상태</TableCell>
              <TableCell width="30%">일시</TableCell>
              <TableCell width="15%">좌석</TableCell>
              <TableCell width="40%">퇴실 사유</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myReservation.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor:
                    row.state === "예약중" && index === 0 && page === 1
                      ? mode === "light"
                        ? "#ddaeb7"
                        : "#b44b5e"
                      : "inherit",
                }}
              >
                <FixedTableCell
                  keepline
                  sx={{
                    color:
                      row.state === "예약중" && index === 0 && page === 1
                        ? mode === "light"
                          ? theme.palette.primary.main
                          : "white"
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
  );
};

export default MyReservation;
