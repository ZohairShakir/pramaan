import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>Secured using blockchain technology</p>
        <p className={styles.copyright}>© 2026 Pramaan. All rights reserved.</p>
      </div>
    </footer>
  );
}
