"use client";

import React from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "Deakin University", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Deakin_University_logo.svg/1200px-Deakin_University_logo.svg.png" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1200px-Wipro_Primary_Logo_Color_RGB.svg.png" },
  { name: "Digit Insurance", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Digit_Insurance_logo.png/220px-Digit_Insurance_logo.png" },
  { name: "Government of India", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Emblem_of_India.svg/800px-Emblem_of_India.svg.png" },
  { name: "CRED", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/CRED_Logo.png/220px-CRED_Logo.png" },
  { name: "upGrad", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/UpGrad_Logo.png/1200px-UpGrad_Logo.png" }
];

export const Partners: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-transparent border-y border-forest/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <p className="text-terracotta text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase mb-4 opacity-60">
            Institutional Network
          </p>
          <h3 className="text-xl md:text-3xl font-bold text-forest tracking-tight px-4">
            Trusted by the world's most secure organizations.
          </h3>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-30 hover:opacity-100 transition-all duration-700">
          {partners.map((partner, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex items-center justify-center group cursor-pointer"
            >
               <span className="text-[10px] md:text-sm font-bold text-forest tracking-[0.2em] uppercase group-hover:text-terracotta transition-colors">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
