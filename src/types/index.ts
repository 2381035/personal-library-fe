// src/types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  // tambahkan properti lain jika ada dari backend (kecuali password)
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean; // Untuk loading state saat cek token awal
}

export interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
  // register mungkin tidak perlu mengubah state context secara langsung
}

// Anda juga bisa tambahkan tipe untuk Book, Category, ReadingProgress di sini
export interface Book {
  id: number;
  title: string;
  author: string;
  totalPages: number;
  isbn?: string | null;
  category_id?: number | null;
  user_id: number;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
  // Tambahkan relasi jika perlu (misal category: Category | null)
}
