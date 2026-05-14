"use client";

import React from "react";
import { motion } from "framer-motion";
import { SmartphoneMockup, PhoneScreen } from "./SmartphoneMockup";
import { CheckCircle2, Database, Globe, Zap, Award, UserCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    id: "dashboard" as PhoneScreen,
    tag: "PROTOCOL LAYER 01",
    title: "Cryptographic Settlement.",
    desc: "Document fingerprints are anchored to the Polygon POS mainnet, creating an immutable proof of existence that remains valid for eternity.",
    features: [
      { icon: <CheckCircle2 size={16} />, text: "Zero-Knowledge Hashing" },
      { icon: <Database size={16} />, text: "Decentralized Ledger" }
    ]
  },
  {
    id: "locker" as PhoneScreen,
    tag: "PROTOCOL LAYER 02",
    title: "Institutional Nodes.",
    desc: "Seamless integration with high-authority ERPs and HRMS systems via W3C interoperable decentralized trust layers.",
    features: [
      { icon: <Globe size={16} />, text: "Global Interoperability" },
      { icon: <Zap size={16} />, text: "Real-time Verification" }
    ]
  },
  {
    id: "verified" as PhoneScreen,
    tag: "PROTOCOL LAYER 03",
    title: "Absolute Attestation.",
    desc: "A cryptographically signed genesis record that provides instant, undeniable proof of authenticity across the network.",
    features: [
      { icon: <Award size={16} />, text: "Genesis Audit Trail" },
      { icon: <UserCheck size={16} />, text: "Identity Validation" }
    ]
  }
];

export const StaticShowcase: React.FC = () => {
  return (
    <section className="py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
            {/* Mockup Container with scale-down to fit grid */}
            <div className="h-[320px] md:h-[460px] w-full flex justify-center transform scale-[0.7] md:scale-[0.8] origin-top mb-6 md:mb-10">
                <SmartphoneMockup screen={step.id} className="shadow-2xl" />
              </div>

              {/* Text Content */}
              <div className="w-full text-left space-y-6 max-w-[320px] mx-auto">
                <p className="text-terracotta text-[9px] font-bold tracking-[0.4em] uppercase opacity-60">
                  {step.tag}
                </p>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-forest tracking-tighter leading-none italic">
                  {step.title}
                </h3>
                <p className="text-base font-medium text-forest/40 leading-relaxed tracking-tight italic">
                  {step.desc}
                </p>

                {/* Features */}
                <div className="pt-6 space-y-4">
                  {step.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="text-terracotta group-hover:scale-110 transition-transform">
                        {f.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-forest/60 group-hover:text-forest transition-colors">
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
