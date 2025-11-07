import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import VideoPage from "./VideoPage";
import GalleryPage from "./pages/GalleryPage";
import DonateSuccess from "./pages/DonateSuccess"; // ✅ добавь
import DonateCanceled from "./pages/DonateCanceled"; // ✅ добавь
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/videos", element: _jsx(VideoPage, {}) }), _jsx(Route, { path: "/gallery", element: _jsx(GalleryPage, {}) }), _jsx(Route, { path: "/donate/success", element: _jsx(DonateSuccess, {}) }), "   ", _jsx(Route, { path: "/donate/canceled", element: _jsx(DonateCanceled, {}) }), " "] }) }) }));
