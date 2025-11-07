// src/components/BeforeAfter.tsx
import React from "react";

type Props = {
  beforeSrc?: string;
  afterSrc?: string;
  className?: string;
};

export default function BeforeAfter({
  beforeSrc = "/images/before-after/before_after_composite.jpg",
  afterSrc = "/images/before-after/before_after_composite.jpg",
  className = "",
}: Props) {
  // Простая заглушка: выводит одно изображение.
  // Позже можно заменить на слайдер "до/после".
  return (
    <div className={`rounded-2xl overflow-hidden border border-slate-200 bg-white ${className}`}>
      <img
        src={afterSrc || beforeSrc}
        alt="Before / After"
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  );
}