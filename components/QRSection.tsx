'use client';

import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/utils';

interface QRSectionProps {
  url?: string;
  size?: number;
  hideDescription?: boolean;
}

export default function QRSection({ 
  url = 'https://pramaan.io/verify', 
  size = 200, 
  hideDescription = false 
}: QRSectionProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="p-6 bg-white rounded-3xl shadow-3xl border border-brand-neutral relative group overflow-hidden">
        <QRCodeSVG value={url} size={size} level="H" includeMargin={true} fgColor="#2E4A1F" />
        <div className="absolute inset-0 bg-brand-forest/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
      
      {!hideDescription && (
        <div className="text-center space-y-3 max-w-xs">
          <h3 className="text-xl font-serif font-bold text-brand-forest italic">Public Trust Seal</h3>
          <p className="text-xs font-medium text-brand-forest/40 leading-relaxed tracking-tight">
            Cryptographically signed verification portal. Anyone can scan to verify authenticity instantly on the Polygon network.
          </p>
        </div>
      )}
    </div>
  );
}
