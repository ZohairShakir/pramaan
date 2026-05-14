import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ShieldCheck, Download, ExternalLink, ArrowRight, Search, Clock, Fingerprint, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function UserLockerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const userEmail = session.user?.email;

  // Find all documents where the recipient email matches the user's email
  // Or where the recipient field contains the user's name (fallback)
  const documents = await prisma.document.findMany({
    where: {
      OR: [
        { recipientEmail: userEmail },
        { recipientName: session.user?.name }
      ]
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal selection:bg-brand-terracotta selection:text-white halftone">

      <main className="pt-32 pb-32 px-6 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-brand-neutral pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full border border-brand-neutral bg-white/50 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-forest">
                Personal Vault
              </div>
              <div className="h-px w-12 bg-brand-neutral/50" />
            </div>
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-brand-forest tracking-[-0.06em] leading-[0.8] uppercase">
              Vault <br /><span className="italic font-light text-brand-forest/20">Genesis.</span>
            </h1>
            <p className="text-xl text-brand-forest/40 font-medium italic max-w-md">
              "Every record in this vault is a cryptographically signed node of your identity."
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-bold text-brand-forest/40 uppercase tracking-widest">Active Identity</p>
              <p className="text-sm font-bold text-brand-forest">{userEmail}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-forest flex items-center justify-center text-brand-cream shadow-xl">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        {/* Search & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-forest/30 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your vault..."
              className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-white/40 border-brand-neutral focus:border-brand-forest transition-all text-sm font-bold placeholder:text-brand-forest/20 shadow-inner"
            />
          </div>
          <div className="md:col-span-4 bg-brand-forest text-brand-cream p-6 rounded-[2rem] flex items-center justify-between shadow-2xl">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Stored Assets</p>
              <p className="text-3xl font-serif font-bold italic">{documents.length} Proofs</p>
            </div>
            <Globe className="text-brand-terracotta opacity-40" size={32} />
          </div>
        </div>

        {/* Documents Grid */}
        {documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map((doc) => (
              <Card key={doc.id} className="group relative overflow-hidden rounded-[2.5rem] border-brand-neutral/60 bg-white/40 hover:bg-white transition-all shadow-3xl hover:-translate-y-1 duration-500">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-18 bg-white border border-brand-neutral rounded-xl flex items-center justify-center text-brand-forest/20 group-hover:text-brand-forest transition-colors shadow-sm">
                      <FileText size={28} />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-brand-forest/5 text-[9px] font-bold text-brand-forest tracking-widest uppercase border border-brand-forest/10">
                      {doc.status}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-brand-forest leading-tight truncate italic">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-bold text-brand-forest/40 uppercase tracking-widest">
                      Issued by {doc.issuerName || 'Pramaan Network'}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-brand-neutral/40">
                    <div className="flex items-center gap-2 text-brand-forest/30">
                      <Clock size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Link href={`/verify/${doc.id}`} className="p-2 rounded-lg bg-brand-forest/5 text-brand-forest hover:bg-brand-forest hover:text-brand-cream transition-all">
                      <ArrowRight size={18} />
                    </Link>
                  </div>

                  {/* Fingerprint decoration */}
                  <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <Fingerprint size={120} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-8 bg-white/20 rounded-[3rem] border border-dashed border-brand-neutral/60 halftone relative overflow-hidden">
            <div className="w-24 h-24 rounded-full bg-brand-forest/5 flex items-center justify-center text-brand-forest/10 mx-auto">
              <FileText size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-serif font-bold text-brand-forest italic">Your vault is ready.</h3>
              <p className="text-sm text-brand-forest/40 font-medium max-w-sm mx-auto">
                When institutions issue proofs to your identity ({userEmail}), they will appear here automatically.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-xl border-brand-neutral bg-white/40">
              <Link href="/verify">Verify a Public Proof</Link>
            </Button>
            <div className="absolute inset-0 halftone-dots opacity-[0.03] pointer-events-none" />
          </div>
        )}
      </main>

      <Footer />
      <div className="fixed inset-0 halftone-dots opacity-[0.02] pointer-events-none" />
    </div>
  );
}
