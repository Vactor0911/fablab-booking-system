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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
