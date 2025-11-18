import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Our Approach", href: "#approach" },
    { name: "Admissions", href: "#admissions" },
    { name: "Stories", href: "#stories" },
    { name: "Contact", href: "#contact" },
    { name: "Videos", href: "#videos" },
  ];

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/logo-exodus.svg"
            alt="Exodus Recovery"
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-[17px] font-medium text-slate-800">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-[var(--brand)]">
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t py-3 px-4 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-lg py-2 font-medium text-slate-800 hover:text-[var(--brand)]"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}