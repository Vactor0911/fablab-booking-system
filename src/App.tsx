import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Header from "./components/Header";
import {
  Home,
  Login,
  Register,
  FindPassword,
  Reservation,
  About,
  Notice,
  NoticeDetail,
  Users,
  Settings,
  Logs,
  BookRestrictions,
  BookRestrictionDetail,
  MyPage,
  MyReservation,
} from "./pages";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { theme } from "./utils";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline enableColorScheme />
      <Stack minHeight="100vh">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/find-password" element={<FindPassword />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/about" element={<About />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/notice/:noticeid" element={<NoticeDetail />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/my-reservation" element={<MyReservation />} />

            {/* 관리자 페이지 */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/book-restrictions" element={<BookRestrictions />} />
            <Route
              path="/book-restrictions/:restrictionid"
              element={<BookRestrictionDetail />}
            />

            {/* 404 Not Found */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
