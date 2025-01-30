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
} from "./pages";

function App() {
  return (
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
    </BrowserRouter>
  );
}

export default App;
