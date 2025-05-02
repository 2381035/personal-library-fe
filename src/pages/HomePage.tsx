// src/pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom"; // <-- Import Link di sini
import "./HomePage.css";

// --- GANTI DENGAN URL GAMBAR ANDA ---
const heroImageUrl =
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1290&q=80";

const HomePage: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>
          Your Personal Library, <br />
          Organized Effortlessly.
        </h1>
        <p>
          Keep track of your books, manage your reading progress, and discover
          your next great read. All in one place.
        </p>
        <Link to="/register" className="cta-button">
          Get Started Now
        </Link>
      </div>
      <div className="hero-image-container">
        <img
          src={heroImageUrl}
          alt="People reading books in a library setting"
          className="hero-image"
        />
      </div>
    </div>
  );
};

export default HomePage;
