import React from "react";
import Link from "next/link";
import { ShieldCheck, Globe, Mail, MapPin } from "lucide-react";

const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-forest text-cream py-24 md:py-32 px-6 md:px-12 overflow-hidden relative">
      {/* Background Sophistication */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#A6634B05,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-24 mb-24">
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-cream text-forest flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform shadow-xl">
                प्र
              </div>
              <span className="text-sm font-bold tracking-[0.5em] uppercase">PRAMAAN</span>
            </Link>
            <p className="text-cream/40 text-[11px] tracking-[0.2em] uppercase leading-relaxed max-w-xs font-medium italic">
              "Verify Trust. Not Just Documents." <br />
              Architecting the global infrastructure for cryptographic document authentication and decentralized trust.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <Link href="#" className="text-cream/20 hover:text-terracotta transition-colors"><Twitter size={18} /></Link>
              <Link href="#" className="text-cream/20 hover:text-terracotta transition-colors"><Linkedin size={18} /></Link>
              <Link href="#" className="text-cream/20 hover:text-terracotta transition-colors"><Instagram size={18} /></Link>
            </div>
          </div>

          <div>
            <h5 className="text-[10px] font-bold tracking-[0.4em] uppercase text-cream/30 mb-10">Infrastructure</h5>
            <ul className="space-y-5">
              <li><Link href="/verify" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Public Verifier</Link></li>
              <li><Link href="/#infrastructure" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Polygon Hub</Link></li>
              <li><Link href="/#solutions" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">ZK-Hashing</Link></li>
              <li><Link href="/docs" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Developer API</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold tracking-[0.4em] uppercase text-cream/30 mb-10">Institutional</h5>
            <ul className="space-y-5">
              <li><Link href="/dashboard" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Issuer Portal</Link></li>
              <li><Link href="/signup" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Become Issuer</Link></li>
              <li><Link href="/case-studies" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Success Stories</Link></li>
              <li><Link href="/trust" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Security</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold tracking-[0.4em] uppercase text-cream/30 mb-10">Resources</h5>
            <ul className="space-y-5">
              <li><Link href="/docs" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Whitepaper</Link></li>
              <li><Link href="/api" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">API Reference</Link></li>
              <li><Link href="/research" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Research</Link></li>
              <li><Link href="/blog" className="text-cream/40 hover:text-cream transition-colors uppercase tracking-widest text-[9px] font-bold">Updates</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-cream/20">
              © 2026 PRAMAAN INFRASTRUCTURE.
            </p>
            <div className="flex gap-8 text-[9px] font-bold tracking-[0.2em] uppercase text-cream/20">
              <Link href="/privacy" className="hover:text-cream transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-cream transition-colors">Terms</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[9px] font-bold uppercase tracking-widest text-cream/30">
            <Globe size={12} className="text-emerald-500 animate-pulse" />
            Global Trust Protocol v2.1
          </div>
        </div>
      </div>
    </footer>
  );
}
