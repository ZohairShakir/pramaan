'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User, Loader2, ArrowLeft, AlertCircle, ShieldCheck, Upload, CheckCircle2, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';

type SignupStep = 'IDENTITY' | 'DOCUMENTS' | 'OTP' | 'SUCCESS';

export default function SignupPage() {
  const [step, setStep] = useState<SignupStep>('IDENTITY');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [correctOtp, setCorrectOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNextStep = () => {
    setError(null);
    if (step === 'IDENTITY') {
      if (!name || !email || !password) {
        setError('Please fill in all identity fields.');
        return;
      }
      setStep('DOCUMENTS');
    } else if (step === 'DOCUMENTS') {
      if (!uploadedFile) {
        setError('Please upload an institutional verification document.');
        return;
      }
      sendOTP();
      setStep('OTP');
    }
  };

  const sendOTP = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      
      setCorrectOtp(data.code);
      toast.success(`Verification code sent to ${email}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP dispatch failed');
      toast.error("Critical error in identity validation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Verify OTP locally
    const enteredOtp = otp.join('');
    if (enteredOtp !== correctOtp) {
      setError('Invalid identity code. Please check your institutional email.');
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, we would verify OTP and upload document here
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Enrollment failed');

      setStep('SUCCESS');
      setTimeout(() => {
        router.push('/login?msg=success');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected protocol error occurred');
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
            <ShieldCheck size={24} className="text-black" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Institutional <br />
            Enrollment.
          </h2>
          <p className="text-white/40 max-w-sm leading-relaxed">
            Register your institution to the global trust network. Every entity is validated for authenticity before enrollment.
          </p>
        </div>

        <div className="z-10 text-white/20 text-[10px] font-bold uppercase tracking-widest">
          Step {step === 'IDENTITY' ? '1' : step === 'DOCUMENTS' ? '2' : '3'} of 3
        </div>
      </div>

      {/* Right: Signup Flow */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-12">
          <AnimatePresence mode="wait">
            {step === 'IDENTITY' && (
              <motion.div
                key="identity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-black tracking-tight">
                    Establish <span className="bg-lime px-2 py-0.5 rounded-sm">Identity</span>
                  </h1>
                  <p className="text-black/40 font-medium text-sm uppercase tracking-widest">Stage 1: Basic Information</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/30 ml-1">Authorized Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.03] border border-transparent focus:border-black/10 focus:bg-white transition-all text-sm font-semibold text-black outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/30 ml-1">Work Protocol (Email)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 w-4 h-4" />
                      <input
                        type="email"
                        placeholder="admin@university.edu"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.03] border border-transparent focus:border-black/10 focus:bg-white transition-all text-sm font-semibold text-black outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/30 ml-1">Secured Key (Password)</label>
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
                  <div className="p-4 rounded-2xl bg-red-50 text-red-500 text-xs font-semibold flex items-center gap-3">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <Button
                  onClick={handleNextStep}
                  className="w-full h-14 rounded-2xl font-bold text-sm bg-black text-white hover:bg-black/90 shadow-xl shadow-black/10 transition-all flex items-center justify-center gap-2"
                >
                  Continue to Validation
                </Button>
              </motion.div>
            )}

            {step === 'DOCUMENTS' && (
              <motion.div
                key="documents"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <button onClick={() => setStep('IDENTITY')} className="text-black/40 hover:text-black transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <h1 className="text-4xl font-bold text-black tracking-tight">
                    Institutional <span className="bg-lime px-2 py-0.5 rounded-sm">Validation</span>
                  </h1>
                  <p className="text-black/40 font-medium text-sm uppercase tracking-widest">Stage 2: Official Documentation</p>
                </div>

                <div className="space-y-6">
                  <p className="text-sm text-black/60 leading-relaxed">
                    Please upload a valid document (Institutional ID, Government License, or Authorization Letter) to verify your entity.
                  </p>

                  <div
                    className={cn(
                      "w-full h-48 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all cursor-pointer overflow-hidden relative",
                      uploadedFile ? "border-black bg-black/5" : "border-black/10 hover:border-black/30 bg-black/[0.01]"
                    )}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    {uploadedFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center">
                          <CheckCircle2 size={20} />
                        </div>
                        <p className="text-sm font-bold truncate max-w-[200px]">{uploadedFile.name}</p>
                        <span className="text-[10px] text-black/40 uppercase tracking-widest">Click to replace</span>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center">
                          <Upload size={24} className="text-black/40" />
                        </div>
                        <span className="text-sm font-bold text-black/40 uppercase tracking-widest">Upload Document</span>
                      </>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 rounded-2xl bg-red-50 text-red-500 text-xs font-semibold flex items-center gap-3">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <Button
                  onClick={handleNextStep}
                  className="w-full h-14 rounded-2xl font-bold text-sm bg-black text-white hover:bg-black/90 shadow-xl shadow-black/10 transition-all"
                >
                  Verify via Email
                </Button>
              </motion.div>
            )}

            {step === 'OTP' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-black tracking-tight">
                    Verify <span className="bg-lime px-2 py-0.5 rounded-sm">Code</span>
                  </h1>
                  <p className="text-black/40 font-medium text-sm leading-relaxed">
                    We've sent a 6-digit verification code to <span className="text-black font-bold">{email}</span>. Please enter it below.
                  </p>
                </div>

                <div className="flex justify-between gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      className="w-12 h-16 md:w-14 md:h-16 rounded-2xl bg-black/[0.03] border-2 border-transparent focus:border-lime focus:bg-white text-center text-xl font-bold text-black transition-all outline-none"
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                    />
                  ))}
                </div>

                <div className="text-center space-y-4">
                  <p className="text-xs font-bold text-black/30 uppercase tracking-widest">
                    Didn't receive the code?
                    <button onClick={sendOTP} className="ml-2 text-black hover:underline underline-offset-4">Resend</button>
                  </p>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full h-14 rounded-2xl font-bold text-sm bg-black text-white hover:bg-black/90 shadow-xl shadow-black/10 transition-all flex items-center justify-center gap-2"
                  disabled={isLoading || otp.some(d => !d)}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <><KeyRound size={18} /> Finalize Enrollment</>}
                </Button>
              </motion.div>
            )}

            {step === 'SUCCESS' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-24 h-24 bg-lime rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-lime/20">
                  <CheckCircle2 size={48} className="text-black" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-black tracking-tight">Identity Established.</h1>
                  <p className="text-black/40 font-medium">Your institution is now being audited. Redirecting to login...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center pt-8">
            <p className="text-sm font-medium text-black/40">
              Already a partner? {' '}
              <Link href="/login" className="text-black font-bold hover:underline underline-offset-4 ml-1">
                Authorized Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
