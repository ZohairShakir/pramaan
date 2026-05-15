'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  User, 
  Building2, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Lock,
  ArrowRight,
  Search,
  ExternalLink,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [view, setView] = useState<'pending' | 'all'>('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '515253') {
      setIsAuthenticated(true);
      fetchUsers('pending');
    } else {
      toast.error('Invalid administrative key');
    }
  };

  const fetchUsers = async (currentView: 'pending' | 'all' = view) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users?view=${currentView}`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      }
    } catch (err) {
      toast.error('Failed to fetch registry data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers(view);
    }
  }, [view]);

  const handleAction = async (userId: string, action: 'APPROVE' | 'REJECT') => {
    setProcessingId(userId);
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action }),
      });
      
      if (res.ok) {
        toast.success(`User ${action === 'APPROVE' ? 'verified' : 'rejected'}`);
        fetchUsers();
      } else {
        throw new Error('Action failed');
      }
    } catch (err) {
      toast.error('Failed to process verification');
    } finally {
      setProcessingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-12">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-lime rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-lime/20">
              <Lock size={32} className="text-black" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight uppercase">Admin <br /><span className="text-lime">Gateway.</span></h1>
            <p className="text-white/40 text-sm font-medium uppercase tracking-[0.2em]">Restricted Protocol v5.1</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-lime transition-colors" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Protocol Key"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white font-mono tracking-[0.5em] focus:border-lime/50 focus:bg-white/10 outline-none transition-all"
                autoFocus
              />
            </div>
            <button className="w-full h-16 bg-lime text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-lime/90 transition-all flex items-center justify-center gap-3">
              Authorize Access
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-lime selection:text-black relative">
      <main className="max-w-7xl mx-auto py-24 px-8 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
                <div className="flex gap-4 mb-2">
                    <button 
                        onClick={() => setView('pending')}
                        className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                            view === 'pending' ? "bg-black text-white" : "bg-black/5 text-black/40 hover:bg-black/10"
                        )}
                    >
                        Pending Audits
                    </button>
                    <button 
                        onClick={() => setView('all')}
                        className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                            view === 'all' ? "bg-black text-white" : "bg-black/5 text-black/40 hover:bg-black/10"
                        )}
                    >
                        Full Registry
                    </button>
                </div>
                <h2 className="text-6xl font-bold tracking-tighter uppercase leading-[0.8]">
                    {view === 'pending' ? 'Pending' : 'Identity'} <br /><span className="bg-lime px-4 py-1 rounded-sm inline-block mt-2">{view === 'pending' ? 'Audits' : 'Registry'}.</span>
                </h2>
                <p className="text-black/40 font-medium max-w-md">
                    {view === 'pending' 
                        ? 'Review institutional identities and verify their authority to issue cryptographic proofs.'
                        : 'Complete list of all enrolled institutions and administrators within the trust network.'}
                </p>
            </div>
            <div className="flex items-center gap-4 bg-black text-white px-8 py-4 rounded-[2rem]">
                <div className="text-right">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{view === 'pending' ? 'Active Requests' : 'Total Identities'}</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <div className="w-px h-10 bg-white/10 mx-2" />
                <ShieldCheck className="text-lime" />
            </div>
        </div>

        {isLoading ? (
            <div className="h-[400px] flex items-center justify-center">
                <Loader2 className="animate-spin text-black" size={40} />
            </div>
        ) : users.length === 0 ? (
            <div className="h-[400px] bg-[#F8F8F8] rounded-[3rem] border border-black/5 flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm">
                    <CheckCircle2 size={32} className="text-black/10" />
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-black/30">Registry is Up-to-date</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-6">
                {users.map((user) => (
                    <div key={user.id} className="bg-white rounded-[2.5rem] border border-black/5 p-8 md:p-12 hover:shadow-2xl hover:shadow-black/[0.02] transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2E6E1]/20 rounded-full blur-[60px] -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex flex-col lg:flex-row justify-between gap-12 relative z-10">
                            <div className="space-y-8 flex-1">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-3xl bg-[#F8F8F8] overflow-hidden border border-black/5 flex items-center justify-center">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={32} className="text-black/10" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{user.organizationName || user.name}</h3>
                                        <p className="text-sm font-medium text-black/40">{user.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Role Claim</p>
                                        <p className="font-bold flex items-center gap-2">
                                            <Building2 size={16} className="text-black/20" />
                                            {user.role}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Enrollment Date</p>
                                        <p className="font-bold flex items-center gap-2">
                                            <ShieldCheck size={16} className="text-black/20" />
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row lg:flex-col justify-center gap-4 min-w-[240px]">
                                <div className="bg-[#F8F8F8] rounded-2xl p-4 flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Proof Document</span>
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black/20 hover:text-black cursor-pointer shadow-sm">
                                        <ExternalLink size={16} />
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleAction(user.id, 'APPROVE')}
                                    disabled={processingId === user.id}
                                    className="h-16 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-black/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {processingId === user.id ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={18} />}
                                    Approve Issuer
                                </button>
                                <button 
                                    onClick={() => handleAction(user.id, 'REJECT')}
                                    disabled={processingId === user.id}
                                    className="h-16 bg-white border border-red-100 text-red-500 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    <XCircle size={18} />
                                    Reject Application
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </main>
    </div>
  );
}
