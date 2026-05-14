'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Globe } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: "Starter",
    price: "0",
    desc: "For individual issuers and testing.",
    features: ["Up to 10 anchors/mo", "Polygon POS Settlement", "Standard QR Proofs", "Community Support"],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Institutional",
    price: "199",
    desc: "For universities and organizations.",
    features: ["Unlimited anchors", "Custom Issuer DID", "Bulk Processing", "Priority Settlement", "API Access"],
    cta: "Join Network",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For government and global scale.",
    features: ["White-label Registry", "Dedicated Node", "Custom Smart Contracts", "SLA Guarantee", "24/7 Managed Support"],
    cta: "Contact Sales",
    popular: false
  }
];

export const PricingV2: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-widest text-black/50"
          >
            <Shield size={12} className="text-black" />
            Transparent Economics
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Scale with <span className="bg-lime px-3 py-1 rounded-sm">Trust.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-12 rounded-[3.5rem] flex flex-col justify-between border transition-all duration-500",
                p.popular 
                  ? "bg-black text-white border-black shadow-2xl scale-105 z-10" 
                  : "bg-[#F8F8F8] text-black border-black/5 hover:bg-white hover:shadow-2xl hover:shadow-black/5"
              )}
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className={cn("text-xs font-bold uppercase tracking-widest", p.popular ? "text-white/40" : "text-black/30")}>
                      {p.name}
                    </p>
                    <div className="flex items-baseline gap-1">
                      {p.price !== "Custom" && <span className="text-2xl font-bold">$</span>}
                      <span className="text-6xl font-bold tracking-tighter">{p.price}</span>
                      {p.price !== "Custom" && <span className={cn("text-sm font-bold", p.popular ? "text-white/40" : "text-black/30")}>/mo</span>}
                    </div>
                  </div>
                  {p.popular && (
                    <div className="px-3 py-1 bg-lime text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Network Choice
                    </div>
                  )}
                </div>

                <p className={cn("text-sm font-medium leading-relaxed", p.popular ? "text-white/60" : "text-black/40")}>
                  {p.desc}
                </p>

                <div className="space-y-4 pt-8 border-t border-white/10">
                  {p.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", p.popular ? "bg-lime text-black" : "bg-black/5 text-black")}>
                        <Check size={12} />
                      </div>
                      <span className="text-sm font-bold">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                href="/signup" 
                className={cn(
                  "mt-12 w-full py-5 rounded-2xl text-sm font-bold uppercase tracking-widest text-center transition-all",
                  p.popular 
                    ? "bg-lime text-black hover:bg-white" 
                    : "bg-black text-white hover:bg-black/80 shadow-xl shadow-black/10"
                )}
              >
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
