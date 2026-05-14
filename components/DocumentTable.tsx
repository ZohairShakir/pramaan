'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye, Copy, Trash2, RotateCcw, FileText, CheckCircle2, AlertCircle, ShieldAlert, Loader2, MoreVertical, Search, ExternalLink, Globe, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  recipient?: string | null;
  issuerName?: string | null;
  verificationCount: number;
}

interface DocumentTableProps {
  documents?: Document[];
}

export default function DocumentTable({ documents }: DocumentTableProps) {
  const [isRevoking, setIsRevoking] = useState<string | null>(null);

  const handleRevoke = async (docId: string, currentStatus: string) => {
    const action = currentStatus === 'REVOKED' ? 'RESTORE' : 'REVOKE';
    setIsRevoking(docId);
    
    try {
      const response = await fetch(`/api/documents/${docId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          eventData: {
            reason: action === 'REVOKE' ? 'Document no longer valid' : 'Document re-validated',
            timestamp: new Date().toISOString()
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update document status');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error updating document:', error);
      setIsRevoking(null);
    }
  };

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/verify/${id}`);
    toast.success('Registry link copied to clipboard');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest/10 text-brand-forest border border-brand-forest/20 text-[9px] font-bold tracking-widest uppercase shadow-sm">
            <CheckCircle2 size={10} />
            VERIFIED
          </div>
        );
      case 'REVOKED':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-terracotta/10 text-brand-terracotta border border-brand-terracotta/20 text-[9px] font-bold tracking-widest uppercase shadow-sm">
            <ShieldAlert size={10} />
            REVOKED
          </div>
        );
      case 'TAMPERED':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-charcoal/10 text-brand-charcoal border border-brand-charcoal/20 text-[9px] font-bold tracking-widest uppercase shadow-sm">
            <AlertCircle size={10} />
            TAMPERED
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest/10 text-brand-forest border border-brand-forest/20 text-[9px] font-bold tracking-widest uppercase shadow-sm">
            <CheckCircle2 size={10} />
            ACTIVE
          </div>
        );
    }
  };

  if (!documents || documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 bg-white/40 rounded-[2.5rem] border border-brand-neutral/60 shadow-inner relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-brand-forest/5 flex items-center justify-center text-brand-forest/20 mb-6">
          <FileText size={40} />
        </div>
        <p className="text-xl font-serif font-bold text-brand-forest italic">The registry is currently empty.</p>
        <p className="text-sm text-brand-forest/40 font-medium mt-2">No genesis proofs have been anchored yet.</p>
        <Button asChild variant="brand" className="mt-8 rounded-xl h-12 px-8 text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-brand-forest/10">
          <Link href="/create">Anchor First Proof</Link>
        </Button>
        <div className="absolute inset-0 halftone-dots opacity-[0.03] pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-brand-neutral/60 bg-white/40 shadow-3xl backdrop-blur-xl">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-forest/5 border-b border-brand-neutral/40">
              <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-forest/30">Registry Entry</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-forest/30">Recipient</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-forest/30">Settlement Status</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-forest/30">Global Audits</th>
              <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-forest/30 text-right">Protocol Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-neutral/40">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-white transition-colors group relative">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-14 rounded-xl bg-white border border-brand-neutral flex items-center justify-center text-brand-forest/20 group-hover:text-brand-forest transition-colors shadow-sm">
                      <FileText size={24} />
                    </div>
                    <div className="space-y-1">
                      <div className="font-serif font-bold text-lg text-brand-forest leading-none italic">{doc.name}</div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-brand-forest/30 uppercase tracking-widest">
                        <Fingerprint size={10} />
                        #{doc.id.slice(0, 10).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-brand-forest italic">{doc.recipient || 'Public Root'}</div>
                  <div className="text-[10px] font-bold text-brand-forest/30 uppercase tracking-tighter">Authorized Subject</div>
                </td>
                <td className="px-8 py-6">
                  {getStatusBadge(doc.status)}
                </td>
                <td className="px-8 py-6">
                  <div className="text-xl font-serif font-bold text-brand-forest">{doc.verificationCount}</div>
                  <div className="text-[9px] text-brand-forest/40 font-bold uppercase tracking-[0.2em]">Verified Access</div>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-xl border-brand-neutral bg-white shadow-sm hover:border-brand-forest text-brand-forest/40 hover:text-brand-forest">
                      <Link href={`/verify/${doc.id}`} title="Verify Integrity">
                        <Eye size={18} />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-brand-neutral bg-white shadow-sm hover:border-brand-forest text-brand-forest/40 hover:text-brand-forest" onClick={() => copyLink(doc.id)} title="Copy Genesis Proof Link">
                      <Copy size={18} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={cn(
                        "h-10 w-10 rounded-xl border-brand-neutral bg-white shadow-sm transition-all",
                        doc.status === 'REVOKED' ? "text-brand-forest border-brand-forest hover:bg-brand-forest/5" : "text-brand-forest/40 hover:text-brand-terracotta hover:border-brand-terracotta"
                      )}
                      onClick={() => handleRevoke(doc.id, doc.status)}
                      disabled={isRevoking === doc.id}
                      title={doc.status === 'REVOKED' ? 'Settlement Recovery' : 'Withdraw Proof'}
                    >
                      {isRevoking === doc.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : doc.status === 'REVOKED' ? (
                        <RotateCcw size={18} />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Card Layout */}
      <div className="md:hidden divide-y divide-brand-neutral/40">
        {documents.map((doc) => (
          <div key={doc.id} className="p-6 space-y-6 hover:bg-white transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-12 rounded-lg bg-white border border-brand-neutral flex items-center justify-center text-brand-forest shadow-sm">
                  <FileText size={20} />
                </div>
                <div className="space-y-0.5">
                  <div className="font-serif font-bold text-base text-brand-forest italic">{doc.name}</div>
                  <div className="text-[9px] font-bold text-brand-forest/30 uppercase tracking-widest">#{doc.id.slice(0, 10).toUpperCase()}</div>
                </div>
              </div>
              {getStatusBadge(doc.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[9px] font-bold text-brand-forest/30 uppercase tracking-widest">Authorized Subject</div>
                <div className="text-xs font-bold text-brand-forest italic truncate">{doc.recipient || 'Public Root'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-bold text-brand-forest/30 uppercase tracking-widest">Global Audits</div>
                <div className="text-sm font-serif font-bold text-brand-forest">{doc.verificationCount} Hits</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button asChild variant="brand" className="flex-1 h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                <Link href={`/verify/${doc.id}`}>
                  <Eye size={14} className="mr-2" /> Verify
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-brand-neutral bg-white shadow-sm text-brand-forest/40" onClick={() => copyLink(doc.id)}>
                <Copy size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "h-11 w-11 rounded-xl border-brand-neutral bg-white shadow-sm",
                  doc.status === 'REVOKED' ? "text-brand-forest border-brand-forest" : "text-brand-forest/40"
                )}
                onClick={() => handleRevoke(doc.id, doc.status)}
                disabled={isRevoking === doc.id}
              >
                {isRevoking === doc.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : doc.status === 'REVOKED' ? (
                  <RotateCcw size={16} />
                ) : (
                  <Trash2 size={16} />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-8 bg-brand-forest/5 border-t border-brand-neutral/40 flex justify-between items-center">
        <div className="text-[10px] font-bold text-brand-forest/40 uppercase tracking-[0.3em]">Institutional Grade Registry</div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-terracotta uppercase tracking-[0.3em]">
          <Globe size={12} />
          Settled on Polygon Network
        </div>
      </div>
    </div>
  );
}
