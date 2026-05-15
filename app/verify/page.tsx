'use client';

import { useRef, useState } from 'react';
import { FooterV2 as Footer } from '@/components/Landing/FooterV2';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { generateHash } from '@/lib/crypto';
import OCRScanner from '@/components/OCRScanner';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  Upload, 
  Camera, 
  Search, 
  ArrowRight, 
  Lock, 
  Shield, 
  Zap,
  Globe,
  Fingerprint,
  Cpu,
  History,
  Scale,
  X
} from 'lucide-react';

export default function VerifyInputPage() {
  const [verifyId, setVerifyId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleVerifyFile = async (file: File) => {
    setIsVerifying(true);
    setVerifyError(null);

    try {
      const hash = await generateHash(file);
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash }),
      });

      const data = await response.json();
      if (!response.ok || !data.found) {
        throw new Error(data.message || 'Document fingerprint not recognized in the global registry.');
      }
      window.location.href = `/verify/${data.document.id}`;
    } catch (err) {
      setVerifyError(err instanceof Error ? err.message : 'Verification failed');
      setIsVerifying(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      e.target.value = '';
      handleVerifyFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black relative overflow-hidden">
      <Navbar />
      
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F2E6E1]/30 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-lime/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <main className="pt-32 md:pt-48 pb-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="space-y-8 max-w-3xl">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-widest text-black/50"
                >
                    <Globe size={12} />
                    Global Check System v2.4
                </motion.div>
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.8] uppercase">
                    Check if it's <br />
                    <span className="bg-lime px-4 py-2 rounded-sm inline-block mt-4 md:mt-8">Real.</span>
                </h1>
                <p className="text-base md:text-xl text-black/40 font-medium leading-relaxed max-w-xl">
                    Check if any document is real in seconds. Pramaan makes trust simple and safe for everyone.
                </p>
            </div>
            

          </div>

          {/* Interaction Hub */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-stretch">
            {/* Upload Zone (The Sensor Pad) */}
            <div className="lg:col-span-8">
                <div 
                    className={cn(
                        "relative group w-full rounded-[2.5rem] md:rounded-[4.5rem] border-2 border-dashed flex flex-col items-center justify-center py-16 md:py-24 px-8 md:px-12 text-center transition-all duration-700",
                        isDragging ? "border-black bg-black/5 scale-[1.01]" : "border-black/5 bg-[#F8F8F8]",
                        isVerifying ? "pointer-events-none" : ""
                    )}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files?.[0]; if (file) handleVerifyFile(file); }}
                >
                    {isVerifying ? (
                        <div className="space-y-12">
                            <div className="relative">
                                <Loader2 className="w-24 h-24 text-black animate-spin mx-auto opacity-5" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Logo size={80} className="animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-4xl font-bold tracking-tight uppercase">Spectral Scan...</h3>
                                <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-black/20">Cryptographic Finality Check</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12 relative z-10 w-full max-w-lg">
                            <div className="space-y-8">
                                <div className="w-28 h-28 rounded-[2.5rem] bg-black text-white flex items-center justify-center mx-auto shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                                    <Upload size={40} className="text-lime" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Sensor Pad</h3>
                                    <p className="text-sm md:text-base font-medium text-black/40 leading-relaxed max-w-sm mx-auto px-4">
                                        Drop your digital record here to verify against the immutable genesis ledger.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 w-full">
                                <button onClick={() => fileInputRef.current?.click()} className="flex-1 rounded-2xl bg-black text-white h-16 text-sm font-bold hover:bg-black/90 transition-all shadow-2xl shadow-black/20 flex items-center justify-center gap-2">
                                    <Upload size={20} />
                                    <span className="hidden sm:inline">Select Record</span>
                                </button>
                                <button 
                                    onClick={() => setShowScanner(true)} 
                                    className="flex-1 rounded-2xl bg-white border border-black/10 hover:bg-black hover:text-lime flex items-center justify-center transition-all group/cam gap-2"
                                >
                                    <Camera size={20} className="transition-transform group-hover/cam:scale-110" />
                                    <span className="hidden sm:inline">Use Camera</span>
                                </button>
                            </div>

                            <p className="text-[10px] font-bold text-black/20 uppercase tracking-[0.4em]">
                                Privacy First: Local Hash Generation Only
                            </p>

                            {/* Error State - Now in Flow */}
                            <AnimatePresence>
                                {verifyError && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="w-full flex items-center gap-4 p-6 rounded-3xl bg-red-50 text-red-500 text-xs font-bold border border-red-100 overflow-hidden"
                                >
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <div className="text-left">
                                        <p className="text-black/60">{verifyError}</p>
                                    </div>
                                    <button onClick={() => setVerifyError(null)} className="ml-auto text-black/20 hover:text-black">
                                        <X size={14} />
                                    </button>
                                </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Hub */}
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-[#F2E6E1] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 space-y-8 md:space-y-12 border border-black/5 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                            <Search size={28} className="text-black/30" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-3xl font-bold tracking-tight uppercase">Audit by ID</h4>
                            <p className="text-sm text-black/40 font-medium leading-relaxed">Search via registry ID or transaction hash.</p>
                        </div>
                    </div>
                    
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="PR_0X7D..." 
                            className="w-full pl-8 pr-20 py-8 rounded-2xl bg-white border border-black/5 focus:border-black/20 transition-all text-sm font-bold text-black placeholder:text-black/10 outline-none shadow-sm"
                            value={verifyId}
                            onChange={(e) => setVerifyId(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && verifyId && (window.location.href = `/verify/${verifyId}`)}
                        />
                        <button 
                            onClick={() => verifyId && (window.location.href = `/verify/${verifyId}`)}
                            className={cn(
                                "absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-xl flex items-center justify-center transition-all",
                                verifyId ? "bg-black text-white shadow-2xl" : "bg-black/5 text-black/10"
                            )}
                        >
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="bg-black rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 space-y-8 text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-lime/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 space-y-6">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                            <Scale size={28} className="text-lime" />
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-2xl font-bold uppercase tracking-tight">Legal Integrity</h4>
                            <p className="text-sm text-white/40 leading-relaxed font-medium">
                                Every audit provides a tamper-proof certificate recognized by institutional governance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Infrastructure Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 pt-32 border-t border-black/5">
            {[
              { icon: <History className="text-black" size={28} />, title: 'Full Traceability', desc: 'Every verification attempt is logged in the document history for institutional auditing.' },
              { icon: <Lock className="text-black" size={28} />, title: 'Privacy Shield', desc: 'We only process document hashes locally. Your sensitive data never reaches our servers.' },
              { icon: <Zap className="text-black" size={28} />, title: 'Genesis Speed', desc: 'Audit records against the global registry with sub-second cryptographic response.' }
            ].map((f, i) => (
              <div key={i} className="space-y-8 group">
                <div className="w-16 h-16 rounded-3xl bg-[#F8F8F8] border border-black/5 flex items-center justify-center group-hover:bg-lime group-hover:scale-110 transition-all duration-700">
                  {f.icon}
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">{f.title}</h4>
                  <p className="text-sm md:text-base font-medium text-black/40 leading-relaxed italic">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.docx,.jpg,.png" />
      
      <AnimatePresence>
        {showScanner && (
          <OCRScanner 
            onScanComplete={(data) => {
              if (data.documentId) {
                setVerifyId(data.documentId);
                window.location.href = `/verify/${data.documentId}`;
              } else {
                setVerifyError('No document ID detected in the scan.');
              }
              setShowScanner(false);
            }}
            onClose={() => setShowScanner(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
