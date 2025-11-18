import React, { useState } from "react";

export default function LazyYouTube({ videoId }: { videoId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-300 shadow-lg bg-black">
      {!isPlaying ? (
        <div
          className="relative cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover group-hover:opacity-90 transition"
            loading="lazy"
          />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 group-hover:bg-white transition p-4 rounded-full shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
                viewBox="0 0 24 24"
                fill="#000"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          className="w-full h-[315px] md:h-[420px] lg:h-[500px]"
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}   