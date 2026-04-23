'use client';

import { useState, useRef, useMemo } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import QRSection from '@/components/QRSection';
import DocumentPreviewWrapper from '@/components/DocumentPreviewWrapper';

export default function CreateProofPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proof, setProof] = useState<{
    id: string;
    hash: string;
    date: string;
    verificationUrl: string;
    name: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const previewFile = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const handleGenerate = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/proof', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation failed');

      setProof({
        id: data.id,
        hash: data.hash,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
        verificationUrl: `${window.location.origin}/verify/${data.id}`,
        name: file.name
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsProcessing(false);
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
            <span className={styles.pageTitle}>Creation Hub</span>
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

          {!proof ? (
            <>
              <h1 className={styles.title}>
                Anchor <span className={styles.accentText}>Proof</span>
              </h1>
              <p className={styles.subtitle}>
                Generate an immutable digital fingerprint and anchor your document to the blockchain network.
              </p>

              <div className={`${styles.uploadBox} ${file ? styles.hasFile : ''}`}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".pdf,.docx,.jpg,.png" />
                <input type="file" ref={cameraInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" capture="environment" />

                {!file ? (
                  <>
                    <div className={styles.uploadIcon}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    </div>
                    <p className={styles.uploadText}>Drop document to anchor</p>
                    <div className={styles.compactOptions}>
                      <button onClick={triggerGallery} className={styles.compactBtn}>Browse</button>
                      <button onClick={triggerCamera} className={styles.compactBtn}>Capture</button>
                    </div>
                  </>
                ) : (
                  <div className={styles.filePreview}>
                    <div className={styles.previewCircle}>
                      <DocumentPreviewWrapper fileUrl={previewFile || ''} fileName={file.name} mimeType={file.type} />
                    </div>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.removeBtn} onClick={() => setFile(null)}>REMOVE</span>
                  </div>
                )}
              </div>

              <div className={styles.divider}></div>

              <button 
                onClick={handleGenerate} 
                disabled={!file || isProcessing} 
                className={`${styles.actionButton} ${(!file || isProcessing) ? styles.disabled : ''}`}
              >
                {isProcessing ? <div className={styles.spinner}></div> : 'GENERATE IMMUTABLE PROOF'}
              </button>
            </>
          ) : (
            <div className={styles.resultSection}>
              <h1 className={styles.title}>Proof <span className={styles.accentText}>Ready</span></h1>
              <p className={styles.subtitle}>Your document has been successfully anchored to the Pramaan network.</p>
              
              <div className={styles.qrContainer}>
                <span className={styles.qrLabel}>SCAN TO VERIFY</span>
                <QRSection url={proof.verificationUrl} size={150} />
              </div>

              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Document ID</span>
                  <span className={styles.metaValue}>{proof.id}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Anchored On</span>
                  <span className={styles.metaValue}>{proof.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Blockchain Hash</span>
                  <span className={styles.metaValue} style={{ fontSize: '0.6rem', opacity: 0.5 }}>{proof.hash.slice(0, 32)}...</span>
                </div>
              </div>

              <div className={styles.divider}></div>

              <button onClick={() => {setProof(null); setFile(null);}} className={styles.actionButton}>
                REGISTER ANOTHER
              </button>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.footerText}>
          Pramaan Cryptographic Anchoring Protocol
        </div>
      </main>
    </div>
  );
}
