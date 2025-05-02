// src/pages/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom"; // <-- Import Link di sini

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {" "}
      {/* Contoh inline style */}
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <br />
      <Link to="/" className="cta-button">
        {" "}
        {/* Bisa gunakan style tombol CTA */}
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
