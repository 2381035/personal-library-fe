// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <Link to={isAuthenticated ? "/books" : "/"}>Personal Library</Link>
        </div>
        <nav className="nav-links">
          {/* Navigasi utama bisa ditambahkan di sini nanti jika perlu */}
        </nav>
        <div className="auth-links">
          {isAuthenticated ? (
            // Jika user terautentikasi, tampilkan nama dan tombol logout
            <>
              <span className="welcome-user">
                Welcome, {user?.name || "User"}!
              </span>
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </>
          ) : // --- HAPUS ATAU KOMENTARI BAGIAN INI ---
          // Jika user TIDAK terautentikasi, jangan tampilkan apa-apa di header
          // <>
          //   <Link to="/login" className="header-link">Login</Link>
          //   <Link to="/register" className="header-button">Register</Link>
          // </>
          null // Atau return null agar tidak ada yang dirender
          // --------------------------------------
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
