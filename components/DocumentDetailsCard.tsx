import styles from './DocumentDetailsCard.module.css';

interface DocumentDetails {
  name: string;
  issuer: string;
  issuedOn: string;
  verifiedOn: string;
  transactionId: string;
}

interface DocumentDetailsCardProps {
  details: DocumentDetails;
}

export default function DocumentDetailsCard({ details }: DocumentDetailsCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Document Details</h2>
      <div className={styles.grid}>
        <div className={styles.row}>
          <span className={styles.label}>Document Name</span>
          <span className={styles.value}>{details.name}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Issued By</span>
          <span className={styles.value}>{details.issuer}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Issued On</span>
          <span className={styles.value}>{details.issuedOn}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Verified On</span>
          <span className={styles.value}>{details.verifiedOn}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Blockchain ID</span>
          <code className={styles.code}>{details.transactionId}</code>
        </div>
      </div>
    </div>
  );
}
