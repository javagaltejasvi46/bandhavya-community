'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Calendar, Award, Shield, LogOut, ArrowRight } from 'lucide-react';

export default function ProfilePage() {
  const { user, isGuest, isAdmin, logout, setRole } = useAuth();

  if (isGuest || !user) {
    return (
      <div className="glass-card p-12 text-center rounded-3xl max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold text-[#1E3A5F]">Not Logged In</h2>
        <p className="text-xs text-gray-600">Please sign in to view your member profile and activity.</p>
        <Link href="/login" className="glass-button-primary inline-block rounded-full px-6 py-2.5 text-xs font-bold">
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="glass-card p-8 sm:p-10 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="space-y-1">
            <span className="inline-block bg-[#D96C8F]/15 text-[#D96C8F] px-3 py-0.5 rounded-full text-xs font-bold">
              {user.role} Account
            </span>
            <h1 className="text-2xl font-bold text-[#1E3A5F]">{user.name}</h1>
            <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start space-x-1">
              <Mail className="h-3.5 w-3.5" />
              <span>{user.email}</span>
            </p>
            <p className="text-xs text-gray-400">Member Since: {user.memberSince}</p>
          </div>
        </div>

        {/* Activity counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200/60">
          <div className="bg-white/50 p-4 rounded-2xl text-center">
            <span className="text-2xl font-extrabold text-[#234E70]">{user.postsCount}</span>
            <span className="block text-xs font-medium text-gray-500">Community Posts</span>
          </div>
          <div className="bg-white/50 p-4 rounded-2xl text-center">
            <span className="text-2xl font-extrabold text-[#D96C8F]">{user.eventsCount}</span>
            <span className="block text-xs font-medium text-gray-500">Events Attended</span>
          </div>
          <div className="bg-white/50 p-4 rounded-2xl text-center col-span-2 sm:col-span-1">
            <span className="text-2xl font-extrabold text-[#F4A300]">Active</span>
            <span className="block text-xs font-medium text-gray-500">Member Status</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-200/60 gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="glass-button-primary rounded-full px-5 py-2.5 text-xs font-bold flex items-center space-x-1.5"
            >
              <Shield className="h-4 w-4" />
              <span>Open Admin Dashboard</span>
            </Link>
          )}

          <button
            onClick={logout}
            className="glass-button-secondary rounded-full px-5 py-2.5 text-xs font-bold text-red-600 border-red-200 hover:bg-red-50 flex items-center space-x-1.5"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
