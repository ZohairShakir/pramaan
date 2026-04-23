import styles from './DashboardStatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
}

export default function DashboardStatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>{icon}</div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </div>
  );
}
