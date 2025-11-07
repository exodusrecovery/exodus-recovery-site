import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/VideoPage.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
_jsx(Header, {});
{ /* фирменные переменные для градиентов и кнопок */ }
_jsx("style", { children: `
  :root{
    --brand:#2d2846;         /* тот же, что в App.tsx */
    --brand-dark:#231e39;
    --accent:#43A047;
  }
` });
const videos = [
    {
        id: "feliks-001",
        title: "Feliks Galkin — Testimony",
        src: "/videos/feliks.mp4",
        thumb: "/images/people/feliks.jpg",
        duration: "≈3 min",
    },
    // примеры для будущих добавлений:
    // { id: "jessica-002", title: "Jessica — Story", src: "/videos/jessica.mp4", thumb: "/images/people/jessica.jpg", duration: "≈4 min" },
];
export default function VideoPage() {
    const [activeVideo, setActiveVideo] = useState(0);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-slate-800", children: [_jsx(Header, {}), _jsxs("main", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900", children: "Video Testimonies" }), _jsx("span", { className: "mt-3 inline-block h-1 w-24 rounded-full", style: {
                                    background: "linear-gradient(90deg, var(--brand), var(--accent))",
                                } }), _jsx("p", { className: "mt-3 text-slate-600", children: "Real stories of restoration, hope, and freedom." })] }), _jsxs("div", { className: "mt-10 grid lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.06)] bg-black", children: [_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.video, { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: { duration: 0.25, ease: "easeOut" }, className: "w-full h-auto aspect-video", controls: true, preload: "metadata", poster: videos[activeVideo].thumb, children: [_jsx("source", { src: videos[activeVideo].src, type: "video/mp4" }), "Your browser does not support the video tag."] }, videos[activeVideo].id) }), _jsx("div", { className: "absolute left-3 top-3", children: _jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-black/70 text-white text-xs md:text-sm px-3 py-1.5 backdrop-blur", children: [_jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-emerald-400" }), "Now playing"] }) })] }), _jsxs("div", { className: "mt-4", children: [_jsx("h2", { className: "text-xl md:text-2xl font-semibold text-slate-900", children: videos[activeVideo].title }), videos[activeVideo].duration ? (_jsx("p", { className: "text-sm text-slate-500 mt-1", children: videos[activeVideo].duration })) : null] })] }), _jsxs("div", { children: [_jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-1 gap-4", children: videos.map((v, idx) => {
                                            const active = idx === activeVideo;
                                            return (_jsxs(motion.button, { onClick: () => setActiveVideo(idx), whileHover: { y: -2 }, transition: { type: "spring", stiffness: 300, damping: 20 }, className: `group w-full text-left rounded-2xl overflow-hidden border p-3 flex items-center gap-4 shadow-sm transition
                    ${active
                                                    ? "border-[var(--brand)] bg-white"
                                                    : "border-slate-200 bg-white hover:border-slate-300"}`, children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: v.thumb, alt: v.title, className: "h-20 w-32 object-cover rounded-xl border border-slate-200" }), !active && (_jsx("span", { className: "absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition", children: _jsx("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white", children: "\u25B6" }) }))] }), _jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: `font-semibold truncate ${active ? "text-slate-900" : "text-slate-800"}`, children: v.title }), _jsx("div", { className: "text-xs text-slate-500 mt-1", children: v.duration || "—" }), active && (_jsx("div", { className: "mt-2 h-1 w-14 rounded-full", style: {
                                                                    background: "linear-gradient(90deg, var(--brand), var(--accent))",
                                                                } }))] })] }, v.id));
                                        }) }), _jsx("div", { className: "mt-10 text-center", children: _jsx("a", { href: "/", className: "inline-block rounded-xl px-6 py-3 font-semibold text-white shadow hover:shadow-md transition bg-[#2d2846] hover:bg-[#231e39]", children: "\u2190 Back to main site" }) })] })] })] })] }));
}
