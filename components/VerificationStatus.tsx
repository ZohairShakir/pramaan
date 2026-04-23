import styles from './VerificationStatus.module.css';

interface VerificationStatusProps {
  status: 'verified' | 'tampered' | 'not_found';
}

export default function VerificationStatus({ status }: VerificationStatusProps) {
  const content = {
    verified: {
      icon: '✔',
      title: 'VERIFIED',
      subtitle: 'This document is authentic and has not been altered.',
      colorClass: styles.verified,
    },
    tampered: {
      icon: '✖',
      title: 'TAMPERED',
      subtitle: 'This document has been modified and cannot be trusted.',
      colorClass: styles.tampered,
    },
    not_found: {
      icon: '?',
      title: 'NOT FOUND',
      subtitle: 'We could not find a blockchain record for this document.',
      colorClass: styles.notFound,
    },
  };

  const { icon, title, subtitle, colorClass } = content[status];

  return (
    <div className={`${styles.statusBlock} ${colorClass}`}>
      <div className={styles.icon}>{icon}</div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
