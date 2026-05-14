'use client';

import { useState, useEffect } from 'react';
import styles from './VerificationReveal.module.css';

interface Props {
  status: 'verified' | 'revoked' | 'tampered';
  children: React.ReactNode;
}

export default function VerificationReveal({ status, children }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start the expansion after a tiny delay
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);

    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(revealTimer);
    };
  }, []);

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'verified': return styles.verified;
      case 'revoked': return styles.revoked;
      case 'tampered': return styles.tampered;
      default: return styles.verified;
    }
  };

  return (
    <>
      {!isRevealed && (
        <div className={`${styles.overlay} ${!isAnimating ? styles.fadeOut : ''}`}>
          <div className={`${styles.dot} ${getStatusColor(status)} ${!isAnimating ? styles.expand : ''}`}></div>
          <div className={styles.revealText}>Decentralizing Trust...</div>
        </div>
      )}
      <div className={`${styles.content} ${isRevealed ? styles.show : ''}`}>
        {children}
      </div>
    </>
  );
}
