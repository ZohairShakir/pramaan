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
      title: "Decentralized Registry",
      desc: "Every document is anchored to the Polygon Mainnet, ensuring permanent, immutable proof of authenticity that cannot be censored.",
      icon: <Globe className="text-black" size={28} />,
      className: "md:col-span-2 bg-[#F2E6E1]",
      visual: (
        <div className="relative mt-8 h-40 w-full overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3D541D10,transparent_70%)]" />
            <div className="flex items-center gap-8">
                {[1, 2, 3, 4, 5].map(i => (
                    <motion.div 
                        key={i}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                        className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm"
                    >
                        <Logo size={24} className="opacity-20" />
                    </motion.div>
                ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Network Live</span>
            </div>
        </div>
      )
    },
    {
      title: "ZKP Privacy",
      desc: "Verify credentials without ever exposing sensitive data. Zero-Knowledge Proofs ensure 100% privacy.",
      icon: <Lock className="text-lime" size={28} />,
      className: "md:col-span-1 bg-black text-white",
      visual: (
        <div className="mt-8 flex justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center relative">
                <Fingerprint size={40} className="text-lime" />
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-2 border-lime rounded-full"
                />
            </div>
        </div>
      )
    },
    {
      title: "Institutional Console",
      desc: "A high-authority dashboard for large-scale document issuance, category management, and audit trail tracking.",
      icon: <Cpu className="text-black" size={28} />,
      className: "md:col-span-1 bg-[#F8F8F8]",
      visual: (
        <div className="mt-8 space-y-3">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-3 rounded-xl border border-black/5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-black/10" />
                    <div className="h-2 w-24 bg-black/5 rounded-full" />
                </div>
            ))}
        </div>
      )
    },
    {
      title: "Real-time Verification",
      desc: "Verify any document instantly via file upload, unique ID, or QR scan with sub-second cryptographic response times.",
      icon: <Zap className="text-black" size={28} />,
      className: "md:col-span-2 bg-[#F8F8F8]",
      visual: (
        <div className="relative mt-8 h-40 flex items-end justify-center gap-4">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-black/5 p-6 shadow-xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={18} className="text-lime" />
                        <span className="text-xs font-bold">Authentic Record</span>
                    </div>
                    <span className="text-[10px] font-bold text-black/20">#PR_0X7...</span>
                </div>
                <div className="space-y-2">
                    <div className="h-2 w-full bg-black/5 rounded-full" />
                    <div className="h-2 w-2/3 bg-black/5 rounded-full" />
                </div>
                <div className="absolute inset-0 bg-lime/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
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
              The Infrastructure of Trust
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-[0.8]">
                Authority <br /><span className="bg-lime px-4 py-1 rounded-sm inline-block mt-4">Redefined.</span>
            </h2>
          </div>
          <p className="text-black/40 max-w-sm text-xl font-medium leading-relaxed italic">
            "A global standard for cryptographic document permanence and institutional audit."
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
