'use client';

import { useRef, useState } from 'react';
import styles from './verify-input.module.css';
import Link from 'next/link';

export default function VerifyInputPage() {
  const [verifyId, setVerifyId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleVerifyFile = async (file: File) => {
    setIsVerifying(true);
    setVerifyError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/verify', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.found) {
        throw new Error(data.message || 'Document not found in blockchain records');
      }

      window.location.href = `/verify/${data.document.id}`;
    } catch (err) {
      console.error('Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify document';
      setVerifyError(errorMessage);
      setIsVerifying(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      e.target.value = '';
      handleVerifyFile(file);
    }
  };

  const triggerGallery = () => fileInputRef.current?.click();
  const triggerCamera = () => cameraInputRef.current?.click();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Top Premium Navigation Bar */}
        <div className={styles.topNav}>
          <div className={styles.navLeft}>
            <div className={styles.navDot}></div>
            <span className={styles.pageTitle}>Verification Hub</span>
          </div>
          <Link href="/" className={styles.homeBtn} aria-label="Go home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Link>
        </div>

        {/* Main Ticket Card */}
        <div className={styles.ticketCard}>
          <div className={styles.cardIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>

          <h1 className={styles.title}>
            Secure <span className={styles.accentText}>Check</span>
          </h1>
          <p className={styles.subtitle}>
            Authenticate any Pramaan-anchored document using its unique ID or by uploading the original file.
          </p>

          <div className={styles.inputSection}>
            <input 
              type="text" 
              placeholder="ENTER VERIFICATION ID" 
              className={styles.input}
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
            />
            <Link href={`/verify/${verifyId || 'demo'}`} className={styles.verifyButton}>
              Authenticate ID
            </Link>
          </div>

          <div className={styles.divider}>
            <span>SECURE UPLOAD</span>
          </div>

          {/* File Upload Area */}
          <div className={`${styles.uploadBox} ${isVerifying ? styles.verifying : ''}`}>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept=".pdf,.docx,.jpg,.png"
            />
            <input 
              type="file" 
              ref={cameraInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*"
              capture="environment"
            />

            {isVerifying ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p className={styles.uploadText}>Analysing Hash...</p>
              </div>
            ) : (
              <>
                <p className={styles.uploadText}>Drop document to verify</p>
                <div className={styles.compactOptions}>
                  <button onClick={triggerGallery} className={styles.compactBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                    Browse
                  </button>
                  <button onClick={triggerCamera} className={styles.compactBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    Capture
                  </button>
                </div>
              </>
            )}
          </div>

          {verifyError && (
            <div className={styles.error}>
              {verifyError}
            </div>
          )}
        </div>

        <div className={styles.footerText}>
          Pramaan Cryptographic Verification Protocol
        </div>
      </main>
    </div>
  );
}
