"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { SmartphoneMockup, PhoneScreen } from "./SmartphoneMockup";
import { CheckCircle2, ShieldCheck, Database, Globe, Shield, Zap, Award, UserCheck, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    id: "registering" as PhoneScreen,
    tag: "STEP 01 — ANCHORING",
    title: "CRYPTO-GRAFTING\nPERMANENCE.",
    desc: "Document fingerprints are anchored to the Polygon blockchain, creating a non-fungible proof of existence that can never be modified or deleted.",
    side: "right" as const,
    features: [
      { icon: <CheckCircle2 size={18} />, text: "Client-side hashing" },
      { icon: <Database size={18} />, text: "Decentralized metadata" }
    ]
  },
  {
    id: "industry" as PhoneScreen,
    tag: "STEP 02 — INTEGRATION",
    title: "UNIVERSAL\nTRUST NODES.",
    desc: "Seamless integration with existing institutional ERPs and corporate HRMS via decentralized trust layers.",
    side: "left" as const,
    features: [
      { icon: <Globe size={18} />, text: "W3C Interoperable" },
      { icon: <Zap size={18} />, text: "Real-time sync" }
    ]
  },
  {
    id: "verified" as PhoneScreen,
    tag: "STEP 03 — VERIFIED",
    title: "INSTANT\nATTESTATION.",
    desc: "The result is a cryptographically signed attestation universally recognized across the network in milliseconds.",
    side: "right" as const,
    features: [
      { icon: <Award size={18} />, text: "Blockchain genesis audit" },
      { icon: <UserCheck size={18} />, text: "Issuer identity validation" }
    ],
    cta: true
  },
  {
    id: "verified" as PhoneScreen,
    tag: "PRAMAAN",
    title: "",
    desc: "",
    side: "center" as const,
    tagline: "TRUST THE TRUTH.",
    isFinal: true
  }
];

export const UnifiedScrollytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScreen, setActiveScreen] = useState<PhoneScreen>("verifying");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.1], [0.03, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) setActiveScreen("verifying");
    else if (latest < 0.4) setActiveScreen("registering");
    else if (latest < 0.6) setActiveScreen("industry");
    else setActiveScreen("verified");
  });

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-[#F9F7F2]">
      {/* Scroll Progress Indicator */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex items-center justify-center">
             <motion.div 
               animate={{ 
                 scale: activeScreen === step.id ? 1.5 : 1,
                 backgroundColor: activeScreen === step.id ? "#B7775D" : "rgba(245,240,232,0.2)"
               }}
               className="w-2 h-2 rounded-full transition-colors"
             />
          </div>
        ))}
      </div>

      {/* Sticky Phone Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Large PRAMAAN Watermark (Hero) */}
        <motion.h1 
          style={{ opacity: watermarkOpacity }}
          className="absolute text-[20vw] font-serif font-bold text-forest pointer-events-none select-none tracking-tighter z-0"
        >
          PRAMAAN
        </motion.h1>

        {/* Ambient Glows */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-terracotta/10 blur-[120px] rounded-full pointer-events-none"
        ></motion.div>
        
        {/* Centered Phone */}
        <div className="relative z-10 flex justify-center w-full">
           <SmartphoneMockup screen={activeScreen} className="transition-transform duration-1000 shadow-[0_40px_100px_rgba(0,0,0,0.3)]" />
        </div>
      </div>

      {/* Scrolling Text Panels */}
      <div className="relative z-[50] pointer-events-none">
        {steps.map((step, idx) => (
          <div key={idx} className="h-screen flex items-center px-8">
            {step.isFinal ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-center"
                >
                  <p className="text-terracotta text-[10px] font-bold tracking-[0.6em] uppercase mb-8 opacity-60">
                    {step.tag}
                  </p>
                  <h2 className="text-5xl md:text-[8vw] font-bold text-forest leading-none tracking-[-0.06em] mb-16 uppercase">
                    {step.tagline}
                  </h2>
                  <Link href="/verify" className="pointer-events-auto inline-flex items-center gap-4 text-forest/40 hover:text-terracotta transition-all duration-500 uppercase text-[9px] font-bold tracking-[0.4em] group">
                    <span className="border-b border-transparent group-hover:border-terracotta/40 pb-1">Start Verifying</span> <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
                
                {/* Content Panel */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className={`pointer-events-auto ${step.side === "right" ? "lg:col-start-2" : "lg:col-start-1"}`}
                >
                  <motion.p 
                    className="text-terracotta text-[10px] font-bold tracking-[0.5em] uppercase mb-6 opacity-80"
                  >
                    {step.tag}
                  </motion.p>
                  <motion.h2 
                    className="text-4xl md:text-6xl font-bold uppercase tracking-[-0.04em] mb-8 leading-[1] whitespace-pre-line text-forest"
                  >
                    {step.title}
                  </motion.h2>
                  <motion.p 
                    className="text-lg leading-[1.7] mb-10 font-medium text-forest/40 tracking-tight max-w-lg"
                  >
                    {step.desc}
                  </motion.p>

                  {step.tagline && !step.isFinal && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className="mb-12"
                    >
                      <p className="text-4xl md:text-5xl font-black text-terracotta/40 leading-tight uppercase tracking-tighter">
                        {step.tagline}
                      </p>
                    </motion.div>
                  )}

                  {step.features && (
                    <div className="space-y-8 mb-12">
                      {step.features.map((f, i) => (
                        <div key={i} className="flex gap-6 items-center group">
                          <div className="text-terracotta transition-transform group-hover:scale-125">{f.icon}</div>
                          <motion.span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 text-forest">{f.text}</motion.span>
                        </div>
                      ))}
                    </div>
                  )}



                  {step.cta && (
                    <motion.button 
                      className="flex items-center gap-6 border border-forest/10 px-10 py-5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-forest hover:text-cream transition-all duration-700 group shadow-2xl text-forest"
                    >
                      LAUNCH THE LIVE VERIFIER
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                  )}
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
