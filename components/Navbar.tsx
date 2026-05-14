'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShieldCheck, User, LogOut, Menu, X, Lock, Apple, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

import { Logo } from '@/components/Logo';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide Navbar on Auth Pages
  if (pathname === '/login' || pathname === '/signup') return null;

  const isHome = pathname === '/';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Issue', href: '/create' },
    { name: 'Verify', href: '/verify' },
    { name: 'Docs', href: '/docs' },
  ];

  if (session) {
    navLinks.push({ name: 'Dashboard', href: '/dashboard' });
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6",
      scrolled ? "py-3 bg-white/80 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size={40} />
          <span className="text-black font-bold text-xl tracking-tight">Pramaan</span>
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href ? "text-black" : "text-black/50 hover:text-black"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Auth / Greeting */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {session ? (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="hidden lg:flex flex-col items-end mr-2">
                  <span className="text-[10px] font-bold text-black">Hello, {session.user?.name?.split(' ')[0] || session.user?.email?.split('@')[0]}</span>
                  <span className="text-[8px] font-medium text-black/40 uppercase tracking-widest">Institutional Partner</span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-9 h-9 rounded-full bg-black/5 border border-black/10 flex items-center justify-center hover:bg-black/10 transition-colors">
                      <User size={16} className="text-black" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-4 rounded-2xl p-2 bg-white border border-black/5 shadow-xl">
                    <div className="px-4 py-3">
                      <p className="text-[9px] font-bold text-black/40 uppercase tracking-widest mb-1">Identity</p>
                      <p className="text-xs font-bold text-black truncate">{session.user?.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-black/5" />
                    <DropdownMenuItem asChild className="rounded-xl focus:bg-black/5 cursor-pointer">
                      <Link href="/profile" className="w-full flex items-center gap-2 py-2.5 px-2 text-xs font-semibold text-black/70">
                        <User size={14} /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-black/5" />
                    <DropdownMenuItem 
                      onClick={() => signOut()}
                      className="rounded-xl focus:bg-red-50 text-red-500 cursor-pointer py-2.5 px-2 text-xs font-bold flex items-center gap-2"
                    >
                      <LogOut size={14} /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6"
              >
                <Link href="/login" className="hidden sm:block text-sm font-medium text-black/50 hover:text-black transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-black/90 active:scale-95 transition-all">
                  Get Started
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 p-6 rounded-[2rem] bg-white shadow-2xl border border-black/5 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-black/70 hover:text-black"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-black/5 w-full my-2" />
            {!session && (
              <div className="flex flex-col gap-4">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-black/50">Login</Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="bg-black text-white py-4 rounded-2xl text-center font-bold">Get Started</Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
