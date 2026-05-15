'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { cn } from '@/lib/utils';
import { Download, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useRef } from 'react';

interface QRSectionProps {
  url?: string;
  size?: number;
  hideDescription?: boolean;
  className?: string;
}

export default function QRSection({ 
  url = 'https://pramaan.io/verify', 
  size = 200, 
  hideDescription = false,
  className
}: QRSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "pramaan-qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    toast.success("QR Code downloaded successfully");
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pramaan Verification QR',
          text: 'Scan this QR code to verify the document authenticity on Pramaan.',
          url: url,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      } catch (err) {
        toast.error("Failed to share or copy link");
      }
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-6 md:gap-8", className)}>
      <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
        <div className="p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-brand-neutral/50 relative group overflow-hidden transition-all duration-300 hover:shadow-brand-forest/10 hover:border-brand-forest/20">
          <QRCodeCanvas 
            ref={canvasRef}
            value={url} 
            size={size} 
            level="H" 
            includeMargin={true} 
            fgColor="#000000" 
            bgColor="#FFFFFF"
            className="rounded-lg md:rounded-xl"
          />
          <div className="absolute inset-0 bg-brand-forest/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 md:gap-3 w-full max-w-[280px]">
          <Button 
            onClick={downloadQR}
            variant="outline" 
            className="flex-1 gap-2 rounded-xl border-brand-forest/10 hover:bg-brand-forest hover:text-white transition-all duration-300 h-10 md:h-11 text-[10px] md:text-xs font-bold uppercase tracking-wider"
          >
            <Download className="w-3 md:w-3.5 h-3 md:h-3.5" />
            <span>Download</span>
          </Button>
          <Button 
            onClick={shareQR}
            variant="outline"
            className="flex-1 gap-2 rounded-xl border-brand-forest/10 hover:bg-brand-forest hover:text-white transition-all duration-300 h-10 md:h-11 text-[10px] md:text-xs font-bold uppercase tracking-wider"
          >
            <Share2 className="w-3 md:w-3.5 h-3 md:h-3.5" />
            <span>Share</span>
          </Button>
        </div>
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
