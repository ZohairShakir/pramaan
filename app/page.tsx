'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';
import Link from 'next/link';

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.eyebrow}>Trust layered, not just stored</div>
            <h1 className={styles.title}>
              {isMobile ? (
                <>Don't trust. <span className={styles.accentText}>Verify</span> everything.</>
              ) : (
                <>Don’t trust documents.<br /><span className={styles.accentText}>Verify</span> them.</>
              )}
            </h1>
            <p className={styles.subtitle}>
              Pramaan anchors your most critical documents to the blockchain, 
              providing immutable proof of authenticity in a single click.
            </p>
            
            <div className={styles.heroActions}>
              <Link href="/verify" className={styles.primaryHeroButton}>
                Verify Now
              </Link>
              <Link href="/create" className={styles.secondaryHeroButton}>
                Register Proof
              </Link>
            </div>
          </section>

          {/* Feature Grid - Ticket Style */}
          <section className={styles.featureSection}>
            <div className={styles.featureGrid}>
              <div className={styles.ticketCard}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className={styles.badge}>Protocol 01</div>
                <h3>Immutable Proof</h3>
                <div className={styles.divider}></div>
                <p>Every document is anchored with a unique cryptographic fingerprint, creating a permanent record that cannot be altered or deleted.</p>
                <div className={styles.badge}>SECURE LAYER</div>
              </div>

              <div className={styles.ticketCard}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L22 22m-3 1l1-1"/></svg>
                </div>
                <div className={styles.badge}>Protocol 02</div>
                <h3>Instant Audit</h3>
                <div className={styles.divider}></div>
                <p>Verify any document in seconds. Our distributed ledger provides sub-second verification across any device, anywhere.</p>
                <div className={styles.badge}>REAL-TIME</div>
              </div>

              <div className={styles.ticketCard}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div className={styles.badge}>Protocol 03</div>
                <h3>Privacy First</h3>
                <div className={styles.divider}></div>
                <p>We never store the actual file. We only record the hash, ensuring your data stays private while its authenticity remains public.</p>
                <div className={styles.badge}>ENCRYPTED</div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className={styles.statsSection}>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>100%</span>
                <span className={styles.statLabel}>Immutable Records</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>&lt;1s</span>
                <span className={styles.statLabel}>Verification Speed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>0</span>
                <span className={styles.statLabel}>Data Leaks</span>
              </div>
            </div>
          </section>

          {/* Demo Section */}
          <section className={styles.demoSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Experience<br />The Network</h2>
            </div>
            <div className={styles.demoLinks}>
              <Link href="/verify/v_demo" className={styles.demoLink}>
                <span><span className={styles.accentText}>Verified</span> Certificate</span>
                <span className={styles.arrow}>→</span>
              </Link>
              <Link href="/verify/t_demo" className={styles.demoLink}>
                <span><span className={styles.errorText}>Tampered</span> Alert</span>
                <span className={styles.arrow}>→</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
