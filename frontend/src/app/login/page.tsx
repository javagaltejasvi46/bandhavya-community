'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/context/AuthContext';
import { LogIn, Mail, Lock, Shield, UserCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('tejasvi@bhandhavya.org');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    login(email, selectedRole);
    if (selectedRole === 'ADMIN') {
      router.push('/admin');
    } else {
      router.push('/profile');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="glass-card p-8 sm:p-10 rounded-3xl space-y-6 shadow-2xl border-2 border-white/80">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#D96C8F] to-[#F4A300] text-white font-bold text-2xl shadow-md mx-auto">
            भ
          </div>
          <h1 className="text-2xl font-bold text-[#1E3A5F]">Sign In to Bhandhavya</h1>
          <p className="text-xs text-gray-600">Access community forums, event archives, and member services.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E3A5F]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@bhandhavya.org"
                className="glass-input w-full pl-10 pr-4 py-2.5 text-xs font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E3A5F]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="glass-input w-full pl-10 pr-4 py-2.5 text-xs font-medium"
              />
            </div>
          </div>

          {/* Select Demo Role to Test RBAC */}
          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold text-[#1E3A5F]">Select Access Level (Demo Mode)</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('USER')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center space-x-1 ${
                  selectedRole === 'USER'
                    ? 'bg-[#234E70] text-white border-[#234E70]'
                    : 'bg-white/50 text-[#1E3A5F] border-gray-200'
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Member</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('ADMIN')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center space-x-1 ${
                  selectedRole === 'ADMIN'
                    ? 'bg-[#D96C8F] text-white border-[#D96C8F]'
                    : 'bg-white/50 text-[#1E3A5F] border-gray-200'
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="glass-button-primary w-full rounded-full py-3 text-xs font-bold shadow-lg flex items-center justify-center space-x-2 mt-4"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
}
