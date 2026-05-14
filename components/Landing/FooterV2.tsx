"use client";

import React from "react";
import Link from "next/link";
import { Apple } from "lucide-react";

const Twitter = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const Linkedin = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Github = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

import { Logo } from "@/components/Logo";

export const FooterV2: React.FC = () => {
  return (
    <footer className="bg-white border-t border-black/5 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo size={40} />
              <span className="text-black font-bold text-xl tracking-tight">Pramaan</span>
            </Link>
            <p className="text-black/40 text-sm leading-relaxed max-w-xs">
              The platform of absolute trust. Verify and manage documents with cryptographic permanence.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 transition-all">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 transition-all">
                <Github size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 transition-all">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-black/50">
              <li><Link href="#" className="hover:text-black transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-black/50">
              <li><Link href="#" className="hover:text-black transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Download</h4>
            <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-black/90 transition-all">
                    <Apple size={16} fill="white" />
                    App Store
                </button>
                <div className="text-center">
                    <p className="text-xs text-black/40">Coming soon to Android</p>
                </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-black/40">
            © 2026 Pramaan Infrastructure. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-black/40">
            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
