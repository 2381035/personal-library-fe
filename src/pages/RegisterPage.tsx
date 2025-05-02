// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import apiClient from "../services/api";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "../styles/AuthForm.css"; // <-- Import CSS baru

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false); // Opsional
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal harus 6 karakter.");
      return;
    }
    // setIsLoading(true);

    try {
      await apiClient.post("/auth/register", { name, email, password });
      setSuccess("Registrasi berhasil! Anda akan dialihkan ke halaman Login.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Registration failed:", err);
      if (err.response && err.response.status === 409) {
        setError(err.response.data.message || "Email sudah terdaftar.");
      } else {
        setError(
          err.response?.data?.message || "Registrasi gagal. Silakan coba lagi."
        );
      }
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-container">
        {/* Kolom Overlay (Kiri untuk Register) */}
        <div className="overlay-container">
          <div className="overlay-content">
            <h1>Selamat Datang!</h1>
            <p>
              Sudah punya akun? Masuk untuk mengakses koleksi buku pribadi Anda.
            </p>
            <Link to="/login" className="overlay-button">
              Sign In
            </Link>
          </div>
        </div>

        {/* Kolom Form (Kanan untuk Register) */}
        <div className="form-container">
          <h1>Create Account</h1>
          {/* <div className="social-icons">...</div> */}
          {/* <span>atau gunakan email untuk registrasi</span> */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="name">Nama</label>
              <input
                type="text"
                id="name"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="Buat password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Konfirmasi Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button type="submit" className="submit-button">
              {" "}
              {/* disabled={isLoading}> */}
              {/* {isLoading ? 'Registering...' : 'Sign Up'} */}
              Sign Up
            </button>
          </form>
          <p className="switch-link">
            Sudah punya akun? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
