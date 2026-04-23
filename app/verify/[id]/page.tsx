import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QRSection from '@/components/QRSection';
import DocumentPreviewWrapper from '@/components/DocumentPreviewWrapper';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DocumentDetailsModal from '@/components/DocumentDetailsModal';

export default async function VerificationPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  // Handle Demo States
  let document = null;
  let status: 'verified' | 'tampered' = 'tampered';
  let details: any = null;

  if (id === 'v_demo') {
    status = 'verified';
    details = {
      name: "Architectural Diploma (Demo)",
      issuer: "Pramaan Academy of Design",
      issuedOn: "OCT 24, 2024",
      status: "AUTHENTICATED",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      mimeType: "application/pdf",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    };
    document = {
      fileUrl: details.fileUrl,
      mimeType: details.mimeType
    };
  } else if (id === 't_demo') {
    status = 'tampered';
    details = {
      name: "Modified Transcript (Demo)",
      issuer: "Unknown / Unverified Source",
      issuedOn: "INVALID DATE",
      status: "TAMPERED / ALTERED",
      hash: "0000000000000000000000000000000000000000000000000000000000000000",
      mimeType: null,
      fileUrl: null
    };
  } else {
    // Normal DB Lookup
    document = await prisma.document.findUnique({
      where: { id }
    });

    if (document) {
      status = 'verified';
      details = {
        name: document.name,
        issuer: "Pramaan Network",
        issuedOn: document.verifiedOn?.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }).toUpperCase() || 'OCT 25, 2026',
        status: 'AUTHENTICATED',
        hash: document.hash,
        mimeType: document.mimeType,
        fileUrl: document.fileUrl
      };
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Top Premium Navigation Bar */}
        <div className={styles.topNav}>
          <div className={styles.navLeft}>
            <div className={styles.navDot}></div>
            <span className={styles.pageTitle}>Verification Result</span>
          </div>
          <Link href="/" className={styles.homeBtn} aria-label="Go home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Link>
        </div>

        {/* Main Ticket Card */}
        <div className={styles.ticketCard}>
          {/* Top Status & Preview Row */}
          <div className={styles.cardHeader}>
            <div className={`${styles.statusCircle} ${status === 'verified' ? styles.verified : styles.invalid}`}>
              {status === 'verified' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              )}
            </div>
            <div className={styles.previewCircle}>
              {status === 'verified' && details?.fileUrl ? (
                <DocumentPreviewWrapper 
                  fileUrl={details.fileUrl} 
                  mimeType={details.mimeType || null}
                  fileName={details.name}
                />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              )}
            </div>
          </div>

          <h1 className={styles.documentTitle}>
            {details?.name || 'Document Not Found'}
          </h1>

          <div className={styles.badgeRow}>
            {status === 'verified' ? (
              <>
                <div className={styles.badge}>AUTHENTIC</div>
                <div className={styles.badge}>#{id.slice(0, 5).toUpperCase()}</div>
              </>
            ) : (
              <div className={`${styles.badge} ${styles.error}`}>INVALID / TAMPERED</div>
            )}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.infoSection}>
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <span className={styles.label}>Global / UTC</span>
                <span className={styles.value}>Issued on {details?.issuedOn || 'N/A'}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.label}>Account Status</span>
                <span className={styles.value} style={{ color: status === 'verified' ? 'var(--accent)' : 'var(--error)' }}>
                  {status === 'verified' ? 'VALIDATED' : 'NOT FOUND'}
                </span>
              </div>
            </div>

            {status === 'verified' && (
              <div className={styles.qrWrapper}>
                <QRSection url={`${process.env.NEXTAUTH_URL || ''}/verify/${id}`} size={80} />
              </div>
            )}
          </div>
        </div>

        {/* Action Rows / Details Section */}
        {status === 'verified' && details && (
          <div className={styles.actionRows}>
            <DocumentDetailsModal details={{
              name: details.name,
              issuer: details.issuer,
              issuedOn: details.issuedOn,
              status: details.status,
              hash: details.hash,
              id: id,
              fileUrl: details.fileUrl || '',
              mimeType: details.mimeType || null
            }} />

            <div className={styles.actionRow}>
              <div className={styles.actionLeft}>
                <div className={styles.actionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                </div>
                <span className={styles.actionText}>Blockchain Hash</span>
              </div>
              <span className={styles.value} style={{ fontSize: '0.7rem', opacity: 0.5 }}>{details?.hash.slice(0, 16)}...</span>
            </div>

            <div className={styles.actionRow}>
              <div className={styles.actionLeft}>
                <div className={styles.actionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <span className={styles.actionText}>Security & Privacy</span>
              </div>
              <div className={styles.chevron}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          </div>
        )}

        {/* Tampered State Specific UI */}
        {status === 'tampered' && (
          <div className={styles.warningBox}>
            <div className={styles.warningHeader}>
              <div className={styles.warningIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h3>Security Alert</h3>
            </div>
            <p className={styles.warningText}>
              This document has been flagged as **UNVERIFIED**. The cryptographic hash does not match any record in the Pramaan blockchain registry.
            </p>
            <div className={styles.riskList}>
              <div className={styles.riskItem}>• Content may have been altered after anchoring.</div>
              <div className={styles.riskItem}>• The document might not have been registered yet.</div>
              <div className={styles.riskItem}>• This could be a fraudulent copy.</div>
            </div>
          </div>
        )}

        <div className={styles.footerText}>
          Powered by Pramaan Network Blockchain
        </div>
        
        <Link href="/" className={styles.footerText} style={{ marginTop: '2rem', display: 'block', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}
