"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, FileText, Globe, Fingerprint, 
  Layers, Clock, Plus, CheckCircle2, Award,
  Activity, Zap, Search, Shield
} from "lucide-react";
import { Logo } from "@/components/Logo";

export type PhoneScreen = "dashboard" | "locker" | "registering" | "verified" | "verifying" | "industry";

interface SmartphoneMockupProps {
  screen: PhoneScreen;
  className?: string;
}

export const SmartphoneMockup: React.FC<SmartphoneMockupProps> = ({ screen, className = "" }) => {
    return (
      <motion.div 
        className={`relative w-[260px] h-[520px] max-w-full perspective-1000 ${className}`}
      >
      {/* Device Frame */}
      <div 
        className="relative w-full h-full bg-[#0A0A0A] rounded-[3.5rem] border-[10px] border-[#1A1A1A] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1A1A1A] rounded-b-[1.5rem] z-20 flex items-center justify-center">
           <div className="w-12 h-1 bg-white/10 rounded-full" />
        </div>

        {/* Screen Content Wrapper */}
        <div className="absolute inset-0 bg-white overflow-hidden">
          <AnimatePresence mode="wait">
            {screen === "dashboard" && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full pt-12 flex flex-col bg-white"
              >
                {/* Header */}
                <div className="px-6 py-4 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                      <span className="text-[9px] font-bold text-black/40 uppercase tracking-widest">Mainnet Sync</span>
                   </div>
                   <Logo size={32} />
                </div>

                {/* Hero Card */}
                <div className="mx-4 mb-6 p-6 rounded-[2rem] bg-black text-white space-y-4 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12" />
                   <p className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-30">Registry Node</p>
                   <h4 className="text-xl font-bold tracking-tight">IIT Delhi</h4>
                   <div className="flex gap-6 pt-4 border-t border-white/10">
                      <div>
                         <p className="text-sm font-bold tracking-tighter">1,242</p>
                         <p className="text-[8px] opacity-30 uppercase font-bold">Proofs</p>
                      </div>
                      <div>
                         <p className="text-sm font-bold tracking-tighter">14.8k</p>
                         <p className="text-[8px] opacity-30 uppercase font-bold">Audits</p>
                      </div>
                   </div>
                </div>

                {/* Stat Grid */}
                <div className="px-4 grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-[#F8F8F8] p-4 rounded-2xl border border-black/5">
                      <Zap size={14} className="text-lime mb-2" />
                      <p className="text-base font-bold text-black tracking-tighter">99.9%</p>
                      <p className="text-[8px] text-black/30 uppercase font-bold">Uptime</p>
                   </div>
                   <div className="bg-[#F8F8F8] p-4 rounded-2xl border border-black/5">
                      <Shield size={14} className="text-black mb-2" />
                      <p className="text-base font-bold text-black tracking-tighter">Secured</p>
                      <p className="text-[8px] text-black/30 uppercase font-bold">Protocol</p>
                   </div>
                </div>

                {/* Recent Activity */}
                <div className="px-4 flex-1">
                   <p className="text-[9px] font-bold text-black/20 uppercase tracking-widest mb-4">Live Activity</p>
                   <div className="space-y-3">
                      {[
                        { name: "Transcript_v2", type: "Settled", time: "2m ago" },
                        { name: "Degree_CS_24", type: "Verified", time: "8m ago" }
                      ].map((item, i) => (
                        <div key={i} className="bg-white p-3 rounded-2xl border border-black/5 flex items-center gap-4 shadow-sm">
                           <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
                              <FileText size={14} />
                           </div>
                           <div className="flex-1">
                              <p className="text-[10px] font-bold text-black">{item.name}</p>
                              <p className="text-[8px] text-black/40 font-bold uppercase">{item.type} · {item.time}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-auto h-20 bg-white border-t border-black/5 flex items-center justify-around px-8">
                   <Plus size={20} className="text-black" />
                   <Layers size={20} className="text-black/10" />
                   <Globe size={20} className="text-black/10" />
                   <div className="w-10 h-10 rounded-2xl bg-black/5" />
                </div>
              </motion.div>
            )}

            {screen === "verifying" && (
              <motion.div 
                key="verifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-8 bg-[#F2E6E1]/30"
              >
                <div className="relative">
                    <div className="w-32 h-32 rounded-full border-2 border-black/5 flex items-center justify-center">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-t-2 border-black rounded-full"
                        />
                        <Search size={40} className="text-black/20" />
                    </div>
                </div>
                <div className="mt-12 text-center space-y-2">
                    <p className="text-2xl font-bold uppercase tracking-tighter">Auditing.</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">Spectral Genesis Scan</p>
                </div>
              </motion.div>
            )}

            {screen === "industry" && (
              <motion.div 
                key="industry"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-8 pt-16 bg-white"
              >
                <div className="space-y-12">
                    <div className="flex items-center justify-between">
                        <h4 className="text-3xl font-bold uppercase tracking-tight">Sync.</h4>
                        <div className="w-10 h-10 rounded-xl bg-black text-lime flex items-center justify-center">
                            <Globe size={20} />
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-5 rounded-2xl bg-[#F8F8F8] border border-black/5 flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
                                    <Shield size={16} className="text-black/20" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="h-2 w-24 bg-black/10 rounded-full" />
                                    <div className="h-1.5 w-16 bg-black/5 rounded-full" />
                                </div>
                                <CheckCircle2 size={16} className="text-lime" />
                            </div>
                        ))}
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-black text-white space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Node Throughput</p>
                        <div className="flex items-end gap-1 h-12">
                            {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h * 100}%` }}
                                    className="flex-1 bg-lime rounded-t-sm"
                                />
                            ))}
                        </div>
                    </div>
                </div>
              </motion.div>
            )}

            {screen === "registering" && (
              <motion.div 
                key="registering"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-8 pt-16 flex flex-col items-center bg-black text-white"
              >
                <div className="w-16 h-16 bg-lime rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-lime/20">
                   <Zap size={32} className="text-black" />
                </div>
                
                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-2">Block Hash</p>
                   <p className="text-[11px] font-mono break-all opacity-60 leading-relaxed">0x8f3c2...b2e11...d4a99</p>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center gap-10 text-center">
                   <div className="relative">
                      <div className="w-28 h-28 rounded-full border-4 border-white/5 flex items-center justify-center">
                         <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-t-4 border-lime rounded-full"
                         />
                         <ShieldCheck size={40} className="text-lime animate-pulse" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-3xl font-bold tracking-tight uppercase">Settling.</h4>
                      <p className="text-[10px] opacity-30 uppercase tracking-[0.4em]">Anchor Genesis Protocol</p>
                   </div>
                </div>

                <div className="w-full h-1.5 bg-white/10 rounded-full mt-auto overflow-hidden">
                   <motion.div 
                     animate={{ width: ["0%", "100%"] }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="h-full bg-lime"
                   />
                </div>
              </motion.div>
            )}

            {screen === "verified" && (
              <motion.div 
                key="verified"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col bg-white"
              >
                <div className="bg-[#F2E6E1] h-[40%] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                   <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-black shadow-2xl mb-6 relative z-10">
                      <ShieldCheck size={40} className="text-lime" />
                   </div>
                   <h4 className="text-3xl font-bold tracking-tight text-black relative z-10 uppercase">Authentic.</h4>
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mt-2 relative z-10">Certified Genesis Record</p>
                   <Logo size={100} className="absolute -bottom-10 -right-10 opacity-[0.05] rotate-12" />
                </div>
                
                <div className="p-8 space-y-8 flex-1">
                   <div className="space-y-6">
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Registry ID</p>
                         <p className="text-lg font-bold text-black tracking-tight">#PR_0X7D2E...4A1F</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Institution</p>
                         <p className="text-base font-bold text-black">Indian Inst. of Tech</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Authority</p>
                         <p className="text-base font-bold text-black">Verified Issuer</p>
                      </div>
                   </div>

                   <div className="p-6 bg-[#F8F8F8] rounded-3xl border border-black/5 space-y-4">
                      <div className="flex justify-between items-center">
                         <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest">Signature QR</p>
                         <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                      </div>
                      <div className="w-full aspect-square bg-black rounded-2xl grid grid-cols-6 gap-2 p-4">
                         {Array.from({ length: 36 }).map((_, i) => (
                           <div key={i} className={`rounded-sm ${((i * 17) % 11 > 4) ? 'bg-white' : 'bg-transparent'}`} />
                         ))}
                      </div>
                   </div>
                </div>

                <div className="p-8">
                   <button className="w-full bg-black text-white py-5 rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-2xl">
                      Explore Registry
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Device Shadow */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-black/20 blur-[40px] -z-10 rounded-full" />
    </motion.div>
  );
};
