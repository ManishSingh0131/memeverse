// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import MemeDetailPage from "./pages/MemeDetailPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes> {/* Ensure all routes are wrapped inside <Routes> */}
        <Route path="/" element={<HomePage />} /> {/* HomePage should be here */}
        <Route path="/upload" element={<UploadPage />} /> {/* UploadPage should be here */}
        <Route path="/meme/:id" element={<MemeDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
