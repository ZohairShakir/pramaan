import { ShieldCheck, Shield, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function getTrustTier(score: number) {
  if (score >= 90) return { tier: 'Platinum', color: 'emerald', label: 'Platinum Verified', icon: ShieldCheck };
  if (score >= 70) return { tier: 'Gold', color: 'blue', label: 'Gold Verified', icon: ShieldCheck };
  if (score >= 50) return { tier: 'Pending', color: 'amber', label: 'Pending Review', icon: Clock };
  return { tier: 'Unverified', color: 'red', label: 'Unverified', icon: AlertTriangle };
}

export default function TrustBadge({ score, size = 'md', showLabel = true, className }: TrustBadgeProps) {
  const { tier, color, label, icon: Icon } = getTrustTier(score);

  const sizes = {
    sm: { badge: 'px-2.5 py-1 gap-1.5', icon: 11, text: 'text-[9px]', score: 'text-[10px]' },
    md: { badge: 'px-3 py-1.5 gap-2', icon: 13, text: 'text-[10px]', score: 'text-[11px]' },
    lg: { badge: 'px-4 py-2 gap-2.5', icon: 16, text: 'text-[11px]', score: 'text-xs' },
  };

  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  const s = sizes[size];

  return (
    <div className={cn(
      'inline-flex items-center rounded-full border font-bold tracking-wider uppercase',
      s.badge,
      colors[color],
      className
    )}>
      <Icon size={s.icon} />
      {showLabel && <span className={s.text}>{label}</span>}
      <span className={cn(s.score, 'font-bold tabular-nums')}>{score.toFixed(1)}</span>
    </div>
  );
}
