'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Loader2, ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Authorization failed. Invalid identity credentials.');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('A system error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left: Branding & Visual */}
      <div className="hidden md:flex md:w-[40%] bg-black p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F2E6E110,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 opacity-[0.07] pointer-events-none">
          <Logo size={600} />
        </div>

        <Link href="/" className="flex items-center gap-2 group z-10">
          <Logo size={40} />
          <span className="text-white font-bold text-xl tracking-tight">Pramaan</span>
        </Link>

        <div className="relative z-10">
          <div className="w-12 h-12 bg-lime rounded-2xl flex items-center justify-center mb-8">
            <Shield size={24} className="text-black" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Institutional <br />
            Auth Protocol.
          </h2>
          <p className="text-white/40 max-w-sm leading-relaxed">
            Securely access the Pramaan global registry and manage your institution's digital credentials with cryptographic certainty.
          </p>
        </div>

        <div className="z-10 text-white/20 text-[10px] font-bold uppercase tracking-widest">
          © 2026 Pramaan Infrastructure
        </div>
      </div>

       {/* Right: Auth Form */}
       <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="md:hidden w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black mb-4">
                <ArrowLeft size={16} />
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
              Log <span className="bg-lime px-2 py-0.5 rounded-sm">in</span>
            </h1>
            <p className="text-black/40 font-medium">
              Enter your institutional credentials to proceed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/30 ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="name@university.edu"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.03] border border-transparent focus:border-black/10 focus:bg-white transition-all text-sm font-semibold text-black outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/30">Password</label>
                  <Link href="#" className="text-[10px] font-bold text-black/40 hover:text-black transition-colors uppercase tracking-widest">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 w-4 h-4" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.03] border border-transparent focus:border-black/10 focus:bg-white transition-all text-sm font-semibold text-black outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-red-50 text-red-500 text-xs font-semibold border border-red-100 flex items-center gap-3"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl font-bold text-sm bg-black text-white hover:bg-black/90 shadow-xl shadow-black/10 transition-all active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Enter Registry'}
            </Button>
          </form>

          <div className="text-center pt-8">
            <p className="text-sm font-medium text-black/40">
              New to Pramaan? {' '}
              <Link href="/signup" className="text-black font-bold hover:underline underline-offset-4 ml-1">
                Establish Identity
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
