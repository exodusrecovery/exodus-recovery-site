import { jsx as _jsx } from "react/jsx-runtime";
export function Select({ children, ...rest }) {
    return _jsx("select", { className: "w-full h-10 rounded-xl border border-slate-300 px-3", ...rest, children: children });
}
export const SelectTrigger = (p) => _jsx("div", { ...p });
export const SelectValue = (p) => _jsx("span", { ...p });
export const SelectContent = (p) => _jsx("div", { ...p });
export const SelectItem = ({ value, children }) => _jsx("option", { value: value, children: children });
