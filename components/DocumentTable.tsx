import styles from './DocumentTable.module.css';
import Link from 'next/link';

const MOCK_DOCS = [
  { id: 'v101', name: 'Degree Certificate', type: 'Academic', date: '21 Apr 2026', status: 'verified' },
  { id: 'v102', name: 'Offer Letter - TechCorp', type: 'Employment', date: '15 Apr 2026', status: 'verified' },
  { id: 't103', name: 'Lease Agreement', type: 'Legal', date: '10 Apr 2026', status: 'tampered' },
  { id: 'v104', name: 'Freelance Contract', type: 'Work', date: '08 Apr 2026', status: 'verified' },
];

export default function DocumentTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Type</th>
            <th>Created On</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_DOCS.map((doc) => (
            <tr key={doc.id} className={styles.row}>
              <td className={styles.nameCell}>
                <span className={styles.docIcon}>📄</span>
                {doc.name}
              </td>
              <td className={styles.typeCell}>{doc.type}</td>
              <td className={styles.dateCell}>{doc.date}</td>
              <td>
                <span className={`${styles.status} ${styles[doc.status]}`}>
                  {doc.status.toUpperCase()}
                </span>
              </td>
              <td className={styles.actionsCell}>
                <Link href={`/verify/${doc.id}`} className={styles.actionIcon} title="View">👁</Link>
                <button className={styles.actionIcon} title="Copy Link">🔗</button>
                <button className={styles.actionIcon} title="Download QR">📱</button>
                <button className={styles.actionIcon} title="More">⋯</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
