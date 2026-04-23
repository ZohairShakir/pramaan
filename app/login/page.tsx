'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Top Navigation */}
        <div className={styles.topNav}>
          <div className={styles.navLeft}>
            <div className={styles.navDot}></div>
            <span className={styles.pageTitle}>Account Access</span>
          </div>
          <Link href="/" className={styles.homeBtn} aria-label="Go home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Link>
        </div>

        {/* Login Ticket Card */}
        <div className={styles.ticketCard}>
          <div className={styles.cardIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>

          <h1 className={styles.title}>
            System <span className={styles.accentText}>Login</span>
          </h1>
          <p className={styles.subtitle}>
            Enter your credentials to access the Pramaan registry and document anchoring hub.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input 
                type="email" 
                placeholder="EMAIL@NETWORK.COM" 
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.divider}></div>

            <button type="submit" disabled={isLoading} className={styles.actionButton}>
              {isLoading ? <div className={styles.spinner}></div> : 'AUTHENTICATE & ACCESS'}
            </button>
          </form>

          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.footerText}>
          <Link href="/signup" className={styles.signupLink}>Don't have an account? <span className={styles.accentText}>Register</span></Link>
        </div>
      </main>
    </div>
  );
}
