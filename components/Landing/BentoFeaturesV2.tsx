"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  RefreshCw, Smartphone, Laptop, Tablet, 
  Fingerprint, ShieldCheck, Zap, 
  Search, Lock, Globe, Database, Cpu
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export const BentoFeaturesV2: React.FC = () => {
  const features = [
    {
      title: "Safe and Permanent",
      desc: "Documents are stored in a way that they can never be changed or deleted. They are safe forever.",
      icon: <Globe className="text-black" size={28} />,
      className: "md:col-span-2 bg-[#F2E6E1]",
      visual: (
        <div className="relative mt-8 h-48 w-full overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3D541D15,transparent_70%)]" />
            <div className="flex items-center gap-6 md:gap-10">
                {[1, 2, 3, 4, 5].map(i => (
                    <motion.div 
                        key={i}
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, 0],
                          opacity: [0.4, 0.8, 0.4] 
                        }}
                        transition={{ 
                          duration: 4, 
                          delay: i * 0.7, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-14 h-16 rounded-2xl bg-white flex flex-col items-center justify-center shadow-xl border border-black/5"
                    >
                        <Logo size={28} className="opacity-40 mb-1" />
                        <div className="w-6 h-1 bg-black/10 rounded-full" />
                    </motion.div>
                ))}
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-black/5">
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Secure Sync Live</span>
            </div>
        </div>
      )
    },
    {
      title: "100% Private",
      desc: "Check credentials without sharing any personal information. Your data stays yours.",
      icon: <Lock className="text-lime" size={28} />,
      className: "md:col-span-1 bg-black text-white",
      visual: (
        <div className="mt-8 flex justify-center">
            <div className="w-28 h-28 rounded-[2rem] border-2 border-white/10 flex items-center justify-center relative bg-white/5 overflow-hidden">
                <Fingerprint size={48} className="text-lime relative z-10" />
                <motion.div 
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-lime rounded-full blur-2xl"
                />
            </div>
        </div>
      )
    },
    {
      title: "Easy Dashboard",
      desc: "A simple control panel to manage all your documents and checks in one place.",
      icon: <Cpu className="text-black" size={28} />,
      className: "md:col-span-1 bg-[#F8F8F8]",
      visual: (
        <div className="mt-8 space-y-4 px-4">
            {[1, 2, 3].map(i => (
                <motion.div 
                  key={i} 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-4 rounded-2xl border border-black/5 flex items-center gap-4 shadow-sm"
                >
                    <div className={cn("w-3 h-3 rounded-full", i === 1 ? "bg-lime" : "bg-black/10")} />
                    <div className="space-y-2 flex-1">
                      <div className="h-2 w-full bg-black/5 rounded-full" />
                      <div className="h-2 w-2/3 bg-black/5 rounded-full opacity-50" />
                    </div>
                </motion.div>
            ))}
        </div>
      )
    },
    {
      title: "Instant Check",
      desc: "Scan a QR code or upload a file to check if it's real in seconds. No waiting.",
      icon: <Zap className="text-black" size={28} />,
      className: "md:col-span-2 bg-[#F8F8F8]",
      visual: (
        <div className="relative mt-8 h-48 flex items-center justify-center">
            <motion.div 
              whileHover={{ y: -5 }}
              className="w-full max-w-sm bg-white rounded-3xl border border-black/5 p-8 shadow-2xl relative overflow-hidden group"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center">
                          <ShieldCheck size={20} className="text-[#3D541D]" />
                        </div>
                        <span className="text-sm font-bold">Real Document</span>
                    </div>
                    <div className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold text-black/40">VERIFIED</div>
                </div>
                <div className="space-y-3">
                    <div className="h-2.5 w-full bg-black/5 rounded-full" />
                    <div className="h-2.5 w-3/4 bg-black/5 rounded-full" />
                    <div className="h-2.5 w-1/2 bg-black/5 rounded-full opacity-40" />
                </div>
                <div className="absolute inset-0 bg-lime/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Decorative scanning line */}
                <motion.div 
                  animate={{ y: [0, 160, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime to-transparent opacity-20"
                />
            </motion.div>
        </div>
      )
    }
  ];

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30"
            >
              A Simple Way to Trust
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-[0.8]">
                Trust <br /><span className="bg-lime px-4 py-1 rounded-sm inline-block mt-4">Made Simple.</span>
            </h2>
          </div>
          <p className="text-black/40 max-w-sm text-xl font-medium leading-relaxed italic">
            "The easiest way for anyone to check if a document is real and original."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                        "rounded-[3.5rem] p-12 flex flex-col justify-between group transition-all duration-700 hover:scale-[1.02]",
                        feature.className
                    )}
                >
                    <div className="space-y-6">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                            {feature.icon}
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold tracking-tight uppercase">{feature.title}</h3>
                            <p className="text-sm font-medium opacity-50 leading-relaxed max-w-[280px]">
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                    {feature.visual}
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
