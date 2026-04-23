'use client';

import { useState, useEffect } from 'react';
import styles from './DesktopOnly.module.css';
import Link from 'next/link';

export default function DesktopOnly({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isClient) return null; // Prevent hydration mismatch

  if (isMobile) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.illustration}>💻</div>
          <h2 className={styles.title}>Desktop Experience Recommended</h2>
          <p className={styles.message}>
            Creation of digital proofs and advanced dashboard management are power-user features 
            optimized for desktop browsers.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.homeBtn}>Back to Home</Link>
            <Link href="/verify" className={styles.verifyBtn}>Verify a Document Instead</Link>
          </div>
           <p className={styles.editorial}>Precision requires a larger canvas.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
