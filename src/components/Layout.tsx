// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // Import komponen Header
import "./Layout.css"; // Kita akan buat file CSS ini

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet /> {/* Tempat konten halaman spesifik akan dirender */}
      </main>
      {/* Anda bisa menambahkan Footer di sini jika perlu */}
    </div>
  );
};

export default Layout;
