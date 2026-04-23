'use client';

import { useState } from 'react';
import styles from './DocumentDetailsModal.module.css';
import DocumentPreviewWrapper from './DocumentPreviewWrapper';

interface Props {
  details: {
    name: string;
    issuer: string;
    issuedOn: string;
    status: string;
    hash: string;
    id: string;
    fileUrl?: string;
    mimeType?: string | null;
  };
}

export default function DocumentDetailsModal({ details }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The trigger row */}
      <div className={styles.actionRow} onClick={() => setIsOpen(true)}>
        <div className={styles.actionLeft}>
          <div className={styles.actionIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <span className={styles.actionText}>Document Details</span>
        </div>
        <div className={styles.chevron}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      {/* The Modal */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalContent}>
              {/* Left Panel: Metadata */}
              <div className={styles.metaPanel}>
                <div className={styles.modalHeader}>
                  <div className={styles.badge}>RECORD DATA</div>
                </div>

                <div className={styles.modalBody}>
                  <h2 className={styles.docName}>{details.name}</h2>
                  <p className={styles.docId}>ID: {details.id}</p>

                  <div className={styles.divider}></div>

                  <div className={styles.metaGrid}>
                    <div className={styles.metaItem}>
                      <span className={styles.label}>Authority</span>
                      <span className={styles.value}>{details.issuer}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.label}>Timestamp</span>
                      <span className={styles.value}>{details.issuedOn}</span>
                    </div>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.hashSection}>
                    <span className={styles.label}>Cryptographic Fingerprint</span>
                    <code className={styles.hashCode}>{details.hash}</code>
                  </div>
                </div>
              </div>

              {/* Right Panel: Preview */}
              <div className={styles.previewPanel}>
                <div className={styles.modalHeader}>
                  <div className={styles.badge}>DOCUMENT PREVIEW</div>
                  <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                
                <div className={styles.previewContainer}>
                  {details.fileUrl ? (
                    <DocumentPreviewWrapper 
                      fileUrl={details.fileUrl} 
                      mimeType={details.mimeType || null}
                      fileName={details.name}
                    />
                  ) : (
                    <div className={styles.noPreview}>No preview available</div>
                  )}
                </div>

                <button className={styles.actionBtn} onClick={() => setIsOpen(false)}>
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
