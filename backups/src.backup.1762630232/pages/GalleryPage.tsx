import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Header from "@/components/Header";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function GalleryItem({
  src,
  alt,
  onOpen,
}: {
  src: string;
  alt: string;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.05,
        rotate: 0.5,
        boxShadow: "0 12px 25px rgba(45, 40, 70, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 14 }}
      className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm group cursor-pointer"
      style={{ aspectRatio: "4 / 3" }}
      onClick={onOpen}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function GalleryPage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const images = [
    "/images/gallery/01.jpg",
    "/images/gallery/02.jpg",
    "/images/gallery/03.jpg",
    "/images/gallery/04.jpg",
    "/images/gallery/05.jpg",
    "/images/gallery/06.jpg",
    "/images/gallery/07.jpg",
    "/images/gallery/08.jpg",
    "/images/gallery/09.jpg",
    "/images/gallery/10.jpg",
    "/images/gallery/11.jpg",
    "/images/gallery/12.jpg",
    "/images/gallery/13.jpg",
    "/images/gallery/14.jpg",
    "/images/gallery/15.jpg",
    "/images/gallery/16.jpg",
    "/images/gallery/17.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-slate-800">
      <Header />

      {/* СЕКЦИЯ СТРАНИЦЫ (важно закрыть </section> ниже) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Recovery Life</h1>
          <p className="text-slate-600 text-lg">
            Glimpses from our community — freedom, growth, and new beginnings.
          </p>
        </div>

        {/* Галерея */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
        >
          {images.map((src, i) => (
            <GalleryItem
              key={i}
              src={src}
              alt={`Gallery ${i + 1}`}
              onOpen={() => setLightboxImage(src)}
            />
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <a
            href="/"
            className="inline-block rounded-xl bg-[#2d2846] text-white px-8 py-3 text-lg font-semibold shadow-md hover:bg-[#231e39] transition-colors"
            style={{ boxShadow: "0 6px 20px rgba(45, 40, 70, 0.3)" }}
          >
            ← Back to main site
          </a>
        </div>
      </section>

      {/* Лайтбокс (модалка) */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Large view"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
          />
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}