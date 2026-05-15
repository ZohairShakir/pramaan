'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  X, 
  ShieldCheck, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SubmitProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SubmitProofModal({ isOpen, onClose, onSuccess }: SubmitProofModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      const maxSize = 7 * 1024 * 1024; // 7MB

      if (!allowedTypes.includes(droppedFile.type)) {
        toast.error("Invalid file type. Only PDF, DOCX, JPEG, and PNG are allowed.");
        return;
      }
      if (droppedFile.size > maxSize) {
        toast.error("file is too big");
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      const maxSize = 7 * 1024 * 1024; // 7MB

      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Only PDF, DOCX, JPEG, and PNG are allowed.");
        return;
      }
      if (selectedFile.size > maxSize) {
        toast.error("file is too big");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      // Simulate/Trigger status update in DB
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasSubmittedProof: true }),
      });

      if (!res.ok) throw new Error('Failed to submit proof');

      setIsSuccess(true);
      toast.success("Institutional proof submitted for audit.");
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
        // Reset state after closing
        setTimeout(() => {
          setIsSuccess(false);
          setFile(null);
        }, 500);
      }, 2000);
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[3rem] overflow-hidden shadow-3xl"
          >
            <div className="p-8 md:p-12 space-y-10">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E6E1] text-[10px] font-bold uppercase tracking-widest text-black/50">
                    <ShieldCheck size={12} />
                    Identity Validation
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Submit Institutional Proof</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {!isSuccess ? (
                <div className="space-y-8">
                  <p className="text-sm text-black/40 leading-relaxed font-medium">
                    Upload an official document (ID, License, or Accreditation) to verify your institution. 
                    Our compliance team will review it within 24 hours.
                  </p>

                  <div 
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer group",
                      dragActive ? "border-black bg-black/5 scale-[1.02]" : "border-black/10 hover:border-black/20 bg-[#F8F8F8]",
                      file ? "border-black bg-white" : ""
                    )}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept=".pdf,.docx,.jpg,.jpeg,.png" 
                    />
                    
                    {!file ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                          <Upload size={24} className="text-black/40" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold">Drag & Drop or Browse</p>
                          <p className="text-[10px] font-medium text-black/30">PDF, DOCX, JPEG, PNG (Max 7MB)</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                        <div className="w-12 h-16 bg-black text-white rounded-xl flex items-center justify-center shadow-lg">
                          <FileText size={24} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold truncate max-w-[200px]">{file.name}</p>
                          <p className="text-[10px] font-bold text-[#3D541D] bg-lime px-2 py-0.5 rounded-full inline-block">READY TO SUBMIT</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    disabled={!file || isUploading}
                    onClick={handleSubmit}
                    className="w-full h-16 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-black/90 transition-all shadow-xl shadow-black/10 disabled:opacity-20 flex items-center justify-center gap-3"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Initialize Audit
                        <ShieldCheck size={18} />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-lime rounded-3xl flex items-center justify-center mx-auto text-[#3D541D] shadow-2xl">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Submission Received</h3>
                    <p className="text-sm text-black/40 max-w-xs mx-auto">
                      Your identity is being anchored for validation. We will notify you once the audit is complete.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
