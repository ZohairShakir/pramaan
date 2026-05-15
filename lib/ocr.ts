import { createWorker, Worker } from 'tesseract.js';
import jsQR from 'jsqr';

let sharedWorker: Worker | null = null;

async function getWorker() {
  if (!sharedWorker) {
    sharedWorker = await createWorker('eng');
  }
  return sharedWorker;
}

/**
 * Scans an image for QR codes and extracts data if found
 */
export async function detectQRCode(imageSource: string | File): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        resolve(code.data);
      } else {
        resolve(null);
      }
    };
    
    img.onerror = () => resolve(null);
    
    if (typeof imageSource === 'string') {
      img.src = imageSource;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(imageSource);
    }
  });
}

/**
 * Validates if a string looks like a person's name (short, mostly capitalized words, no common verbs)
 */
function isPotentialName(text: string): boolean {
  if (!text) return false;
  const cleaned = text.trim();
  const words = cleaned.split(/\s+/);
  
  // Names are usually 1-4 words
  if (words.length === 0 || words.length > 5) return false;
  
  // Check for common non-name words in certificates
  const blackList = ['certifies', 'that', 'presented', 'awarded', 'to', 'this', 'is', 'has', 'successfully', 'completed', 'grade', 'score', 'date', 'signed'];
  if (words.some(w => blackList.includes(w.toLowerCase()))) return false;
  
  // Names usually start with capital letters (though OCR might miss some)
  const capitalizedWords = words.filter(w => /^[A-Z]/.test(w));
  if (capitalizedWords.length / words.length < 0.5) {
     // If less than half are capitalized, it might be a sentence fragment, 
     // but we allow it if it's short and clean since OCR can be shaky
     if (cleaned.length > 30) return false;
  }

  return true;
}

export async function scanDocument(imageSource: string | File): Promise<{ issuer?: string; recipient?: string; documentId?: string; rawText: string }> {
  // Priority 1: QR Code Detection
  let documentIdFromQR = '';
  try {
    const qrData = await detectQRCode(imageSource);
    if (qrData) {
      console.log("[OCR] QR Code detected:", qrData);
      // Try to extract ID from URL or raw data
      // Example: https://pramaan.io/verify/cl... or just the ID
      if (qrData.includes('/verify/')) {
        documentIdFromQR = qrData.split('/verify/').pop()?.split('?')[0] || '';
      } else if (qrData.length > 20) {
        documentIdFromQR = qrData;
      }
    }
  } catch (err) {
    console.error("[OCR] QR Detection failed:", err);
  }

  const worker = await getWorker();
  
  const { data: { text } } = await worker.recognize(imageSource);
  
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2);
  
  let issuer = '';
  let recipient = '';
  let documentId = documentIdFromQR;

  // 1. Registry ID detection (Fallback if QR didn't find it)
  if (!documentId) {
    const idPattern = /(PR_[0-9A-Z]{4,})|([0-9a-f]{32,64})/i;
    const idMatch = text.match(idPattern);
    if (idMatch) {
      documentId = idMatch[0].toUpperCase();
    }
  }

  const nameIndicators = ['certifies that', 'presented to', 'name:', 'this is to certify', 'awarded to', 'proudly presented to', 'of completion to'];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    
    // 2. Improved Issuer Detection
    if (!issuer && (line.includes('university') || line.includes('institute') || line.includes('corp') || line.includes('board') || line.includes('company') || line.includes('academy') || line.includes('school') || line.includes('network'))) {
      issuer = lines[i];
    }
    
    // 3. Sophisticated Recipient Detection
    for (const indicator of nameIndicators) {
      if (line.includes(indicator)) {
        const index = line.indexOf(indicator);
        const afterIndicator = lines[i].substring(index + indicator.length).trim();
        const cleanedAfter = afterIndicator.replace(/^(that|is|was|to)\s+/i, '').trim();
        
        if (isPotentialName(cleanedAfter)) {
          recipient = cleanedAfter;
          break;
        }

        for (let offset = 1; offset <= 3; offset++) {
          const nextLine = lines[i + offset];
          if (nextLine && isPotentialName(nextLine)) {
            recipient = nextLine;
            break;
          }
        }
      }
      if (recipient) break;
    }
  }

  // Fallbacks
  if (!issuer && lines.length > 0) {
    for (let i = 0; i < Math.min(3, lines.length); i++) {
       if (lines[i].length < 60 && !isPotentialName(lines[i])) {
          issuer = lines[i];
          break;
       }
    }
  }

  if (!recipient) {
    for (const line of lines) {
      if (isPotentialName(line) && line.length > 5 && line.length < 40) {
        recipient = line;
        break;
      }
    }
  }

  return { issuer, recipient, documentId, rawText: text };
}

export async function enhanceImage(canvas: HTMLCanvasElement): Promise<string> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas.toDataURL();

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Grayscale + Contrast
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    // Boost contrast
    const contrast = 1.2;
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    const newVal = factor * (avg - 128) + 128;
    
    data[i] = data[i + 1] = data[i + 2] = newVal;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png', 1.0);
}

/**
 * Compares two names for a fuzzy match
 */
export function fuzzyMatch(name1: string, name2: string): boolean {
  const n1 = name1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const n2 = name2.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!n1 || !n2) return false;
  return n1.includes(n2) || n2.includes(n1);
}

