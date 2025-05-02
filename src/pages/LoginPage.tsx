// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import apiClient from "../services/api";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "../styles/AuthForm.css"; // <-- Import CSS baru

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false); // Opsional: state loading
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    // setIsLoading(true); // Mulai loading

    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { accessToken } = response.data;

      // TODO: Ganti dummyUser dengan data asli dari API /auth/profile atau sejenisnya
      const dummyUser = { id: 0, name: "Logged In User", email: email };
      login(accessToken, dummyUser);

      navigate("/books"); // Redirect ke halaman buku
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message || "Login gagal. Periksa kredensial."
      );
    } finally {
      // setIsLoading(false); // Selesai loading
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-container">
        {/* Kolom Form (Kiri) */}
        <div className="form-container">
          <h1>Sign In</h1>
          {/* Tambahkan ikon social login di sini jika mau */}
          {/* <div className="social-icons">...</div> */}
          {/* <span>atau gunakan akun anda</span> */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {/* <Link to="/forgot-password" className="forgot-password">Lupa kata sandi anda?</Link> */}
            <button type="submit" className="submit-button">
              {" "}
              {/* disabled={isLoading}> */}
              {/* {isLoading ? 'Loading...' : 'Sign In'} */}
              Sign In
            </button>
          </form>
          <p className="switch-link">
            Belum punya akun? <Link to="/register">Register</Link>
          </p>
        </div>

        {/* Kolom Overlay (Kanan) */}
        <div className="overlay-container">
          <div className="overlay-content">
            <h1>Halo, Teman!</h1>
            <p>
              Daftarkan diri anda dan mulai gunakan layanan perpustakaan pribadi
              kami segera
            </p>
            <Link to="/register" className="overlay-button">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
