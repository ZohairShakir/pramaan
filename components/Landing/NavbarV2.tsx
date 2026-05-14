"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Apple, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const NavbarV2: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Pages", href: "/pages" },
    { name: "Cart(0)", href: "/cart" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
            P
          </div>
          <span className="text-black font-bold text-xl tracking-tight">Pramaan</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-black/60 hover:text-black font-medium transition-colors text-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button className="hidden lg:flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-black/90 transition-all">
            <Apple size={16} fill="white" />
            Download for iOS
          </button>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-black">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};
