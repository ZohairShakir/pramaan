'use client';

import React from 'react';
import { ShieldAlert, ShieldCheck, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface VerificationBannerProps {
  isVerified: boolean;
  hasSubmitted: boolean;
}

export default function VerificationBanner({ isVerified, hasSubmitted }: VerificationBannerProps) {
  if (isVerified) return null;

  return (
    <div className={cn(
      "w-full py-4 px-6 mb-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 border shadow-sm transition-all duration-500",
      hasSubmitted 
        ? "bg-lime/10 border-lime/20 text-[#3D541D]" 
        : "bg-amber-50 border-amber-200 text-amber-800"
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          hasSubmitted ? "bg-white text-lime" : "bg-white text-amber-500"
        )}>
          {hasSubmitted ? <Clock size={20} className="animate-pulse" /> : <AlertTriangle size={20} />}
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-tight">
            {hasSubmitted ? "Identity Audit in Progress" : "Action Required: Identity Verification"}
          </p>
          <p className="text-xs opacity-70 font-medium">
            {hasSubmitted 
              ? "Your institutional documents have been submitted. You will be verified within 24 hours." 
              : "You have not submitted documents for validation. Please upload proof to issue documents."}
          </p>
        </div>
      </div>
      
      {!hasSubmitted && (
        <Link 
          href="/profile" 
          className="bg-amber-800 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-amber-900 transition-all flex items-center gap-2 group"
        >
          Submit Proof
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
