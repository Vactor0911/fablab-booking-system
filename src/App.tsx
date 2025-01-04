import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Header from "./components/Header"
import { Reservation } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/reservation" />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation2" element={<h1>asd</h1>} />
        <Route path="*" element={<Navigate to="/reservation" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
