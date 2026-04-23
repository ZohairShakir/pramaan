'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../login/login.module.css'; // Reusing login styles

export default function SignupPage() {
  const [name, setName] = useState('');
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
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Automatically sign in after signup
      router.push('/login?msg=success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.topNav}>
          <div className={styles.navLeft}>
            <div className={styles.navDot}></div>
            <span className={styles.pageTitle}>Create Account</span>
          </div>
          <Link href="/" className={styles.homeBtn} aria-label="Go home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Link>
        </div>

        <div className={styles.ticketCard}>
          <div className={styles.cardIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          </div>

          <h1 className={styles.title}>
            Network <span className={styles.accentText}>Join</span>
          </h1>
          <p className={styles.subtitle}>
            Register your identity on the Pramaan network to start anchoring and managing immutable documents.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <input 
                type="text" 
                placeholder="YOUR NAME" 
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              {isLoading ? <div className={styles.spinner}></div> : 'CREATE & INITIALIZE'}
            </button>
          </form>

          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.footerText}>
          <Link href="/login" className={styles.signupLink}>Already have an account? <span className={styles.accentText}>Login</span></Link>
        </div>
      </main>
    </div>
  );
}
