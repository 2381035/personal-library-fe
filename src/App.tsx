// src/App.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BooksPage from "./pages/BooksPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage"; // <-- Import HomePage
import NotFoundPage from "./pages/NotFoundPage"; // <-- Import NotFoundPage

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {" "}
        {/* Gunakan Layout */}
        {/* Rute Publik */}
        <Route index element={<HomePage />} />{" "}
        {/* Gunakan komponen yang diimpor */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* Rute Terlindungi */}
        <Route element={<ProtectedRoute />}>
          <Route path="books" element={<BooksPage />} />
          {/* Tambahkan rute privat lain di sini */}
        </Route>
        {/* Rute Not Found */}
        <Route path="*" element={<NotFoundPage />} />{" "}
        {/* Gunakan komponen yang diimpor */}
      </Route>
    </Routes>
  );
}

export default App;
