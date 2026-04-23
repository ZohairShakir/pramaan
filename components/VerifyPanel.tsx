import styles from './VerifyPanel.module.css';

export default function VerifyPanel() {
  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Verify Instantly</h3>
      <p className={styles.description}>Scan a document QR or paste a verification link to check its status.</p>
      
      <div className={styles.scannerMock}>
        <div className={styles.scannerLine}></div>
        <div className={styles.qrIcon}>🔳</div>
      </div>
      
      <div className={styles.inputGroup}>
        <input 
          type="text" 
          placeholder="Paste verification link" 
          className={styles.input}
        />
        <button className={styles.verifyBtn}>Check</button>
      </div>
      
      <div className={styles.editorial}>
        <div className={styles.lineArt}></div>
        <p className={styles.quote}>Every document deserves proof.</p>
      </div>
    </div>
  );
}
