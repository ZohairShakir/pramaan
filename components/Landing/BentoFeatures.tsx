"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Globe, Zap, Database, CheckCircle, ArrowRight, BarChart3, Fingerprint, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Immutable Proof",
    desc: "Every document is anchored on the Polygon blockchain, ensuring permanent, tamper-proof verification.",
    icon: <Shield className="w-8 h-8" />,
    className: "md:col-span-2 md:row-span-2 bg-forest text-cream",
    accent: "bg-terracotta/20",
    visual: (
      <div className="absolute right-0 bottom-0 w-64 h-64 opacity-20 pointer-events-none">
        <div className="absolute inset-0 border-[1px] border-cream/30 rounded-full scale-150 -mr-20 -mb-20" />
        <div className="absolute inset-0 border-[1px] border-cream/10 rounded-full scale-125 -mr-10 -mb-10" />
      </div>
    )
  },
  {
    title: "Zero Knowledge",
    desc: "Verify fingerprints without ever revealing sensitive document content.",
    icon: <Lock className="w-6 h-6 text-terracotta" />,
    className: "md:col-span-1 md:row-span-1 bg-white border border-forest/5 shadow-sm",
    accent: "bg-forest/5"
  },
  {
    title: "Global Registry",
    desc: "Universally accessible nodes across the global cloud infrastructure.",
    icon: <Globe className="w-6 h-6 text-forest" />,
    className: "md:col-span-1 md:row-span-1 bg-white border border-forest/5 shadow-sm",
    accent: "bg-forest/5"
  },
  {
    title: "Neural Matching",
    desc: "AI-powered detection of physical tampering and anomalies.",
    icon: <Cpu className="w-6 h-6 text-forest" />,
    className: "md:col-span-2 md:row-span-1 bg-white border border-forest/5 shadow-sm",
    accent: "bg-forest/5",
    visual: (
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 opacity-[0.03] pointer-events-none">
        <Fingerprint className="w-full h-full" />
      </div>
    )
  }
];

export const BentoFeatures: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-transparent">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-forest/[0.01] rounded-full -mr-[25vw] -mt-[25vw]" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-terracotta/[0.01] rounded-full -ml-[15vw] -mb-[15vw]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-[2px] bg-terracotta" />
              <span className="text-terracotta text-[10px] font-bold tracking-[0.6em] uppercase">The Registry Architecture</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-bold text-forest tracking-[-0.06em] leading-[0.85] uppercase"
            >
              Immutable <br /><span className="italic font-light text-forest/20">Settlement.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 max-w-sm"
          >
            <p className="text-forest/40 text-lg md:text-xl font-medium leading-relaxed italic">
              "Every document is a node of trust in the global decentralized ledger."
            </p>
            <div className="h-px w-full bg-forest/5" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:min-h-[600px]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={cn(
                "relative p-8 pt-20 rounded-[2.5rem] overflow-hidden group flex flex-col justify-between transition-all duration-700",
                f.className
              )}
            >
              {/* Top-Left Floating Icon - Increased Visibility */}
              <div className="absolute top-8 left-8 w-12 h-12 rounded-xl bg-current/10 flex items-center justify-center transition-all duration-700 group-hover:bg-current group-hover:text-forest">
                <div className="text-current scale-90 opacity-80 group-hover:opacity-100 transition-opacity">
                  {f.icon}
                </div>
              </div>

              {/* Decorative Accents */}
              <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-1000", f.accent)} />
              {f.visual}

              <div className="relative z-10 space-y-3">
                <h3 className="text-2xl font-bold tracking-tighter uppercase leading-tight">{f.title}</h3>
                <p className="text-[11px] opacity-50 leading-relaxed font-medium max-w-[200px] uppercase tracking-wider">
                  {f.desc}
                </p>
              </div>

              <div className="relative z-10 mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-40 transition-all duration-700 -translate-x-4 group-hover:translate-x-0">
                   <span className="text-[9px] font-bold uppercase tracking-widest">Protocol Spec</span>
                   <ArrowRight size={10} />
                </div>
                <div className="w-10 h-10 rounded-xl border-2 border-current/20 flex items-center justify-center group-hover:opacity-100 group-hover:bg-current group-hover:text-forest transition-all duration-700 shadow-sm">
                  <ArrowRight size={16} className="opacity-60 group-hover:opacity-100" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
