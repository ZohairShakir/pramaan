import React from 'react';

export const BrandLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Devanagari character 'प्र' */}
      <span className="text-[120px] md:text-[160px] font-rozha text-brand-forest leading-none select-none opacity-90">
        प्र
      </span>
      
      {/* PRAMAAN Text - Absolute positioned to overlap */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-baseline gap-0.5">
        <span className="text-4xl md:text-5xl font-serif font-bold text-brand-terracotta tracking-[0.1em] drop-shadow-sm">
          P R
        </span>
        <span className="text-4xl md:text-5xl font-serif font-bold text-brand-terracotta tracking-[0.1em] drop-shadow-sm">
          M A A N
        </span>
      </div>
      
      <div className="mt-4 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] text-brand-terracotta whitespace-nowrap">
        VERIFY <span className="text-brand-forest">TRUST.</span> NOT JUST DOCUMENTS.
      </div>
    </div>
  );
};
