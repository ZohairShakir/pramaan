'use client';

import { useState, useEffect } from 'react';
import styles from './VerificationReveal.module.css';

interface Props {
  status: 'verified' | 'tampered';
  children: React.ReactNode;
}

export default function VerificationReveal({ status, children }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start the expansion after a tiny delay
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Animation duration matches CSS

    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <>
      {!isRevealed && (
        <div className={`${styles.overlay} ${!isAnimating ? styles.fadeOut : ''}`}>
          <div className={`${styles.dot} ${status === 'verified' ? styles.verified : styles.tampered} ${!isAnimating ? styles.expand : ''}`}></div>
        </div>
      )}
      <div className={`${styles.content} ${isRevealed ? styles.show : ''}`}>
        {children}
      </div>
    </>
  );
}
