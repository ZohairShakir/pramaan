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
      label: "CERTIFIED AUTHENTIC",
      desc: "This document has been cryptographically settled on the Polygon mainnet."
    },
    VERIFIED: {
      color: "text-black",
      accentColor: "text-[#3D541D]",
      bg: "bg-[#F2E6E1]",
      icon: <ShieldCheck className="w-12 h-12" />,
      label: "CERTIFIED AUTHENTIC",
      desc: "This document has been cryptographically settled on the Polygon mainnet."
    },
    REVOKED: {
      color: "text-red-600",
      accentColor: "text-red-600",
      bg: "bg-red-50",
      icon: <AlertTriangle className="w-12 h-12" />,
      label: "DOCUMENT REVOKED",
      desc: "This proof was previously valid but has been formally withdrawn by the issuer."
    },
    SUSPENDED: {
      color: "text-black/60",
      accentColor: "text-black/60",
      bg: "bg-black/5",
      icon: <XCircle className="w-12 h-12" />,
      label: "GENESIS SUSPENDED",
      desc: "Warning: This document status is currently under institutional review."
    }
  };

  const statusConfig = statusConfigs[data.status as keyof typeof statusConfigs] || statusConfigs.ACTIVE;

  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black">
      <Navbar />

      <main className="pt-32 md:pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <div className="space-y-12">
            <Link href="/verify" className="inline-flex items-center text-black/40 hover:text-black transition-colors text-xs font-bold tracking-widest gap-2 uppercase">
              <ArrowLeft size={14} />
              Verify Another
            </Link>

            <div className="bg-white rounded-[4rem] border border-black/5 overflow-hidden shadow-2xl">
                {/* Hero Status Banner */}
                <div className={cn("p-8 md:p-24 lg:p-32 text-center space-y-6 md:space-y-10 relative overflow-hidden", statusConfig.bg)}>
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-white flex items-center justify-center mx-auto shadow-2xl relative z-10 animate-in zoom-in duration-700">
                        <div className={statusConfig.accentColor}>{statusConfig.icon}</div>
                    </div>
                    <div className="space-y-6 relative z-10">
                        <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tight uppercase leading-[0.8]">
                            {statusConfig.label.split(' ')[0]} <br />
                            <span className="bg-white px-6 py-2 rounded-sm text-black inline-block mt-4 md:mt-8">{statusConfig.label.split(' ')[1]}</span>
                        </h1>
                        <p className="text-black/30 font-bold text-xs md:text-sm uppercase tracking-[0.5em] flex items-center justify-center gap-4">
                            <span className="w-8 h-px bg-black/10" />
                            Global Registry Authenticated
                            <span className="w-8 h-px bg-black/10" />
                        </p>
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3D541D08,transparent_70%)] pointer-events-none" />
                </div>

             {/* Content Grid */}
             <div className="p-6 md:p-8 lg:p-12 space-y-12 md:space-y-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Visual Proof Section */}
                        <div className="space-y-8 md:space-y-12">
                            <div className="p-6 md:p-12 bg-[#F8F8F8] rounded-[2.5rem] md:rounded-[3.5rem] border border-black/5 flex items-center justify-center group relative overflow-hidden aspect-square">
                                <div className="relative z-10 flex flex-col items-center gap-8">
                                    <Logo size={120} className="opacity-10 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100" />
                                    <div className="text-center space-y-2">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/20">Digital Fingerprint</p>
                                        <p className="font-mono text-[9px] text-black/40 break-all max-w-[200px]">{data.hash}</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                                    <div className="text-center space-y-6">
                                        <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                                            <ShieldCheck size={32} className="text-lime" />
                                        </div>
                                        <p className="text-xs font-bold uppercase tracking-widest">Tamper-Proof Ledger</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-8 px-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Settlement Layer</p>
                                    <p className="text-sm font-bold flex items-center gap-2">
                                        <Globe2 size={14} className="text-[#3D541D]" />
                                        Polygon Mainnet
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Network Speed</p>
                                    <p className="text-sm font-bold flex items-center justify-end gap-2">
                                        <Zap size={14} className="text-[#3D541D]" />
                                        Instant Audit
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Record Details Section */}
                        <div className="space-y-12">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 flex items-center gap-2">
                                        <FileText size={12} /> Registry Entry
                                    </span>
                                    <h2 className="text-3xl md:text-7xl font-bold tracking-tight leading-tight">{data.name}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-black/5 rounded-full text-[9px] font-bold uppercase tracking-widest">ID: {data.id.slice(0, 8).toUpperCase()}</span>
                                        <span className="px-3 py-1 bg-black/5 rounded-full text-[9px] font-bold uppercase tracking-widest">{data.category}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 md:pt-10 border-t border-black/5">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Issuer Authority</span>
                                        <p className="text-lg md:text-xl font-bold">{(data.user as any)?.organizationName || "Pramaan Institution"}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Authorized Recipient</span>
                                        <p className="text-lg md:text-xl font-bold">{data.recipientName || "Public Record"}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 md:gap-12">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Genesis Date</span>
                                        <p className="text-base md:text-lg font-bold">{new Date(data.verifiedAt!).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                                    </div>
                                    <div className="space-y-2 text-right md:text-left">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Total Audits</span>
                                        <p className="text-base md:text-lg font-bold">{data.verificationCount} Records</p>
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