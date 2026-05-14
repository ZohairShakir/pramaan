import { createWorker } from 'tesseract.js';

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

export async function scanDocument(imageSource: string | File): Promise<{ issuer?: string; recipient?: string; rawText: string }> {
  const worker = await createWorker('eng', 1);
  
  const { data: { text } } = await worker.recognize(imageSource);
  
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2);
  
  let issuer = '';
  let recipient = '';

  const nameIndicators = ['certifies that', 'presented to', 'name:', 'this is to certify', 'awarded to', 'proudly presented to'];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    
    // 1. Better Issuer Detection
    if (!issuer && (line.includes('university') || line.includes('institute') || line.includes('corp') || line.includes('board') || line.includes('company') || line.includes('academy') || line.includes('school'))) {
      issuer = lines[i];
    }
    
    // 2. Sophisticated Recipient Detection
    for (const indicator of nameIndicators) {
      if (line.includes(indicator)) {
        // Check same line first (e.g. "This certifies that John Doe")
        const index = line.indexOf(indicator);
        const afterIndicator = lines[i].substring(index + indicator.length).trim();
        
        // Remove common filler words after indicator
        const cleanedAfter = afterIndicator.replace(/^(that|is|was|to)\s+/i, '').trim();
        
        if (isPotentialName(cleanedAfter)) {
          recipient = cleanedAfter;
          break;
        }

        // Check next 3 lines for the name
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

  // Fallbacks with stricter checks
  if (!issuer && lines.length > 0) {
    // Usually the issuer is at the top
    for (let i = 0; i < Math.min(3, lines.length); i++) {
       if (lines[i].length < 50 && !isPotentialName(lines[i])) { // Issuers are often longer/official
          issuer = lines[i];
          break;
       }
    }
  }

  if (!recipient) {
    // Look for lines that look like names but weren't caught by indicators
    for (const line of lines) {
      if (isPotentialName(line) && line.length > 5) {
        recipient = line;
        break;
      }
    }
  }

  await worker.terminate();
  
  return { issuer, recipient, rawText: text };
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

