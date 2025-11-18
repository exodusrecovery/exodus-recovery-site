// src/components/Header.tsx
import React, { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#approach", label: "Approach" },
  { href: "#admissions", label: "Admissions" },
  { href: "#stories", label: "Stories" },
  { href: "#contact", label: "Contact" },
  { href: "#support", label: "Donate" },
];

export default function Header(): React.ReactElement {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* кнцн + мюгбюмхе */}
        <div className="flex items-center gap-3">
          <a href="#hero" className="flex items-center gap-3">
            <img
              src="/logo-exodus.svg"
              alt="Exodus Recovery Logo"
              className="h-10 w-auto md:h-12"
            />
            <span className="hidden sm:inline-block font-semibold text-sm md:text-base text-slate-900">
              Exodus Recovery Program
            </span>
          </a>
        </div>

        {/* деяйрно лемч */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="hover:text-slate-900 text-slate-600"
            >
              {item.label}
            </button>
          ))}

          <a href="tel:+15719822395">
            <Button
              className="rounded-full h-9 px-4 text-xs font-semibold"
              style={{ background: "#2d2846", color: "white" }}
            >
              <Phone className="h-4 w-4 mr-1" />
              Call Now
            </Button>
          </a>
        </div>

        {/* лнахкэмюъ опюбюъ вюярэ */}
        <div className="flex items-center gap-2 md:hidden">
          <a href="tel:+15719822395">
            <button
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-800"
            >
              <Phone className="h-4 w-4 mr-1" />
              Call
            </button>
          </a>

          {/* аспцеп */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* лнахкэмне бшоюдючыее лемч */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}