import Link from 'next/link';
import { Building2, Globe, ArrowUpRight } from 'lucide-react';
import TrustBadge from '@/components/TrustBadge';
import { cn } from '@/lib/utils';

interface IssuerCardProps {
  name: string;
  trustScore: number;
  isVerified: boolean;
  organizationName?: string | null;
  userId?: string;
  className?: string;
}

export default function IssuerCard({
  name,
  trustScore,
  isVerified,
  organizationName,
  userId,
  className,
}: IssuerCardProps) {
  const orgDisplay = organizationName || name || 'Unknown Issuer';

  return (
    <div className={cn(
      'rounded-2xl border p-5 space-y-4 transition-all',
      isVerified
        ? 'bg-white border-emerald-100 shadow-sm'
        : 'bg-white border-[#e8e6e1]',
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0',
            isVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-[#2D3B2D]/[0.06] text-[#2D3B2D]/50'
          )}>
            <Building2 size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-[#2D3B2D]/35 font-semibold uppercase tracking-[0.15em]">
              Issued By
            </p>
            <p className="text-sm font-bold text-[#2D3B2D] truncate">{orgDisplay}</p>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <TrustBadge score={trustScore} size="md" />

      {/* Meta */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2D3B2D]/[0.04]">
        <div className="flex items-center gap-1.5 text-[#2D3B2D]/30">
          <Globe size={11} />
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            {isVerified ? 'Verified Institution' : 'Unverified Issuer'}
          </span>
        </div>
        {userId && (
          <Link
            href={`/issuer/${userId}`}
            className="text-[10px] font-bold text-[#2D3B2D]/40 hover:text-[#2D3B2D] uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            Profile <ArrowUpRight size={10} />
          </Link>
        )}
      </div>
    </div>
  );
}
