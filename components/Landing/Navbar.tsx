"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 ${scrolled ? "py-4" : "py-8"}`}>
      <div className={`max-w-7xl mx-auto flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? "glass shadow-xl shadow-forest/5" : "bg-transparent"}`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-forest text-cream flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
             प्र
          </div>
          <span className="text-forest text-[11px] font-bold tracking-[0.4em] uppercase">PRAMAAN</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {["Verify", "Issue", "Protocol", "Docs"].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`} 
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-forest/60 hover:text-forest transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-forest/10 bg-forest/5">
             <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
             <span className="text-[9px] font-bold tracking-widest uppercase opacity-60">Mainnet Live</span>
          </div>
          <Link href="/login" className="btn-premium bg-forest text-cream px-6 py-2 text-[10px] uppercase tracking-widest hover:opacity-90 active:scale-95">
            Portal
          </Link>
        </div>
      </div>
    </nav>
  );
};
