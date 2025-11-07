import { jsx as _jsx } from "react/jsx-runtime";
export default function BeforeAfter({ beforeSrc = "/images/before-after/before_after_composite.jpg", afterSrc = "/images/before-after/before_after_composite.jpg", className = "", }) {
    // Простая заглушка: выводит одно изображение.
    // Позже можно заменить на слайдер "до/после".
    return (_jsx("div", { className: `rounded-2xl overflow-hidden border border-slate-200 bg-white ${className}`, children: _jsx("img", { src: afterSrc || beforeSrc, alt: "Before / After", className: "w-full h-auto object-cover", loading: "lazy" }) }));
}
