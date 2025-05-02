// src/components/BookForm.tsx
import React, { useState, useEffect } from "react";
import { Book } from "../types"; // Import tipe Book

interface BookFormData {
  title: string;
  author: string;
  totalPages: number | string; // Bisa string saat input
  isbn?: string;
  category_id?: number | null;
}

interface BookFormProps {
  onSubmit: (data: BookFormData) => Promise<void>; // Fungsi untuk handle submit
  initialData?: Book | null; // Data awal untuk mode Edit
  isSubmitting: boolean; // Status submit dari parent
}

const BookForm: React.FC<BookFormProps> = ({
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    totalPages: "",
    isbn: "",
    category_id: null,
  });

  useEffect(() => {
    // Isi form jika ada initialData (mode Edit)
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        totalPages: initialData.totalPages?.toString() || "",
        isbn: initialData.isbn || "",
        category_id: initialData.category_id || null,
      });
    } else {
      // Reset form jika mode Tambah
      setFormData({
        title: "",
        author: "",
        totalPages: "",
        isbn: "",
        category_id: null,
      });
    }
  }, [initialData]); // Jalankan saat initialData berubah

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "totalPages" || name === "category_id"
          ? value
            ? Number(value)
            : null
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Konversi totalPages ke number sebelum submit
    onSubmit({ ...formData, totalPages: Number(formData.totalPages) });
  };

  // TODO: Tambahkan Select untuk Kategori jika diperlukan
  // const [categories, setCategories] = useState([]);
  // useEffect(() => { fetch categories... }, []);

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-input-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-input-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-input-group">
        <label htmlFor="totalPages">Total Halaman</label>
        <input
          type="number"
          id="totalPages"
          name="totalPages"
          value={formData.totalPages}
          onChange={handleChange}
          required
          min="1"
          disabled={isSubmitting}
        />
      </div>
      <div className="form-input-group">
        <label htmlFor="isbn">ISBN (Opsional)</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      {/* <div className="form-input-group">
        <label htmlFor="category_id">Kategori (Opsional)</label>
        <select
            id="category_id"
            name="category_id"
            value={formData.category_id ?? ''}
            onChange={handleChange}
             disabled={isSubmitting}
        >
            <option value="">-- Pilih Kategori --</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </div> */}
      <button
        type="submit"
        className="submit-button form-submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Menyimpan..."
          : initialData
          ? "Update Buku"
          : "Tambah Buku"}
      </button>
    </form>
  );
};

export default BookForm;
