import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';
import Link from 'next/link';

export default async function DashboardPage() {
  // Fetch recent documents from the database
  const documents = await prisma.document.findMany({
    orderBy: { verifiedOn: 'desc' },
    take: 10
  });

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.eyebrow}>Network Activity</div>
            <h1 className={styles.title}>System<br />Registry</h1>
          </div>

          <div className={styles.activityGrid}>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <Link key={doc.id} href={`/verify/${doc.id}`} className={styles.ticketCard}>
                  <div className={styles.cardLeft}>
                    <div className={styles.statusIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div className={styles.docInfo}>
                      <span className={styles.docName}>{doc.name}</span>
                      <span className={styles.docMeta}>
                        Anchored {doc.verifiedOn?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()} • {doc.id.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.cardRight}>
                    <div className={styles.badge}>Immutable</div>
                    <div className={styles.chevron}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No documents found in the registry.</p>
                <Link href="/create" className={styles.ctaButton}>
                  Anchor Your First Proof
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
