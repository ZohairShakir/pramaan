import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import { FooterV2 as Footer } from '@/components/Landing/FooterV2';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import {
  FileText, ShieldCheck, Activity, ShieldAlert,
  Plus, ArrowUpRight, Globe, Fingerprint, Clock,
  CheckCircle2, Eye, ChevronRight, Layers, Hash,
  LayoutDashboard,
  Search,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const userId = (session.user as any)?.id;
  if (!userId) redirect('/login');

  const user = await prisma.user.findUnique({ where: { id: userId } });

  const stats = await prisma.document.aggregate({
    where: { userId },
    _count: { id: true },
    _sum: { verificationCount: true },
  });

  const activeCount = await prisma.document.count({ where: { userId, status: 'ACTIVE' } });
  const revokedCount = await prisma.document.count({ where: { userId, status: 'REVOKED' } });

  const docsWithActivity = await prisma.document.findMany({
    where: { userId },
    select: {
      name: true,
      history: {
        orderBy: { timestamp: 'desc' },
        take: 2,
      },
    },
  });
  
  const recentActivity = docsWithActivity
    .flatMap((doc) =>
      doc.history.map((ev) => ({
        ...ev,
        document: { name: doc.name },
      }))
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const total = stats._count.id;
  const totalVerifications = stats._sum.verificationCount || 0;
  const orgName = user?.organizationName || user?.name || 'Institutional Node';

  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black">
      <Navbar />

       <main className="pt-32 md:pt-48 pb-16 px-6 max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-widest text-black/50">
                    <LayoutDashboard size={12} />
                    Administrative Console
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    Welcome, <br /><span className="bg-lime px-4 py-1 rounded-sm inline-block mt-1 md:mt-2">{orgName.split(' ')[0]}</span>
                </h1>
            </div>
            <div className="flex gap-4">
                <Link href="/verify" className="h-14 px-8 rounded-2xl border border-black/10 flex items-center justify-center font-bold text-sm hover:bg-black/5 transition-all">
                    Search Registry
                </Link>
                <Link href="/create" className="h-14 px-8 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-sm hover:bg-black/90 transition-all shadow-xl shadow-black/10">
                    <Plus size={18} className="mr-2" />
                    Issue Document
                </Link>
            </div>
        </div>

        {/* ─── ROW 1: Hero + Activity ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Hero/Stat Card */}
          <div className="lg:col-span-2 bg-black rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F2E6E110,transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Network Status</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                            <span className="font-bold text-sm">Polygon Mainnet Sync</span>
                        </div>
                    </div>
                    <Logo size={50} className="opacity-80" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Total Proofs', value: total },
                        { label: 'Active', value: activeCount },
                        { label: 'Verified', value: totalVerifications },
                        { label: 'Revoked', value: revokedCount },
                    ].map((s) => (
                        <div key={s.label} className="space-y-2">
                            <div className="text-4xl md:text-6xl font-bold tracking-tighter">{s.value}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20 pt-8 border-t border-white/10">
                    <Globe size={14} />
                    Global Trust Index: 99.8%
                    <span className="mx-4 text-white/5">|</span>
                    <Fingerprint size={14} />
                    Genesis Keys Active
                </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#F8F8F8] rounded-[3rem] p-10 flex flex-col border border-black/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Activity</h3>
              <Clock size={18} className="text-black/20" />
            </div>

            <div className="flex-1 space-y-4">
              {recentActivity.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center">
                    <Activity size={20} className="text-black/20" />
                  </div>
                  <p className="text-xs text-black/30 font-bold uppercase tracking-widest">No Recent Audits</p>
                </div>
              ) : (
                recentActivity.map((ev, i) => (
                  <div key={ev.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/5 hover:border-black/20 transition-all group cursor-pointer">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      ev.eventType === 'VERIFIED' ? 'bg-lime text-black' : 'bg-black text-white'
                    )}>
                      {ev.eventType === 'VERIFIED' ? <CheckCircle2 size={16} /> : <FileText size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-black truncate">{ev.document.name}</p>
                      <p className="text-[10px] text-black/30 font-bold uppercase tracking-tight">
                        {ev.eventType} · {new Date(ev.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-black/10 group-hover:text-black transition-colors" />
                  </div>
                ))
              )}
            </div>

            <Link href="/create" className="mt-8 block w-full py-5 rounded-2xl bg-black text-white text-[10px] font-bold uppercase tracking-widest text-center hover:bg-black/90 transition-all">
              Anchor New Proof
            </Link>
          </div>
        </div>

        {/* ─── ROW 2: Info Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8F8F8] rounded-[2.5rem] p-10 space-y-6 border border-black/5">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                    <ShieldCheck size={24} />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-bold">Institutional Trust</h4>
                    <p className="text-sm text-black/40 font-medium leading-relaxed">Your organization is currently verified as a trusted issuer on the global registry.</p>
                </div>
            </div>

            <div className="bg-[#F2E6E1] rounded-[2.5rem] p-10 space-y-6 border border-black/5">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                    <Zap size={24} className="text-lime" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-bold">Real-time Metrics</h4>
                    <p className="text-sm text-black/40 font-medium leading-relaxed">Documents are settled on the Polygon network with average finality of 2.1s.</p>
                </div>
            </div>

            <div className="bg-black rounded-[2.5rem] p-10 space-y-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F2E6E105,transparent_70%)] pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Globe size={24} className="text-lime" />
                </div>
                <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-bold">Global Reach</h4>
                    <p className="text-white/40 text-sm font-medium leading-relaxed">Your proofs are verifiable by any stakeholder, anywhere in the world, instantly.</p>
                </div>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
