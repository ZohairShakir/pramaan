'use client';

import React, { useState, useRef } from 'react';
import { 
  User as UserIcon, 
  Building2, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  Globe, 
  Fingerprint,
  Settings,
  BadgeCheck,
  Cpu,
  Camera,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface ProfileEditorProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    organizationName: string | null;
    role: string;
    trustScore: number;
    isVerifiedIssuer: boolean;
    hasSubmittedProof: boolean;
    createdAt: Date | string;
  };
}

export default function ProfileEditor({ user: initialUser }: ProfileEditorProps) {
  const [user, setUser] = useState(initialUser);
  const [name, setName] = useState(initialUser.name || '');
  const [orgName, setOrgName] = useState(initialUser.organizationName || '');
  const [image, setImage] = useState(initialUser.image || '');
  const [hasSubmitted, setHasSubmitted] = useState(initialUser.hasSubmittedProof);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image too large. Please use an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHasSubmitted(true);
      toast.success("Document uploaded. Click 'Update Profile' to submit for audit.");
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          organizationName: orgName,
          image: image,
          hasSubmittedProof: hasSubmitted
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      setUser({ ...user, ...data.user });
      toast.success("Profile updated and anchored.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const profileStats = [
    { label: 'Trust Score', value: user.trustScore.toFixed(1), sub: 'Global Rating', icon: <BadgeCheck className="text-lime" /> },
    { label: 'Role', value: user.role, sub: 'Network Access', icon: <Cpu className="text-black/20" /> },
    { label: 'Status', value: user.isVerifiedIssuer ? 'Verified' : 'Pending', sub: 'Issuer Authority', icon: <ShieldCheck className={user.isVerifiedIssuer ? "text-lime" : "text-amber-500"} /> },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Stats Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        {/* PFP Change Card */}
        <div className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-lime/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-[2.5rem] bg-white/10 overflow-hidden border border-white/10 flex items-center justify-center">
                {image ? (
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={48} className="text-white/20" />
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-lime text-black rounded-xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              >
                <Camera size={18} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">{name || 'Your Identity'}</h3>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">{user.role}</p>
            </div>
          </div>
        </div>

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
              <input 
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-[#F8F8F8] border border-black/5 rounded-2xl px-6 py-4 font-bold text-lg outline-none focus:border-black/10 focus:bg-white transition-all"
                placeholder="Not Set"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 flex items-center gap-2">
                <UserIcon size={12} /> Authorized Name
              </label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8F8F8] border border-black/5 rounded-2xl px-6 py-4 font-bold text-lg outline-none focus:border-black/10 focus:bg-white transition-all"
                placeholder="Not Set"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 flex items-center gap-2">
                <Mail size={12} /> Contact Email
              </label>
              <p className="px-6 py-4 text-2xl font-bold opacity-40">{user.email}</p>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 flex items-center gap-2">
                <Calendar size={12} /> Member Since
              </label>
              <p className="px-6 py-4 text-2xl font-bold opacity-40">{new Date(user.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
            </div>
          </div>

          <div className="pt-16 border-t border-black/5 flex flex-col sm:flex-row gap-6">
            <button 
              onClick={handleUpdate}
              disabled={isUpdating}
              className="flex-1 h-16 bg-black text-white rounded-2xl font-bold text-sm hover:bg-black/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="animate-spin" /> : <Settings size={18} />}
              Update Profile
            </button>
            
            {!user.isVerifiedIssuer && !hasSubmitted && (
              <button 
                onClick={() => docInputRef.current?.click()}
                className="flex-1 h-16 bg-[#F2E6E1] border border-black/5 rounded-2xl font-bold text-sm hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <ShieldCheck size={18} />
                Submit Proof
              </button>
            )}
            
            {hasSubmitted && !user.isVerifiedIssuer && (
              <div className="flex-1 h-16 bg-lime/10 border border-lime/20 rounded-2xl font-bold text-xs flex items-center justify-center gap-3 text-[#3D541D]">
                <Clock size={18} />
                Audit Pending
              </div>
            )}

            <input 
              type="file" 
              ref={docInputRef} 
              className="hidden" 
              onChange={handleDocUpload}
            />
          </div>
        </div>

        <div className="bg-[#F2E6E1] rounded-[3.5rem] p-12 flex flex-col md:flex-row justify-between items-center gap-8 border border-black/5">
          <div className="space-y-2">
            <h4 className="text-xl font-bold flex items-center gap-3">
              <Globe size={20} />
              Node Security
            </h4>
            <p className="text-sm font-medium text-black/40">Your account is secured with end-to-end encryption.</p>
          </div>
          <button className="bg-white text-black px-8 py-3 rounded-xl text-xs font-bold shadow-sm hover:bg-black hover:text-white transition-all">
            Audit Logs
          </button>
        </div>
      </div>
    </div>
  );
}
