"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Apple, Play, ShieldCheck, Globe } from "lucide-react";
import { SmartphoneMockup } from "./SmartphoneMockup";

export const HeroV2: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 lg:pt-16 pb-20 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="z-10 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-black leading-[1.1] tracking-[-0.04em] mb-8"
          >
            The trust <span className="bg-lime px-4 py-1 rounded-sm">layer</span> <br />
            for institutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-black/50 max-w-lg mb-12 leading-relaxed"
          >
            Pramaan provides cryptographic document verification with absolute permanence. Issue, verify, and manage authentic credentials at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <button className="flex items-center gap-2 bg-black text-white px-10 py-4 rounded-xl font-semibold hover:bg-black/90 transition-all">
              Get Started
            </button>
            <button className="flex items-center gap-2 bg-white text-black border border-black/10 px-8 py-4 rounded-xl font-semibold hover:bg-black/5 transition-all">
              Launch Verifier
            </button>
          </motion.div>


        </div>

        {/* Right Visual (Functional Mockup) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:h-[700px] flex items-center justify-center lg:justify-end lg:pr-24"
        >
          <div className="relative">
             <SmartphoneMockup screen="dashboard" className="relative z-10" />
             
             {/* Decorative Background Accents */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F2E6E1]/50 rounded-full blur-[100px] -z-10" />
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-lime/10 rounded-full blur-[60px] -z-10" />
             
             {/* Float Elements */}
             <div 
                className="absolute -left-8 top-1/4 bg-white p-6 rounded-3xl border border-black/5 shadow-2xl z-20 hidden xl:block"
             >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center">
                        <ShieldCheck size={20} className="text-black" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Finality</p>
                        <p className="text-sm font-bold text-black tracking-tight">Instant Settle</p>
                    </div>
                </div>
             </div>

             <div 
                className="absolute -right-6 bottom-1/4 bg-black p-6 rounded-3xl shadow-2xl z-20 hidden xl:block text-white"
             >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Globe size={20} className="text-lime" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Registry</p>
                        <p className="text-sm font-bold text-white tracking-tight">Global Sync</p>
                    </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
