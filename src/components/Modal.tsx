// src/components/Modal.tsx
import React, { ReactNode } from "react";
import "./Modal.css"; // Kita akan buat CSS untuk ini

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {" "}
      {/* Tutup jika klik overlay */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Hindari penutupan jika klik konten modal */}
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
