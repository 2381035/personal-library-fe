// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { AuthContextType, AuthState, User } from "../types";
import apiClient from "../services/api"; // Import apiClient jika perlu fetch user profile

// Nilai default untuk context
const defaultState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: true, // Mulai dengan loading true saat cek token awal
};

// Buat context
const AuthContext = createContext<AuthContextType>({
  ...defaultState,
  login: () => {},
  logout: () => {},
});

// Buat provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultState);

  // Cek token di localStorage saat komponen pertama kali mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          // Verifikasi token ATAU fetch data user profile (backend perlu endpoint /auth/profile atau /users/profile)
          // Contoh: Jika punya endpoint profile yang dilindungi
          // apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set header sementara jika belum pakai interceptor
          // const response = await apiClient.get('/users/profile'); // Ganti dengan endpoint profile Anda
          // const userData: User = response.data;
          // setAuthState({ isAuthenticated: true, user: userData, token: token, isLoading: false });

          // --- Versi Sederhana: Anggap token valid jika ada ---
          // (Idealnya Anda harus memvalidasi token atau mengambil data user)
          // Untuk demo ini, kita decode payload token (perlu library jwt-decode)
          // atau sementara set user ke objek dummy jika token ada
          console.warn(
            "Auth Check: Assuming token is valid. Ideally, verify token or fetch user profile."
          );
          // Contoh (tanpa decode/fetch):
          setAuthState({
            isAuthenticated: true,
            user: { id: 0, name: "User", email: "..." },
            token: token,
            isLoading: false,
          });
          // --- Akhir Versi Sederhana ---
        } catch (error) {
          console.error("Auth Check Failed:", error);
          localStorage.removeItem("accessToken");
          setAuthState({ ...defaultState, isLoading: false });
        }
      } else {
        setAuthState({ ...defaultState, isLoading: false }); // Tidak ada token, selesai loading
      }
    };
    checkAuthStatus();
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("accessToken", token);
    // apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Di-handle oleh interceptor
    setAuthState({ isAuthenticated: true, user, token, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    // delete apiClient.defaults.headers.common['Authorization']; // Di-handle oleh interceptor
    setAuthState({ ...defaultState, isLoading: false }); // Kembali ke state awal
    // Redirect ke login (lebih baik dilakukan di komponen Navigasi/Logout)
    window.location.href = "/login";
  };

  // Jangan render children sampai status auth selesai dicek
  if (authState.isLoading) {
    // Tampilkan loading indicator atau null
    return <div>Loading Authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Buat custom hook untuk menggunakan context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
