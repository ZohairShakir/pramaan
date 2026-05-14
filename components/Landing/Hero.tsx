"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, Lock } from "lucide-react";
import { SmartphoneMockup } from "./SmartphoneMockup";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 md:pb-20 px-6 overflow-hidden bg-transparent">
      {/* Background Sophistication */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#A6634B10,transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-forest/5 bg-forest/[0.02] backdrop-blur-sm text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-forest/40 mb-8 md:mb-12"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta"></span>
          </span>
          Protocol V2.0 Now Active
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[7.5vw] font-bold text-forest leading-[0.95] tracking-[-0.05em] mb-8 md:mb-10 lg:mb-12 uppercase"
        >
          The <span className="italic font-light text-forest/30">Protocol</span><br />
          of Absolute <span className="font-serif italic font-light text-terracotta">Trust.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-forest/40 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight mb-16 md:mb-20 px-4 md:px-0"
        >
          PRAMAAN is an institutional-grade attestation layer designed for cryptographic permanence. 
          Analyze fingerprints with absolute certainty on the global <span className="text-forest underline decoration-terracotta/30 decoration-2 underline-offset-8">Polygon POS</span> network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5"
        >
          <Link href="/verify" className="w-full sm:w-auto bg-forest text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] group shadow-2xl shadow-forest/10 rounded-xl hover:opacity-90 transition-all text-center">
            Launch Verifier
            <ArrowRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/signup" className="w-full sm:w-auto border border-forest/10 text-forest px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-forest/5 transition-all rounded-xl text-center">
            Issuer Access
          </Link>
        </motion.div>
      </div>

      {/* Floating Mockup Visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
         <motion.div 
           initial={{ opacity: 0, x: 200, rotate: 10 }}
           animate={{ opacity: 0.15, x: 350, rotate: -5 }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="absolute top-1/4 right-0 hidden lg:block"
         >
            <SmartphoneMockup screen="dashboard" className="scale-[1.2] grayscale hover:grayscale-0 transition-all duration-1000" />
         </motion.div>
         <motion.div 
           initial={{ opacity: 0, x: -200, rotate: -10 }}
           animate={{ opacity: 0.15, x: -350, rotate: 5 }}
           transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
           className="absolute top-1/4 left-0 hidden lg:block"
         >
            <SmartphoneMockup screen="verified" className="scale-[1.2] grayscale hover:grayscale-0 transition-all duration-1000" />
         </motion.div>
      </div>

      {/* Trust Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-16 md:mt-24 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-6 md:px-8 border-t border-forest/5 pt-10 md:pt-12 z-10"
      >
        {[
          { icon: <Lock size={16} />, label: "End-to-End" },
          { icon: <Shield size={16} />, label: "Immutable" },
          { icon: <Zap size={16} />, label: "Instant" },
          { icon: <Globe size={16} />, label: "Global" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 md:gap-3 opacity-30 hover:opacity-100 transition-opacity duration-500">
            <div className="text-forest scale-90 md:scale-100">{item.icon}</div>
            <span className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
