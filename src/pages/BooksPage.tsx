// src/pages/BooksPage.tsx
import React, { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api";
import { Book, User } from "../types"; // Import User juga jika perlu
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal"; // Import Modal
import BookForm from "../components/BookForm"; // Import BookForm
import "./BooksPage.css"; // Kita akan buat CSS baru

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Ambil user jika perlu info nama

  // State untuk Modal dan Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null); // null untuk Add, object Book untuk Edit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fungsi untuk fetch buku (gunakan useCallback agar tidak dibuat ulang terus)
  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Book[]>("/books");
      setBooks(response.data);
    } catch (err: any) {
      console.error("Failed to fetch books:", err);
      setError(err.response?.data?.message || "Gagal mengambil data buku.");
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependency array kosong, hanya dibuat sekali

  // Fetch buku saat komponen mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Fungsi untuk membuka modal Tambah
  const handleOpenAddModal = () => {
    setEditingBook(null); // Pastikan tidak ada data edit
    setFormError(null); // Reset error form
    setIsModalOpen(true);
  };

  // Fungsi untuk membuka modal Edit
  const handleOpenEditModal = (book: Book) => {
    setEditingBook(book); // Set data buku yang akan diedit
    setFormError(null);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(null); // Reset editing book
    setFormError(null);
  };

  // Fungsi untuk handle submit form (Create/Update)
  const handleFormSubmit = async (formData: any) => {
    // Ganti 'any' dengan tipe data form yang lebih spesifik nanti
    setIsSubmitting(true);
    setFormError(null);
    const bookData = {
      title: formData.title,
      author: formData.author,
      totalPages: Number(formData.totalPages), // Pastikan number
      isbn: formData.isbn || null,
      category_id: formData.category_id || null,
    };

    try {
      if (editingBook) {
        // --- UPDATE ---
        const response = await apiClient.put<Book>(
          `/books/${editingBook.id}`,
          bookData
        );
        // Update state books: ganti buku lama dengan data baru
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === editingBook.id ? response.data : b))
        );
      } else {
        // --- CREATE ---
        const response = await apiClient.post<Book>("/books", bookData);
        // Tambahkan buku baru ke state books
        setBooks((prevBooks) => [...prevBooks, response.data]);
      }
      handleCloseModal(); // Tutup modal jika sukses
    } catch (err: any) {
      console.error("Failed to save book:", err);
      setFormError(
        err.response?.data?.message ||
          `Gagal ${editingBook ? "memperbarui" : "menambah"} buku.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fungsi untuk handle delete buku
  const handleDeleteBook = async (bookId: number) => {
    // Konfirmasi sebelum menghapus
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        await apiClient.delete(`/books/${bookId}`);
        // Hapus buku dari state books
        setBooks((prevBooks) => prevBooks.filter((b) => b.id !== bookId));
        // Mungkin tampilkan notifikasi sukses (opsional)
      } catch (err: any) {
        console.error("Failed to delete book:", err);
        // Tampilkan error ke pengguna (opsional)
        setError(err.response?.data?.message || "Gagal menghapus buku.");
      }
    }
  };

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>My Book Collection</h1>
        <button className="add-book-button" onClick={handleOpenAddModal}>
          + Add New Book
        </button>
      </div>

      {/* Tampilkan pesan loading atau error global */}
      {isLoading && <p className="loading-message">Loading books...</p>}
      {error && <p className="error-message-global">Error: {error}</p>}

      {/* Tampilkan daftar buku jika tidak loading dan tidak ada error */}
      {!isLoading && !error && (
        <div className="book-list-container">
          {books.length === 0 ? (
            <p className="no-books-message">
              No books found. Click "Add New Book" to get started!
            </p>
          ) : (
            <div className="book-grid">
              {books.map((book) => (
                <div key={book.id} className="book-card">
                  <h3>{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <p className="book-pages">{book.totalPages} pages</p>
                  {book.isbn && <p className="book-isbn">ISBN: {book.isbn}</p>}
                  {/* Tambahkan info kategori jika ada */}
                  <div className="book-actions">
                    <button
                      className="button-edit"
                      onClick={() => handleOpenEditModal(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="button-delete"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </button>
                    {/* Tombol lihat progress nanti */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal untuk Add/Edit Buku */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingBook ? "Edit Book" : "Add New Book"}
      >
        {formError && <p className="error-message">{formError}</p>}
        <BookForm
          onSubmit={handleFormSubmit}
          initialData={editingBook}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default BooksPage;
