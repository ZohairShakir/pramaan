import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import { FooterV2 as Footer } from '@/components/Landing/FooterV2';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { 
  User as UserIcon, 
  Building2, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  Globe, 
  Fingerprint,
  Settings,
  ArrowUpRight,
  Lock,
  Cpu,
  BadgeCheck,
  AlertCircle
} from 'lucide-react';
import { Logo } from '@/components/Logo';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  const userId = (session.user as any)?.id;
  
  let user = null;
  let dbError = false;

  try {
    user = await prisma.user.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    dbError = true;
  }

  if (dbError) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-8">
            <AlertCircle size={40} />
        </div>
        <h1 className="text-4xl font-bold mb-4">Registry Offline</h1>
        <p className="text-black/40 max-w-md mb-12">
            We are currently unable to reach the global decentralized registry. Please check your database connection strings or try again later.
        </p>
        <button onClick={() => window.location.reload()} className="bg-black text-white px-10 py-4 rounded-xl font-bold">
            Retry Connection
        </button>
      </div>
    );
  }

  if (!user) {
    redirect('/login');
  }

  const profileStats = [
    { label: 'Trust Score', value: user.trustScore.toFixed(1), sub: 'Global Rating', icon: <BadgeCheck className="text-lime" /> },
    { label: 'Role', value: user.role, sub: 'Network Access', icon: <Cpu className="text-black/20" /> },
    { label: 'Status', value: user.isVerifiedIssuer ? 'Verified' : 'Pending', sub: 'Issuer Authority', icon: <ShieldCheck className={user.isVerifiedIssuer ? "text-lime" : "text-amber-500"} /> },
  ];

  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black relative overflow-hidden">
      <Navbar />
      
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F2E6E1]/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />

      <main className="pt-32 md:pt-48 pb-32 px-6 max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-widest text-black/50">
                    <UserIcon size={12} />
                    Identity Profile
                </div>
                <h1 className="text-6xl md:text-9xl font-bold tracking-tight leading-[0.8] uppercase">
                    Your <br />
                    <span className="bg-lime px-4 py-2 rounded-sm inline-block mt-8">Account.</span>
                </h1>
                <p className="text-lg md:text-xl text-black/40 font-medium leading-relaxed max-w-lg">
                    Manage your institutional identity and verify your authority on the global decentralized registry.
                </p>
            </div>
            
            <div className="bg-black rounded-3xl p-10 text-white min-w-[320px] shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F2E6E110,transparent_70%)]" />
                <div className="relative z-10 space-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                        <Logo size={40} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">Registry DID</p>
                        <p className="font-mono text-xs break-all opacity-60">did:pramaan:poly:{user.id.slice(0, 16)}...</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Stats Sidebar */}
            <div className="lg:col-span-4 space-y-6">
                {profileStats.map((stat, i) => (
                    <div key={i} className="bg-[#F8F8F8] rounded-[2.5rem] p-8 border border-black/5 flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-black">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-[10px] font-bold text-black/20 uppercase tracking-tight">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Info Area */}
            <div className="lg:col-span-8 space-y-8">
                <div className="bg-white rounded-[4rem] border border-black/5 p-12 md:p-16 space-y-16 shadow-2xl shadow-black/[0.02]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 flex items-center gap-2">
                                <Building2 size={12} /> Institutional Name
                            </label>
                            <p className="text-2xl font-bold">{user.organizationName || user.name || 'Not Set'}</p>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 flex items-center gap-2">
                                <Mail size={12} /> Contact Email
                            </label>
                            <p className="text-2xl font-bold">{user.email}</p>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 flex items-center gap-2">
                                <Calendar size={12} /> Member Since
                            </label>
                            <p className="text-2xl font-bold">{new Date(user.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 flex items-center gap-2">
                                <Globe size={12} /> Authorized Region
                            </label>
                            <p className="text-2xl font-bold text-black/40 italic">Global Registry Node</p>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-black/5 flex flex-col sm:flex-row gap-6">
                        <button className="flex-1 h-16 bg-black text-white rounded-2xl font-bold text-sm hover:bg-black/90 transition-all flex items-center justify-center gap-3">
                            <Settings size={18} />
                            Update Profile
                        </button>
                        <button className="flex-1 h-16 bg-[#F8F8F8] border border-black/5 rounded-2xl font-bold text-sm hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3">
                            <Fingerprint size={18} />
                            Identity Credentials
                        </button>
                    </div>
                </div>

                <div className="bg-[#F2E6E1] rounded-[3.5rem] p-12 flex flex-col md:flex-row justify-between items-center gap-8 border border-black/5">
                    <div className="space-y-2">
                        <h4 className="text-xl font-bold flex items-center gap-3">
                            <Lock size={20} />
                            Node Security
                        </h4>
                        <p className="text-sm font-medium text-black/40">Your account is secured with end-to-end ZK-Cryptography.</p>
                    </div>
                    <button className="bg-white text-black px-8 py-3 rounded-xl text-xs font-bold shadow-sm hover:bg-black hover:text-white transition-all">
                        Audit Logs
                    </button>
                </div>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
