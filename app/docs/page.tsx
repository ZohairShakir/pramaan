'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FooterV2 as Footer } from '@/components/Landing/FooterV2';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { 
  BookOpen, Shield, Zap, Database, 
  Lock, Globe, ArrowRight, CheckCircle2,
  Terminal, Code2, Layers, Cpu
} from 'lucide-react';

const sections = [
  {
    id: "hashing",
    icon: <Cpu className="text-black" size={24} />,
    title: "Cryptographic Hashing",
    content: "PRAMAAN utilizes advanced SHA-256 hashing to generate unique digital fingerprints. The process happens entirely on the client-side, ensuring that sensitive document data never leaves the institutional perimeter."
  },
  {
    id: "anchoring",
    icon: <Database className="text-black" size={24} />,
    title: "Blockchain Anchoring",
    content: "Once hashed, the fingerprints are 'anchored' to the Polygon blockchain. This creates a permanent, immutable record that serves as a non-fungible proof of existence (PoE)."
  },
  {
    id: "verification",
    icon: <Zap className="text-black" size={24} />,
    title: "Instant Verification",
    content: "Verification is performed by re-hashing a document and comparing it with the anchored record. If a single bit of the document is altered, the verification will fail, ensuring absolute integrity."
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black">
       <Navbar />
       <main className="pt-24 md:pt-32 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Documentation Header */}
          <div className="mb-32 space-y-8 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-black/50 font-bold text-[10px] uppercase tracking-[0.4em]"
            >
              <BookOpen size={16} />
              Technical Documentation
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]"
            >
              The Science <br /><span className="bg-lime px-4 py-1 rounded-sm">of Trust.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-black/40 font-medium leading-relaxed max-w-2xl"
            >
              An in-depth guide to the PRAMAAN protocol, cryptographic anchoring, 
              and institutional-grade verification infrastructure.
            </motion.p>
          </div>

          {/* Protocol Flow visualization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {sections.map((section, idx) => (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="p-10 rounded-[3rem] bg-[#F8F8F8] border border-black/5 space-y-8 hover:bg-black group transition-all duration-700"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center transition-colors group-hover:bg-lime">
                  {section.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-white transition-colors">{section.title}</h3>
                  <p className="text-sm font-medium text-black/40 leading-relaxed group-hover:text-white/40 transition-colors">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* In-depth technical section */}
          <div className="space-y-40">
            <section className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                  <Terminal size={12} />
                  Developer API
                </div>
                <h2 className="text-5xl font-bold tracking-tight">Seamless Integration</h2>
                <p className="text-lg text-black/50 leading-relaxed font-medium">
                  Integrate PRAMAAN into your existing institutional ERP or custom workflow with our RESTful API and SDKs. We provide pre-built connectors for major document management systems.
                </p>
                <ul className="space-y-6">
                  {[
                    "Standardized JSON-LD schemas",
                    "W3C Verifiable Credentials support",
                    "Automated Polygon network settlement",
                    "Webhook-based verification status"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-black/30 group">
                      <div className="w-2 h-2 rounded-full bg-black transition-all group-hover:bg-lime group-hover:scale-150" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-lime/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">protocol.js</span>
                 </div>
                 <pre className="text-white/80 font-mono text-sm leading-relaxed overflow-x-auto selection:bg-lime selection:text-black">
{`// Anchor a document
const proof = await pramaan.anchor({
  data: documentBuffer,
  metadata: {
    type: "ACADEMIC_CREDENTIAL",
    issuer: "INSTITUTION_ID_0X44"
  }
});

console.log(proof.hash); 
// 0x8f3c...b2e1...d4a9`}
                 </pre>
              </div>
            </section>

            <section className="bg-black rounded-[4rem] p-16 md:p-32 text-center space-y-12 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F2E6E105,transparent_70%)] pointer-events-none" />
               <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                 <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                   Ready to <span className="bg-lime text-black px-4 py-1 rounded-sm">Secure</span> your infrastructure?
                 </h2>
                 <p className="text-white/40 text-lg md:text-xl font-medium leading-relaxed">
                   Join the global network of institutions utilizing PRAMAAN to eliminate fraud and automate digital trust.
                 </p>
                 <div className="pt-8 flex flex-wrap justify-center gap-6">
                   <Link href="/signup" className="px-12 py-5 bg-white text-black rounded-2xl text-sm font-bold hover:bg-lime transition-all shadow-2xl active:scale-95">
                     Get Started
                   </Link>
                   <Link href="/verify" className="px-12 py-5 border border-white/10 text-white rounded-2xl text-sm font-bold hover:bg-white/5 transition-all">
                     Try Verification
                   </Link>
                 </div>
               </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
