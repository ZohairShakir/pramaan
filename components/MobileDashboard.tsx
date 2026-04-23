import DocumentTable from '@/components/DocumentTable';
import styles from './MobileDashboard.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MobileDashboard() {
  return (
    <div className={styles.mobileContainer}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Documents</h1>
          <p className={styles.subtitle}>View-only mode. Access desktop for management.</p>
        </div>
        
        <div className={styles.listContainer}>
          <DocumentTable />
        </div>
        
        <div className={styles.infoBox}>
          <p>
            You are viewing a secure read-only list of your digital proofs. To register new documents or download high-res QR codes, please sign in from a desktop browser.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
