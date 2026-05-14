'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Dr. Arisatya P.",
    role: "Registrar, Tech University",
    content: "Pramaan has completely transformed our degree issuance process. What used to take weeks of manual verification now happens in seconds on the blockchain.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "HR Director, Global Corp",
    content: "The level of trust we now have in applicant credentials is unparalleled. Pramaan eliminates the risk of fake certificates entirely.",
    rating: 5
  },
  {
    name: "Vikram Malhotra",
    role: "CEO, LegalTrust",
    content: "The minimalist design and institutional-grade security make it the perfect solution for our legal document anchoring needs.",
    rating: 5
  }
];

export const TestimonialsV2: React.FC = () => {
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
            <Star size={12} className="text-lime fill-lime" />
            Institutional Trust
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Voices of <span className="bg-lime px-3 py-1 rounded-sm">Authority.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[3rem] bg-[#F8F8F8] border border-black/5 space-y-8 relative group hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
            >
              <Quote size={40} className="text-black/5 absolute top-8 right-8" />
              
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-black fill-black" />
                  ))}
                </div>
                <p className="text-xl font-medium leading-relaxed italic text-black/80">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-8 border-t border-black/5">
                <p className="font-bold text-lg">{t.name}</p>
                <p className="text-sm font-bold text-black/30 uppercase tracking-widest">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
