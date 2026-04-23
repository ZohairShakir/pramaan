'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoDot}></div>
          Pramaan
        </Link>
        
        <div className={`${styles.links} ${isMenuOpen ? styles.linksOpen : ''}`}>
          <Link href="/" className={styles.link} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/verify" className={styles.link} onClick={() => setIsMenuOpen(false)}>Verify</Link>
          
          {status === 'authenticated' ? (
            <>
              <Link href="/create" className={styles.link} onClick={() => setIsMenuOpen(false)}>Register</Link>
              <Link href="/dashboard" className={styles.link} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => signOut()} className={styles.signOutBtn}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.link} onClick={() => setIsMenuOpen(false)}>Sign In</Link>
            </>
          )}
        </div>

        <button 
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </nav>
  );
}
