import { jsx as _jsx } from "react/jsx-runtime";
export function Card({ className = '', ...p }) {
    return _jsx("div", { className: `bg-white border border-slate-200 rounded-2xl ${className}`, ...p });
}
export function CardHeader({ className = '', ...p }) {
    return _jsx("div", { className: `p-5 border-b border-slate-200 ${className}`, ...p });
}
export function CardTitle({ className = '', ...p }) {
    return _jsx("h3", { className: `text-lg font-semibold ${className}`, ...p });
}
export function CardContent({ className = '', ...p }) {
    return _jsx("div", { className: `p-5 ${className}`, ...p });
}
