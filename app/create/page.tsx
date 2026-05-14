'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { FooterV2 as Footer } from '@/components/Landing/FooterV2';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { 
  ShieldCheck, Upload, Camera, FileText, CheckCircle2, 
  Loader2, ArrowRight, Hash, User, Building, QrCode, 
  Download, RotateCcw, AlertCircle, Eye, Zap, 
  Fingerprint as FingerIcon, Globe, Sparkles, Lock,
  Share2, Mail
} from 'lucide-react';
import QRSection from '@/components/QRSection';
import DocumentPreviewWrapper from '@/components/DocumentPreviewWrapper';
import { cn } from '@/lib/utils';
import { generateHash } from '@/lib/crypto';
import OCRScanner from '@/components/OCRScanner';
import { scanDocument, fuzzyMatch } from '@/lib/ocr';
import { Logo } from '@/components/Logo';

export default function CreateProofPage() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issuerOrg, setIssuerOrg] = useState('');
  const [recipient, setRecipient] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [category, setCategory] = useState('Education');

  useEffect(() => {
    if (session?.user) {
      const org = (session.user as any).organizationName || session.user.name || '';
      setIssuerOrg(org);
    }
  }, [session]);
  
  const [proof, setProof] = useState<{
    id: string;
    hash: string;
    date: string;
    verificationUrl: string;
    name: string;
    issuerOrg?: string;
  } | null>(null);

  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrData, setOcrData] = useState<{ recipient?: string; issuer?: string } | null>(null);
  const [nameMatch, setNameMatch] = useState<boolean | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError(null);
      setOcrData(null);
      setNameMatch(null);

      // Auto-OCR if it's an image
      if (selectedFile.type.startsWith('image/')) {
        setOcrLoading(true);
        try {
          const result = await scanDocument(selectedFile);
          setOcrData(result);
          if (result.recipient) {
            setRecipient(result.recipient);
            setNameMatch(true);
          }
          if (result.issuer && !issuerOrg) {
            setIssuerOrg(result.issuer);
          }
        } catch (err) {
          console.error('Auto-OCR failed:', err);
        } finally {
          setOcrLoading(false);
        }
      }
    }
  };

  const previewFile = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const handleGenerate = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const clientHash = await generateHash(file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('hash', clientHash);
      formData.append('category', category);
      if (issuerOrg) formData.append('issuerOrg', issuerOrg);
      if (recipient) formData.append('recipientName', recipient);
      if (recipientEmail) formData.append('recipientEmail', recipientEmail);

      const response = await fetch('/api/proof', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Protocol failed to anchor document');

      setProof({
        id: data.id,
        hash: data.hash,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        verificationUrl: `${window.location.origin}/verify/${data.id}`,
        name: file.name,
        issuerOrg: issuerOrg,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setProof(null);
    setFile(null);
    setIssuerOrg('');
    setRecipient('');
    setRecipientEmail('');
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black relative overflow-hidden">
      <Navbar />
      
       <main className="pt-20 md:pt-32 pb-16 md:pb-24 px-4 relative z-10">
        <AnimatePresence mode="wait">
          {!proof ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-7xl mx-auto space-y-24"
            >
              {/* Minimalist Hero */}
              <div className="text-left space-y-8 max-w-4xl">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-widest text-black/50"
                >
                  <Globe size={12} className="animate-pulse" />
                  Registry Issuance v2.1
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
                >
                  Anchor <br /><span className="bg-lime px-4 py-1 rounded-sm inline-block mt-2 md:mt-4">Genesis.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-black/40 font-medium leading-relaxed max-w-2xl"
                >
                  Imprint an immutable cryptographic proof into the global registry. 
                  Permanent, verifiable, and institutional-grade document anchoring.
                </motion.p>
              </div>

              {/* Action Hub */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                <div className="lg:col-span-7">
                    <div 
                    className={cn(
                        "relative group min-h-[400px] md:min-h-[500px] rounded-[3.5rem] border-2 border-dashed flex flex-col items-center justify-center p-8 md:p-12 text-center transition-all duration-700 overflow-hidden bg-[#F8F8F8]",
                        file ? "border-black bg-white scale-[1.01]" : "border-black/10 hover:border-black/30"
                    )}
                    onClick={() => !file && fileInputRef.current?.click()}
                    >
                    {!file ? (
                        <div className="space-y-10 relative z-10">
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-20 h-20 rounded-3xl bg-black text-white flex items-center justify-center shadow-2xl transform group-hover:-rotate-6 transition-transform duration-500">
                                    <Upload size={32} />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-bold tracking-tight">Drop Document</h3>
                                    <p className="text-sm font-medium text-black/40 max-w-xs mx-auto leading-relaxed">
                                        Verify document integrity instantly without revealing sensitive content.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <button className="rounded-2xl bg-black text-white px-10 h-14 text-sm font-bold hover:bg-black/90 transition-all shadow-xl shadow-black/10">
                                    Browse Files
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setShowScanner(true); }}
                                    className="rounded-2xl bg-white border border-black/10 hover:bg-black/5 text-black h-14 w-14 flex items-center justify-center transition-all"
                                >
                                    <Camera size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-8 w-full animate-in fade-in zoom-in duration-500">
                            <div className="w-32 h-44 bg-white rounded-2xl shadow-2xl overflow-hidden border border-black/5 relative group/preview">
                                <DocumentPreviewWrapper fileUrl={previewFile || ''} fileName={file.name} mimeType={file.type} />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                                        <RotateCcw size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="text-center space-y-3">
                                <p className="text-xl font-bold text-black truncate max-w-xs">{file.name}</p>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2E6E1] text-black text-[10px] font-bold uppercase tracking-widest">
                                    {(file.size / 1024).toFixed(1)} KB • READY
                                </div>
                            </div>
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.docx,.jpg,.png,.txt" />
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-[#F8F8F8] rounded-[2.5rem] p-10 space-y-8 border border-black/5">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-2">Issuing Body</label>
                                <div className="relative group">
                                    <Building size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
                                    <input 
                                        type="text" 
                                        placeholder="Institution Name" 
                                        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white border border-black/5 focus:border-black/20 transition-all text-sm font-bold text-black placeholder:text-black/10 outline-none"
                                        value={issuerOrg}
                                        onChange={(e) => setIssuerOrg(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-2">Authorized Subject</label>
                                <div className="relative group">
                                    <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
                                    <input 
                                        type="text" 
                                        placeholder="Recipient Name" 
                                        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white border border-black/5 focus:border-black/20 transition-all text-sm font-bold text-black placeholder:text-black/10 outline-none"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-2">Recipient Email (Delivery Path)</label>
                                <div className="relative group">
                                    <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
                                    <input 
                                        type="email" 
                                        placeholder="name@example.com" 
                                        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white border border-black/5 focus:border-black/20 transition-all text-sm font-bold text-black placeholder:text-black/10 outline-none"
                                        value={recipientEmail}
                                        onChange={(e) => setRecipientEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-2">Registry Category</label>
                            <div className="flex flex-wrap gap-2">
                                {['Education', 'Corporate', 'Government', 'Legal'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={cn(
                                            "px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                                            category === cat 
                                                ? "bg-black text-white border-black" 
                                                : "bg-white text-black/30 border-black/5 hover:border-black/20"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            className="w-full h-20 rounded-[2rem] bg-black text-white text-lg font-bold shadow-2xl shadow-black/10 hover:bg-black/90 transition-all disabled:opacity-20 disabled:pointer-events-none"
                            disabled={!file || isProcessing}
                            onClick={handleGenerate}
                        >
                            {isProcessing ? (
                                <div className="flex items-center justify-center gap-4">
                                    <Loader2 className="animate-spin text-lime" />
                                    <span>Settling on Chain...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-3">
                                    <span>Anchor Proof</span>
                                    <ArrowRight size={20} />
                                </div>
                            )}
                        </button>
                    </div>

                    <div className="bg-black rounded-[2.5rem] p-10 text-white space-y-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <Lock size={20} className="text-lime" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold">Protocol Security</h4>
                            <p className="text-sm text-white/40 leading-relaxed font-medium">
                                Proofs are cryptographically linked to your institutional DID. Any tampering results in immediate invalidation.
                            </p>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="max-w-6xl mx-auto space-y-12"
            >
              <div className="bg-white rounded-[4rem] border border-black/5 overflow-hidden shadow-2xl">
                {/* Header Banner - Ceremonial Settle */}
                <div className="bg-[#F2E6E1] p-20 md:p-40 text-center space-y-12 relative overflow-hidden">
                    <motion.div 
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="w-28 h-28 md:w-40 md:h-40 rounded-[3rem] bg-white flex items-center justify-center text-black mx-auto shadow-3xl relative z-10"
                    >
                        <ShieldCheck size={80} className="text-[#3D541D]" />
                    </motion.div>
                    <div className="space-y-8 relative z-10">
                        <h1 className="text-7xl md:text-[10rem] font-bold tracking-tight uppercase leading-[0.8]">
                            Proof <br /><span className="bg-white px-6 py-2 rounded-sm text-black inline-block mt-6">Settled.</span>
                        </h1>
                        <p className="text-black/30 font-bold text-xs md:text-base uppercase tracking-[0.6em] flex items-center justify-center gap-6">
                            <span className="w-12 h-px bg-black/10" />
                            Registry Genesis Successful
                            <span className="w-12 h-px bg-black/10" />
                        </p>
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3D541D10,transparent_70%)] pointer-events-none" />
                    <Logo size={300} className="absolute -bottom-20 -right-20 opacity-[0.03] rotate-12" />
                </div>

                <div className="p-12 md:p-24 space-y-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                        {/* Visual Registry Section */}
                        <div className="lg:col-span-5 space-y-10">
                            <div className="p-12 bg-[#F8F8F8] rounded-[4rem] border border-black/5 flex items-center justify-center group relative overflow-hidden aspect-square">
                                <QRSection url={proof.verificationUrl} size={320} hideDescription={true} className="relative z-10 scale-110" />
                                <div className="absolute inset-0 bg-white/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center z-20">
                                    <div className="text-center space-y-8">
                                        <div className="w-24 h-24 bg-black rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl">
                                            <Logo size={80} />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold uppercase tracking-widest text-black">Registry Access QR</p>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">Point to Verify</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Settlement Layer</p>
                                    <p className="text-sm font-bold flex items-center gap-2">
                                        <Globe size={14} className="text-[#3D541D]" />
                                        Polygon Mainnet
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Network Speed</p>
                                    <p className="text-sm font-bold flex items-center justify-end gap-2 text-[#3D541D]">
                                        <Zap size={14} />
                                        2.1s Finality
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Record Metadata Hub */}
                        <div className="lg:col-span-7 space-y-16">
                            <div className="grid grid-cols-1 gap-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-lime text-black text-[10px] font-bold uppercase tracking-widest rounded-full">Genesis Proof</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 tracking-[0.2em]">Registry Identity</span>
                                    </div>
                                    <p className="text-5xl md:text-7xl font-bold tracking-tighter">#{proof.id.toUpperCase()}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-black/5">
                                    <div className="space-y-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Issuing Authority</span>
                                        <p className="text-2xl font-bold">{proof.issuerOrg || 'Institutional Node'}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Certified Recipient</span>
                                        <p className="text-2xl font-bold">{proof.name || recipient || 'Public Record'}</p>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-12 border-t border-black/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Cryptographic Signature</span>
                                        <FingerIcon size={16} className="text-[#3D541D]" />
                                    </div>
                                    <div className="bg-black/[0.03] p-10 rounded-[2.5rem] relative overflow-hidden group border border-black/5">
                                        <code className="block font-mono text-[11px] break-all text-black/40 leading-relaxed relative z-10">
                                            {proof.hash}
                                        </code>
                                        <div className="absolute inset-0 bg-lime/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href={`/verify/${proof.id}`} className="flex-1 flex items-center justify-center gap-4 bg-black text-white h-20 rounded-[1.5rem] font-bold text-lg hover:bg-black/90 transition-all shadow-2xl shadow-black/20">
                                    <Eye size={20} />
                                    Explore Entry
                                </Link>
                                <button className="h-20 px-10 flex items-center justify-center gap-3 bg-[#F8F8F8] border border-black/5 rounded-[1.5rem] text-black hover:bg-black hover:text-white transition-all font-bold">
                                    <Share2 size={20} />
                                    Share Proof
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Protocols */}
                    <div className="pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-6 text-black/30 text-[11px] font-bold uppercase tracking-[0.3em]">
                            <div className="flex items-center gap-2">
                                <Lock size={14} className="text-lime" />
                                ZK-Hash v2.1
                            </div>
                            <div className="w-1 h-1 rounded-full bg-black/10" />
                            Secured by Polygon
                        </div>
                        <button onClick={resetForm} className="flex items-center gap-4 text-black hover:text-[#3D541D] transition-colors font-bold text-sm uppercase tracking-[0.2em] group">
                            <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                            Anchor New Proof
                        </button>
                    </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      
      <AnimatePresence>
        {showScanner && (
          <OCRScanner 
            onScanComplete={(data) => {
              if (data.issuer) setIssuerOrg(data.issuer);
              if (data.recipient) setRecipient(data.recipient);
              setShowScanner(false);
            }}
            onClose={() => setShowScanner(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}