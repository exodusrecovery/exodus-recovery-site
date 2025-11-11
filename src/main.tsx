import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import VideoPage from "./VideoPage";
import GalleryPage from "./pages/GalleryPage";
import DonateSuccess from "./pages/DonateSuccess";   // ✅ добавь
import DonateCanceled from "./pages/DonateCanceled"; // ✅ добавь
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/videos" element={<VideoPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/donate/success" element={<DonateSuccess />} />   {/* ✅ новая страница */}
        <Route path="/donate/canceled" element={<DonateCanceled />} /> {/* ✅ новая страница */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);