// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

export default function Header() {
  return (
    <>
      {/* Верхняя контактная полоска */}
      <div
        className="w-full text-sm"
        style={{ background: BRAND.colors.primary, color: "white" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-6">
            <a className="flex items-center gap-2 hover:opacity-90" href={`tel:${BRAND.phone}`}>
              <Phone className="h-4 w-4" />
              {BRAND.phone}
            </a>
            <a className="flex items-center gap-2 hover:opacity-90" href={`mailto:${BRAND.email}`}>
              <Mail className="h-4 w-4" />
              {BRAND.email}
            </a>
            <span className="hidden md:inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {BRAND.address}
            </span>
          </div>

          <a
            href="https://donate.stripe.com/bJecN44Zo54X4odgCa28800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="h-8 rounded-full px-4">
              Donate
            </Button>
          </a>
        </div>
      </div>

      {/* Навигация */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-0 flex items-center justify-between h-[72px] md:h-[88px]">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo-exodus.svg"
              alt="Exodus Recovery Logo"
              className="h-20 md:h-28 w-auto"
            />
            <span className="font-semibold text-base md:text-xl text-slate-800 whitespace-nowrap">
              {BRAND.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 text-sm md:text-base leading-none">
            <a className="hover:opacity-70" href="/#about">About</a>
            <a className="hover:opacity-70" href="/#programs">Programs</a>
            <a className="hover:opacity-70" href="/#approach">Approach</a>
            <a className="hover:opacity-70" href="/#admissions">Admissions</a>
            <a className="hover:opacity-70" href="/#stories">Stories</a>
            <a className="hover:opacity-70" href="/#contact">Contact</a>
            <Link to="/videos" className="hover:opacity-70">Videos</Link>
          </div>
        </nav>
      </header>
    </>
  );
}