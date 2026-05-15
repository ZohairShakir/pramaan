'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Loader2, CheckCircle2, X, 
  RotateCcw, Sparkles, FileText, Zap, Shield, Search, Lock, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { scanDocument, enhanceImage } from '@/lib/ocr';
import { Logo } from '@/components/Logo';
import jsQR from 'jsqr';

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

  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      setShowCamera(true);
    } catch (err) {
      console.error('Camera error:', err);
      setStatus('Camera access denied');
    }
  };

  useEffect(() => {
    if (showCamera && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [showCamera, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  // Continuous Live QR Scanning
  useEffect(() => {
    let animationFrameId: number;
    
    const scanFrame = () => {
      if (showCamera && videoRef.current && canvasRef.current && !isProcessing && !extractedData) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        if (ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          
          if (code) {
            console.log("[SCANNER] Live QR Detected:", code.data);
            stopCamera();
            processImage(canvas.toDataURL('image/png'));
            return; // Exit loop
          }
        }
      }
      animationFrameId = requestAnimationFrame(scanFrame);
    };

    if (showCamera) {
      animationFrameId = requestAnimationFrame(scanFrame);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [showCamera, isProcessing, extractedData]);

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
      // 1. Pre-process image for better accuracy
      let processedUrl = dataUrl;
      if (canvasRef.current) {
        processedUrl = await enhanceImage(canvasRef.current);
        setImage(processedUrl);
      }

      // 2. High-speed QR Check (Gold Standard)
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setStatus('Found Signature QR...');
            const url = code.data;
            // Extract ID from URL if it's a verify link
            const idMatch = url.match(/\/verify\/([a-z0-9-]+)/i);
            const documentId = idMatch ? idMatch[1] : url;
            
            setExtractedData({ 
                rawText: `QR_DATA: ${url}`, 
                documentId: documentId,
                issuer: 'QR Verified Authority'
            });
            setStatus('Scan Complete');
            setIsProcessing(false);
            return;
          }
        }
      }

      // 3. Spectral OCR Fallback
      setStatus('Analyzing Spectral Data...');
      const result = await scanDocument(processedUrl);
      
      setExtractedData(result);
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
      className="fixed inset-0 z-[100] bg-black flex flex-col overflow-hidden"
    >
      {/* Top Header Controls */}
      <div className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-4 text-white">
          <div className="w-10 h-10 rounded-xl bg-lime text-black flex items-center justify-center shadow-2xl">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight uppercase leading-none">Spectral Scanner</h2>
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em] mt-1">AI Node v2.4</p>
          </div>
        </div>
        
        <button 
          onClick={onClose} 
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
        >
          <X size={24} />
        </button>
      </div>

      <div className="relative flex-1 flex flex-col">
        {/* Viewport Area */}
        <div className="absolute inset-0 flex items-center justify-center">
          {showCamera ? (
            <div className="relative w-full h-full">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              
              {/* Target Frame Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-[85vw] h-[60vh] md:w-[600px] md:h-[400px] border-2 border-white/20 rounded-[2rem] relative">
                    <div className="absolute -top-1 -left-1 w-16 h-16 border-t-8 border-l-8 border-lime rounded-tl-[2rem]" />
                    <div className="absolute -top-1 -right-1 w-16 h-16 border-t-8 border-r-8 border-lime rounded-tr-[2rem]" />
                    <div className="absolute -bottom-1 -left-1 w-16 h-16 border-b-8 border-l-8 border-lime rounded-bl-[2rem]" />
                    <div className="absolute -bottom-1 -right-1 w-16 h-16 border-b-8 border-r-8 border-lime rounded-br-[2rem]" />
                    
                    {/* Scanning Line */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-4 right-4 h-1 bg-lime/40 blur-sm z-10"
                    />
                 </div>
              </div>
            </div>
          ) : image ? (
            <div className="w-full h-full relative">
              <img src={image} alt="Scanned Record" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-10 text-center px-12 z-10">
              <div className="w-24 h-24 rounded-[3rem] bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/20">
                <FileText size={40} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight uppercase text-white">Awaiting Genesis</h3>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] leading-relaxed">Position asset within the <br />cryptographic bounds</p>
              </div>
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <button className="bg-lime text-black h-20 rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-lime/20" onClick={startCamera}>
                  <Camera size={24} /> Initialize Lens
                </button>
                <button className="bg-white/5 backdrop-blur-md text-white h-20 rounded-[1.5rem] font-bold text-sm border border-white/10" onClick={() => fileInputRef.current?.click()}>
                  Upload Record
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
              </div>
            </div>
          )}
        </div>

        {/* Action Bar (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-12 flex flex-col items-center z-50">
           {showCamera && (
             <div className="flex flex-col items-center gap-8">
               <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">Stabilize to Capture</div>
               <button 
                 onClick={capturePhoto}
                 className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)] border-[8px] border-white/20 active:scale-90 transition-all group"
               >
                 <div className="w-16 h-16 rounded-full bg-black group-hover:scale-95 transition-transform" />
               </button>
             </div>
           )}

           {image && !isProcessing && !extractedData && (
              <div className="flex gap-4">
                 <button className="bg-white text-black h-16 px-10 rounded-2xl font-bold" onClick={() => { setImage(null); startCamera(); }}>
                    Retake
                 </button>
                 <button className="bg-lime text-black h-16 px-10 rounded-2xl font-bold" onClick={() => processImage(image)}>
                    Analyze
                 </button>
              </div>
           )}

           {isProcessing && (
              <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-10">
                 <div className="flex items-center gap-6">
                    <Loader2 className="w-10 h-10 animate-spin text-lime" />
                    <div>
                       <p className="text-white font-bold text-lg uppercase tracking-tight">{status}</p>
                       <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em] mt-1">Spectral Audit in Progress</p>
                    </div>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5 }}
                      className="h-full bg-lime shadow-[0_0_15px_rgba(202,255,0,0.5)]"
                    />
                 </div>
              </div>
           )}

           {extractedData && !isProcessing && (
              <div className="bg-white rounded-[3rem] p-10 w-full max-w-2xl space-y-10 animate-in fade-in slide-in-from-bottom-20 shadow-2xl">
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <h4 className="text-2xl font-bold tracking-tight text-black uppercase">Analysis Success</h4>
                       <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.4em]">Neural Extraction Complete</p>
                    </div>
                    <button onClick={() => { setImage(null); setExtractedData(null); startCamera(); }} className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-black">
                       <RotateCcw size={20} />
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[9px] font-bold text-black/30 uppercase tracking-widest ml-1">Issuer</label>
                       <div className="p-5 rounded-2xl bg-[#F8F8F8] border border-black/5 text-sm font-bold text-black truncate">
                          {extractedData.issuer || 'Unknown Authority'}
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-bold text-black/30 uppercase tracking-widest ml-1">Recipient</label>
                       <div className="p-5 rounded-2xl bg-[#F8F8F8] border border-black/5 text-sm font-bold text-black truncate">
                          {extractedData.recipient || 'Public Record'}
                       </div>
                    </div>
                 </div>

                 {extractedData.documentId && (
                   <div className="p-6 rounded-[1.5rem] bg-black text-white flex items-center justify-between">
                      <div>
                         <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Registry ID Match</p>
                         <p className="text-sm font-mono tracking-widest mt-1">#{extractedData.documentId.toUpperCase()}</p>
                      </div>
                      <ShieldCheck size={24} className="text-lime" />
                   </div>
                 )}

                 <button 
                   onClick={() => onScanComplete(extractedData as any)}
                   className="w-full h-20 bg-lime text-black rounded-[1.5rem] font-bold text-lg shadow-2xl shadow-lime/20 flex items-center justify-center gap-4 hover:scale-[1.02] transition-transform"
                 >
                   <CheckCircle2 size={24} />
                   Inject into Registry
                 </button>
              </div>
           )}
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
}
