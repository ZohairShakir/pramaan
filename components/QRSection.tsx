'use client';

import { QRCodeSVG } from 'qrcode.react';
import styles from './QRSection.module.css';

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
    <div className={styles.qrSection}>
      <div className={styles.qrPlaceholder}>
        <QRCodeSVG value={url} size={size} level="H" includeMargin={true} />
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>Scan to verify</h3>
        {!hideDescription && (
          <p className={styles.description}>
            Anyone can scan this QR code to verify this document&apos;s authenticity instantly.
          </p>
        )}
      </div>
    </div>
  );
}
