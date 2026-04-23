'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Pramaan
        </Link>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/verify" className={styles.link}>Verify</Link>
          
          {status === 'authenticated' ? (
            <>
              <Link href="/create" className={styles.link}>Register</Link>
              <Link href="/dashboard" className={styles.link}>Dashboard</Link>
              <button onClick={() => signOut()} className={styles.link} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.link}>Sign In</Link>
            </>
          )}
        </div>
        <div className={styles.menuButton}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
