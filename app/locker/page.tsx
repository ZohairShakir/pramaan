import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import { FooterV2 as Footer } from '@/components/Landing/FooterV2';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { 
  FileText, ShieldCheck, Download, 
  ExternalLink, ArrowRight, Search, 
  Clock, Fingerprint, Globe, Lock,
  Share2, ArrowUpRight, Zap, Eye
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

export default async function UserLockerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const userEmail = session.user?.email || '';

  // Find all documents where the user is the recipient
  const documents = await prisma.document.findMany({
    where: {
      OR: [
        { recipientEmail: userEmail },
        { recipientName: session.user?.name || '' }
      ]
    },
    include: {
      user: true, // To get issuer details
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black relative overflow-hidden">
      <Navbar />
      
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F2E6E1]/30 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />

       <main className="pt-20 md:pt-32 pb-20 px-4 max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-widest text-black/50">
                    <Lock size={12} />
                    Personal Vault
                </div>
                <h1 className="text-6xl md:text-9xl font-bold tracking-tight leading-[0.8] uppercase">
                    Your <br /><span className="bg-lime px-4 py-1 rounded-sm">Locker.</span>
                </h1>
                <p className="text-lg md:text-xl text-black/40 font-medium leading-relaxed max-w-lg">
                    Access your cryptographically secured records, credentials, and institutional proofs in one immutable vault.
                </p>
            </div>
            
            <div className="bg-[#F8F8F8] rounded-3xl p-8 border border-black/5 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <ShieldCheck className="text-lime" size={24} />
                </div>
                <div>
                    <p className="text-2xl font-bold">{documents.length}</p>
                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Active Proofs</p>
                </div>
            </div>
        </div>

        {/* Search Bar */}
        <div className="relative group max-w-2xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search your vault by document name, issuer, or ID..."
            className="w-full pl-16 pr-8 py-6 bg-[#F8F8F8] border border-black/5 rounded-[2rem] text-sm font-bold outline-none focus:bg-white focus:border-black/10 transition-all shadow-inner"
          />
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div 
                key={doc.id}
                className="group relative bg-white rounded-[3rem] border border-black/5 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Status Badge */}
                <div className="absolute top-8 right-8">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 text-[9px] font-bold text-black/60 uppercase tracking-widest border border-lime/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                        {doc.status}
                    </div>
                </div>

                <div className="space-y-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8F8F8] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    <FileText size={28} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight leading-tight group-hover:text-black transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest flex items-center gap-2">
                      <Building className="w-3 h-3" />
                      Issued by {doc.user?.organizationName || doc.user?.name || 'Pramaan Network'}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-black/5 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[9px] font-bold text-black/20 uppercase tracking-widest">Date</p>
                        <p className="text-xs font-bold">{new Date(doc.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-bold text-black/20 uppercase tracking-widest">Network</p>
                        <p className="text-xs font-bold flex items-center gap-1.5">
                            <Globe size={10} className="text-lime" />
                            Polygon
                        </p>
                    </div>
                </div>

                  <div className="flex items-center gap-3">
                    <Link 
                      href={`/verify/${doc.id}`}
                      className="flex-1 bg-black text-white h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-black/90 transition-all"
                    >
                      <Eye size={14} /> View Proof
                    </Link>
                    <button className="w-12 h-12 bg-[#F8F8F8] border border-black/5 rounded-xl flex items-center justify-center hover:bg-black hover:text-white transition-all">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#CAFF0005,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center space-y-8 bg-[#F8F8F8] rounded-[4rem] border border-black/5 border-dashed">
              <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-sm text-black/10">
                <Fingerprint size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold uppercase tracking-tight">Vault is Empty</h3>
                <p className="text-sm font-medium text-black/30 max-w-xs mx-auto italic">
                    No institutional records were found matching your identity credentials.
                </p>
              </div>
              <Link href="/verify" className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl text-xs font-bold">
                Verify New Document <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Global Security Disclaimer */}
        <div className="pt-24 border-t border-black/5 flex flex-col items-center gap-6 text-center">
            <Logo size={40} className="opacity-10" />
            <div className="space-y-2">
                <p className="text-[10px] font-bold text-black/20 uppercase tracking-[0.4em]">Pramaan Locker v2.1</p>
                <p className="text-xs font-medium text-black/40 max-w-md">
                    Documents are retrieved using zero-knowledge identity matching. Your files are encrypted at rest and hashed on the Polygon blockchain.
                </p>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Missing icon from import
function Building({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}
