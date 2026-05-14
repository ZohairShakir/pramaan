'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Loader2, CheckCircle2, X, 
  RotateCcw, Sparkles, FileText, Zap, Shield, Search, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { scanDocument } from '@/lib/ocr';
import { Logo } from '@/components/Logo';

interface OCRScannerProps {
  onScanComplete: (data: { issuer?: string; recipient?: string; documentId?: string; rawText: string }) => void;
  onClose: () => void;
}

export default function OCRScanner({ onScanComplete, onClose }: OCRScannerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('');
  const [extractedData, setExtractedData] = useState<{ issuer?: string; recipient?: string; documentId?: string; rawText: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setImage(dataUrl);
        stopCamera();
        processImage(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImage(dataUrl);
        processImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (dataUrl: string) => {
    setIsProcessing(true);
    setProgress(0);
    setStatus('Initializing Neural Engine...');

    try {
      const result = await scanDocument(dataUrl);
      
      const idPattern = /(pr_[a-z0-9]+|[a-f0-9]{32,64})/i;
      const idMatch = result.rawText.match(idPattern);
      const documentId = idMatch ? idMatch[0] : '';

      setExtractedData({ ...result, documentId });
      setStatus('Scan Complete');
    } catch (err) {
      console.error('OCR Error:', err);
      setStatus('Scanning Failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-5xl bg-white rounded-[4rem] shadow-[0_100px_150px_-50px_rgba(0,0,0,0.3)] border border-black/5 overflow-hidden relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-10 border-b border-black/5 bg-[#F2E6E1]/30">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-black text-lime flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight uppercase">Spectral Scanner</h2>
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.4em]">AI-Powered OCR Node v2.1</p>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full hover:bg-black/5 flex items-center justify-center text-black/40 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Viewport */}
          <div className="relative aspect-[4/5] bg-black/[0.02] rounded-[3rem] border-2 border-dashed border-black/5 overflow-hidden flex items-center justify-center group shadow-inner">
            {showCamera ? (
              <div className="absolute inset-0">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-[60px] border-black/40 pointer-events-none">
                   <div className="w-full h-full border-2 border-white/50 rounded-[2rem] relative">
                      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-lime rounded-tl-3xl" />
                      <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-lime rounded-tr-3xl" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-lime rounded-bl-3xl" />
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-lime rounded-br-3xl" />
                   </div>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                  <button className="rounded-2xl bg-black text-white h-16 px-10 font-bold text-sm shadow-2xl" onClick={capturePhoto}>
                    Capture Record
                  </button>
                  <button className="h-16 w-16 rounded-2xl bg-white text-black border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all" onClick={stopCamera}>
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : image ? (
              <div className="relative w-full h-full">
                <img src={image} alt="Scanned Record" className="w-full h-full object-cover" />
                
                {isProcessing && (
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1.5 bg-lime shadow-[0_0_30px_rgba(202,255,0,0.5)] z-10"
                  />
                )}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-xs flex items-center gap-2" onClick={() => { setImage(null); setExtractedData(null); }}>
                    <RotateCcw size={16} /> Retake Genesis
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8 text-center px-12">
                <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center text-black/10">
                  <FileText size={48} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold tracking-tight uppercase">Awaiting Sensor</h3>
                  <p className="text-[10px] text-black/30 uppercase tracking-[0.3em] leading-relaxed">Position your physical asset <br />within the cryptographic bounds</p>
                </div>
                <div className="flex gap-4">
                  <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-xl shadow-black/10 hover:scale-105 transition-transform" onClick={startCamera}>
                    <Camera size={16} /> Open Sensor
                  </button>
                  <button className="bg-white text-black border border-black/10 px-8 py-4 rounded-2xl font-bold text-xs flex items-center gap-2 hover:bg-black hover:text-white transition-all" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={16} /> Upload Image
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Right: Analysis */}
          <div className="flex flex-col h-full space-y-10">
            <div className="flex-1 space-y-10">
              {isProcessing ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="relative">
                    <Loader2 className="w-20 h-20 animate-spin text-lime opacity-30" />
                    <Logo size={40} className="absolute inset-0 m-auto" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xl font-bold uppercase tracking-widest">{status}</p>
                    <div className="w-56 h-1 bg-black/5 rounded-full overflow-hidden mx-auto">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `100%` }}
                        transition={{ duration: 5 }}
                        className="h-full bg-black"
                      />
                    </div>
                  </div>
                </div>
              ) : extractedData ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-10"
                >
                  <div className="p-8 rounded-[2.5rem] bg-[#F2E6E1]/30 border border-black/5 space-y-6">
                    <div className="flex items-center gap-3 text-black">
                      <Zap size={16} className="text-lime" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em]">AI Intelligence Node</span>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black/30 uppercase tracking-widest ml-1">Suggested Issuer</label>
                        <div className="p-5 rounded-2xl bg-white border border-black/5 text-sm font-bold text-black truncate italic">
                          {extractedData.issuer || 'Undetermined Entity'}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black/30 uppercase tracking-widest ml-1">Detected Recipient</label>
                        <div className="p-5 rounded-2xl bg-white border border-black/5 text-sm font-bold text-black truncate italic">
                          {extractedData.recipient || 'Undetermined Subject'}
                        </div>
                      </div>
                      {extractedData.documentId && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-black/30 uppercase tracking-widest ml-1">Registry ID Match</label>
                          <div className="p-5 rounded-2xl bg-black text-white text-xs font-mono truncate tracking-widest">
                            #{extractedData.documentId.toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Search size={14} className="text-black/30" />
                        <label className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Raw Spectral Data</label>
                    </div>
                    <div className="h-48 overflow-y-auto p-6 rounded-3xl bg-black text-white/40 text-[11px] font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                      {extractedData.rawText}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 text-black/20">
                  <Shield size={64} className="opacity-[0.03]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em]">Awaiting Spectral Analysis</p>
                </div>
              )}
            </div>

            <div className="pt-10 border-t border-black/5">
              <button 
                className="w-full h-20 rounded-[1.5rem] bg-black text-white font-bold text-lg hover:bg-black/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xl flex items-center justify-center gap-4 group"
                disabled={!extractedData || isProcessing}
                onClick={() => extractedData && onScanComplete(extractedData as any)}
              >
                <CheckCircle2 size={24} className="text-lime" />
                <span className="tracking-tight">Inject into Registry</span>
              </button>
              <p className="text-center mt-6 text-[10px] font-bold text-black/20 uppercase tracking-widest flex items-center justify-center gap-3">
                  <Lock size={12} />
                  ZK-Encrypted Channel
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
