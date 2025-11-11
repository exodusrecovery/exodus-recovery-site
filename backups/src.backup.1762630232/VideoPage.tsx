// src/pages/VideoPage.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
<Header />

{/* фирменные переменные для градиентов и кнопок */}
<style>{`
  :root{
    --brand:#2d2846;         /* тот же, что в App.tsx */
    --brand-dark:#231e39;
    --accent:#43A047;
  }
`}</style>

type VideoItem = {
  id: string;
  title: string;
  src: string;
  thumb: string;
  duration?: string;
};

const videos: VideoItem[] = [
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-slate-800">
      {/* общая шапка как на главной */}
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* заголовок */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Video Testimonies
          </h1>
          {/* фирменная тонкая линия */}
          <span
            className="mt-3 inline-block h-1 w-24 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--brand), var(--accent))",
            }}
          />
          <p className="mt-3 text-slate-600">
            Real stories of restoration, hope, and freedom.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          {/* Плеер (занимает 2 колонки на десктопе) */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.06)] bg-black">
              {/* плавная смена видео */}
              <AnimatePresence mode="wait">
                <motion.video
                  key={videos[activeVideo].id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full h-auto aspect-video"
                  controls
                  preload="metadata"
                  poster={videos[activeVideo].thumb}
                >
                  <source src={videos[activeVideo].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              </AnimatePresence>

              {/* бейджик «Now playing» */}
              <div className="absolute left-3 top-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/70 text-white text-xs md:text-sm px-3 py-1.5 backdrop-blur">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  Now playing
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                {videos[activeVideo].title}
              </h2>
              {videos[activeVideo].duration ? (
                <p className="text-sm text-slate-500 mt-1">
                  {videos[activeVideo].duration}
                </p>
              ) : null}
            </div>
          </div>

          {/* Список видео */}
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {videos.map((v, idx) => {
                const active = idx === activeVideo;
                return (
                  <motion.button
                    key={v.id}
                    onClick={() => setActiveVideo(idx)}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`group w-full text-left rounded-2xl overflow-hidden border p-3 flex items-center gap-4 shadow-sm transition
                    ${
                      active
                        ? "border-[var(--brand)] bg-white"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={v.thumb}
                        alt={v.title}
                        className="h-20 w-32 object-cover rounded-xl border border-slate-200"
                      />
                      {/* иконка «play» поверх превью при наведении */}
                      {!active && (
                        <span className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white">
                            ▶
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`font-semibold truncate ${
                          active ? "text-slate-900" : "text-slate-800"
                        }`}
                      >
                        {v.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {v.duration || "—"}
                      </div>

                      {/* индикатор активного элемента */}
                      {active && (
                        <div className="mt-2 h-1 w-14 rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--brand), var(--accent))",
                          }}
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Кнопка назад */}
            <div className="mt-10 text-center">
  <a
    href="/"
    className="inline-block rounded-xl px-6 py-3 font-semibold text-white shadow hover:shadow-md transition bg-[#2d2846] hover:bg-[#231e39]"
  >
    ← Back to main site
  </a>
</div>
          </div>
        </div>
      </main>
    </div>
  );
}