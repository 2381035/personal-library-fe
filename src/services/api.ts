// src/services/api.ts
import axios from "axios";

// Ambil base URL dari environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- INTERCEPTOR (PENTING untuk Auth) ---
// Menambahkan token ke setiap request jika ada
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Ambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- INTERCEPTOR RESPONSE (Opsional tapi bagus) ---
// Menangani error umum seperti 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response, // Jika sukses, teruskan respons
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika 401 (Unauthorized), hapus token lama & redirect ke login
      console.error("Unauthorized request, logging out.");
      localStorage.removeItem("accessToken");
      // Redirect ke halaman login (jika di luar komponen React, gunakan window.location)
      if (window.location.pathname !== "/login") {
        // Beri sedikit delay agar user tidak bingung (opsional)
        // setTimeout(() => { window.location.href = '/login'; }, 500);
        // Atau idealnya gunakan state management untuk handle redirect
      }
    }
    // Teruskan error agar bisa ditangani di tempat pemanggilan API
    return Promise.reject(error);
  }
);

export default apiClient;
