import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <Link href="/" className={styles.logo}>
          Pramaan
        </Link>
        <nav className={styles.menu}>
          <Link href="/dashboard" className={`${styles.menuItem} ${styles.active}`}>
            <span className={styles.icon}>📊</span> Dashboard
          </Link>
          <Link href="/create" className={styles.menuItem}>
            <span className={styles.icon}>📤</span> Upload Document
          </Link>
          <Link href="/dashboard" className={styles.menuItem}>
            <span className={styles.icon}>📂</span> My Documents
          </Link>
          <Link href="/verify" className={styles.menuItem}>
            <span className={styles.icon}>🔍</span> Verification
          </Link>
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className={styles.profile}>
          <div className={styles.avatar}>RS</div>
          <div className={styles.profileInfo}>
            <p className={styles.userName}>Rohit Sharma</p>
            <p className={styles.userRole}>Premium Account</p>
          </div>
        </div>
        <p className={styles.securedLink}>
          <span className={styles.dot}></span> Secured by Polygon
        </p>
      </div>
    </aside>
  );
}
