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
import ProfileEditor from '@/components/ProfileEditor';
import VerificationBanner from '@/components/VerificationBanner';

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

  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black relative overflow-hidden">
      <Navbar />
      
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F2E6E1]/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />

       <main className="pt-20 md:pt-32 pb-20 px-4 max-w-7xl mx-auto space-y-24 relative z-10">
        <VerificationBanner 
          isVerified={user.isVerifiedIssuer} 
          hasSubmitted={user.hasSubmittedProof} 
        />
        
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
        <ProfileEditor user={user} />

      </main>

      <Footer />
    </div>
  );
}
