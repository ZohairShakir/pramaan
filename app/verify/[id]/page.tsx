import { FooterV2 as Footer } from "@/components/Landing/FooterV2";
import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import { 
  ShieldCheck, AlertTriangle, XCircle, 
  Hash, User, Building2, Globe, Fingerprint,
  Calendar, Download, ExternalLink, History, 
  CheckCircle2, FileText, ArrowLeft, ArrowUpRight,
  AlertCircle,
  Share2,
  Lock,
  Zap,
  Globe2,
  SearchX,
  RefreshCcw,
  Search
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

interface VerificationPageProps {
  params: Promise<{ id: string }>;
}

export default async function VerificationPage({ params }: VerificationPageProps) {
  const { id } = await params;

  let document = null;
  let dbError = false;

  try {
    document = await prisma.document.findUnique({
      where: { id },
      include: {
        user: true,
        history: { orderBy: { timestamp: "desc" } }
      }
    });
  } catch (err) {
    dbError = true;
  }

  // Not Found UI State
  if (!document && id !== "demo-active") {
    return (
      <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black">
        <Navbar />
        <main className="pt-32 md:pt-48 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-[#F2E6E1] flex items-center justify-center mb-10 shadow-2xl relative overflow-hidden group">
                <SearchX size={64} className="text-black/20 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-red-500/5" />
            </div>
            
            <h1 className="text-6xl md:text-9xl font-bold tracking-tight uppercase leading-[0.8] mb-12">
                Not <br />
                <span className="bg-black text-white px-6 py-2 rounded-sm inline-block mt-8">Recognized.</span>
            </h1>
            
            <p className="text-xl text-black/40 font-medium max-w-xl mb-16 leading-relaxed">
                This document fingerprint does not exist in the global decentralized registry. It may be forged or hasn't been anchored yet.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                <Link href="/verify" className="flex-1 bg-black text-white h-16 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-black/10">
                    <RefreshCcw size={18} />
                    Try Again
                </Link>
                <Link href="/docs" className="flex-1 bg-[#F8F8F8] border border-black/5 h-16 rounded-2xl font-bold flex items-center justify-center gap-3">
                    <Search size={18} />
                    Search Help
                </Link>
            </div>
            
            <div className="mt-32 pt-20 border-t border-black/5 w-full flex flex-col items-center">
                <div className="flex items-center gap-4 text-black/20 text-[10px] font-bold uppercase tracking-[0.4em]">
                    <Lock size={12} />
                    Secured Global Registry Node
                </div>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock data for demo if needed
  const data = document ? {
    ...document,
    history: document.history || []
  } : {
    id: "demo-active",
    name: "Bachelor of Technology - Computer Science",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    did: "did:pramaan:poly:e3b0c44298fc1c149afbf4c8996fb924",
    status: "ACTIVE",
    category: "Education",
    recipientName: "Zohair Shakir",
    network: "Polygon POS",
    txHash: "0x7d2e4a1f...b1d10",
    verifiedAt: new Date(),
    verificationCount: 42,
    user: { organizationName: "Indian Institute of Technology, Delhi" },
    history: [
      { eventType: "ISSUED", timestamp: new Date(Date.now() - 86400000 * 30), ipAddress: "14.139.62.11" },
      { eventType: "VERIFIED", timestamp: new Date(Date.now() - 86400000 * 5), ipAddress: "103.21.164.2" }
    ]
  };

  const statusConfigs = {
    ACTIVE: {
      color: "text-black",
      accentColor: "text-[#3D541D]",
      bg: "bg-[#F2E6E1]",
      icon: <ShieldCheck className="w-12 h-12" />,
      label: "VERIFIED REAL",
      desc: "This document is confirmed to be original and safe."
    },
    VERIFIED: {
      color: "text-black",
      accentColor: "text-[#3D541D]",
      bg: "bg-[#F2E6E1]",
      icon: <ShieldCheck className="w-12 h-12" />,
      label: "VERIFIED REAL",
      desc: "This document is confirmed to be original and safe."
    },
    REVOKED: {
      color: "text-red-600",
      accentColor: "text-red-600",
      bg: "bg-red-50",
      icon: <AlertTriangle className="w-12 h-12" />,
      label: "CANCELLED",
      desc: "This document was once valid but has been cancelled by the issuer."
    },
    SUSPENDED: {
      color: "text-black/60",
      accentColor: "text-black/60",
      bg: "bg-black/5",
      icon: <XCircle className="w-12 h-12" />,
      label: "UNDER REVIEW",
      desc: "Warning: This document is currently being checked for errors."
    }
  };

  const statusConfig = statusConfigs[data.status as keyof typeof statusConfigs] || statusConfigs.ACTIVE;

  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black">
      <Navbar />

      <main className="pt-24 md:pt-32 pb-32 px-6 max-w-7xl mx-auto">
        <div className="space-y-12">
            <Link href="/verify" className="inline-flex items-center text-black/40 hover:text-black transition-colors text-xs font-bold tracking-widest gap-2 uppercase">
              <ArrowLeft size={14} />
              Verify Another
            </Link>

            <div className="bg-white rounded-[4rem] border border-black/5 overflow-hidden shadow-2xl">
                {/* Compact Verification Header */}
                <div className={cn("p-12 md:p-20 flex flex-col items-center text-center space-y-8 border-b border-black/5", statusConfig.bg)}>
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-white flex items-center justify-center mx-auto shadow-2xl relative z-10">
                        <CheckCircle2 className="w-14 h-14 text-[#3D541D]" strokeWidth={2.5} />
                    </div>
                    
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[10px] font-bold uppercase tracking-widest text-[#3D541D]">
                           <ShieldCheck size={14} />
                           {statusConfig.label}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{data.recipientName}</h1>
                        <p className="text-sm md:text-xl font-medium text-black/40">
                           Authorized by <span className="text-black font-bold">{(data.user as any)?.organizationName || "Pramaan Institution"}</span>
                        </p>
                    </div>
                </div>

                <div className="p-8 md:p-16 lg:p-24 space-y-24">
                    {/* Document Preview & Core Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Digital Certificate Preview */}
                        <div className="relative group">
                            <div className="aspect-[3/4] bg-white rounded-2xl border-8 border-black/5 shadow-2xl flex flex-col p-12 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                                <div className="flex justify-between items-start mb-20">
                                    <Logo size={60} className="opacity-80" />
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Registry ID</p>
                                        <p className="font-mono text-[10px] font-bold">#{data.id.toUpperCase()}</p>
                                    </div>
                                </div>
                                
                                <div className="flex-1 flex flex-col justify-center space-y-6">
                                    <div className="w-12 h-1 bg-lime" />
                                    <h3 className="text-4xl font-bold tracking-tight">{data.name}</h3>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Recipient</p>
                                        <p className="text-xl font-bold">{data.recipientName}</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-black/5 flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Issued On</p>
                                        <p className="text-sm font-bold">{new Date(data.verifiedAt!).toLocaleDateString()}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-[#F2E6E1] rounded-xl flex items-center justify-center text-[#3D541D]">
                                        <ShieldCheck size={24} />
                                    </div>
                                </div>

                                {/* Holographic Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-lime/5 to-transparent pointer-events-none" />
                            </div>
                            
                            {/* Visual Accents */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-lime rounded-full blur-[60px] opacity-20 -z-10" />
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-black/5 rounded-full blur-[40px] opacity-20 -z-10" />
                        </div>

                        {/* Technical Integrity Panel */}
                        <div className="space-y-12">
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold uppercase tracking-tighter">Security Metadata</h3>
                                
                                <div className="space-y-6">
                                    <div className="p-6 rounded-3xl bg-[#F8F8F8] border border-black/5 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Cryptographic Hash</span>
                                            <Fingerprint size={14} className="text-black/20" />
                                        </div>
                                        <p className="font-mono text-[10px] text-black/40 break-all leading-relaxed">{data.hash}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 rounded-3xl bg-[#F8F8F8] border border-black/5 space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Network</span>
                                            <p className="text-sm font-bold flex items-center gap-2">
                                                <Globe size={14} className="text-[#3D541D]" />
                                                Polygon POS
                                            </p>
                                        </div>
                                        <div className="p-6 rounded-3xl bg-[#F8F8F8] border border-black/5 space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Audit Count</span>
                                            <p className="text-sm font-bold flex items-center gap-2">
                                                <History size={14} className="text-[#3D541D]" />
                                                {data.verificationCount} Checks
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center gap-3 bg-black text-white h-16 rounded-2xl font-bold text-sm hover:bg-black/90 transition-all shadow-xl shadow-black/10">
                                    <Download size={18} />
                                    Download Proof
                                </button>
                                <button className="w-16 h-16 flex items-center justify-center bg-[#F8F8F8] border border-black/5 rounded-2xl text-black hover:bg-black hover:text-white transition-all">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                            <div className="pt-10 border-t border-black/5 space-y-6">
                                <div className="flex gap-4">
                                    <button className="flex-1 flex items-center justify-center gap-3 bg-black text-white h-16 rounded-2xl font-bold text-sm hover:bg-black/90 transition-all shadow-xl shadow-black/10">
                                        <Download size={18} />
                                        Download Proof
                                    </button>
                                    <button className="w-16 h-16 flex items-center justify-center bg-[#F8F8F8] border border-black/5 rounded-2xl text-black hover:bg-black hover:text-white transition-all">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black/20 justify-center">
                                    <Lock size={12} />
                                    End-to-End Cryptography
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Audit Log */}
                    <div className="bg-[#F8F8F8] rounded-[3.5rem] p-12 space-y-12 border border-black/5">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <History size={22} className="text-black/30" />
                                Institutional Audit Trail
                            </h3>
                            <span className="px-3 py-1 bg-lime text-black text-[10px] font-bold uppercase tracking-widest rounded-full">Genesis Live</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {data.history.map((event: any, i: number) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center flex-shrink-0 shadow-sm text-black/20">
                                        {event.eventType === 'ISSUED' ? <FileText size={18} /> : <CheckCircle2 size={18} />}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{event.eventType}</span>
                                            <span className="text-[10px] text-black/20 font-bold">{new Date(event.timestamp).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm font-medium text-black/60 leading-relaxed">
                                            {event.eventType === 'ISSUED' ? "Document settled on chain." : "Institutional verify request."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}