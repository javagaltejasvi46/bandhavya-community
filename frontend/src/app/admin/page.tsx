'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  ShieldAlert, 
  PlusCircle, 
  Calendar, 
  BookOpen, 
  Image as ImageIcon, 
  MessageSquare, 
  Users, 
  Database, 
  Trash2, 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  UploadCloud
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isAdmin, setRole } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');

  if (!isAdmin) {
    return (
      <div className="glass-card p-12 text-center rounded-3xl max-w-lg mx-auto space-y-4 my-12 border-2 border-red-200">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E3A5F]">Access Restricted</h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          The Admin Dashboard is only accessible to authorized administrators. You are currently viewing as a <strong>Guest / Member</strong>.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setRole('ADMIN')}
            className="glass-button-primary rounded-full px-6 py-2.5 text-xs font-bold"
          >
            Switch Role to Admin (Demo Mode)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl space-y-4 border-2 border-[#D96C8F]/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-[#D96C8F]/15 px-3.5 py-1 text-xs font-bold text-[#D96C8F] mb-2">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Bhandhavya Admin Console</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#1E3A5F]">Admin Management Dashboard</h1>
            <p className="text-xs text-gray-600">Full CRUD control over events, heritage blogs, media storage, and comment moderation.</p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <button className="glass-button-primary rounded-full px-4 py-2 text-xs font-bold flex items-center space-x-1.5 shadow-md">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Create Event</span>
            </button>
            <button className="glass-button-secondary rounded-full px-4 py-2 text-xs font-bold flex items-center space-x-1.5">
              <UploadCloud className="h-3.5 w-3.5 text-[#D96C8F]" />
              <span>Upload R2 Media</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-2 border-l-4 border-l-[#234E70]">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Total Events</span>
            <Calendar className="h-4 w-4 text-[#234E70]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1E3A5F]">18</div>
          <p className="text-[11px] text-emerald-600 font-semibold">+3 upcoming this month</p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-2 border-l-4 border-l-[#D96C8F]">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Blog Posts</span>
            <BookOpen className="h-4 w-4 text-[#D96C8F]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1E3A5F]">42</div>
          <p className="text-[11px] text-emerald-600 font-semibold">X-Feed Active</p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-2 border-l-4 border-l-[#F4A300]">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>R2 Media Storage</span>
            <Database className="h-4 w-4 text-[#F4A300]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1E3A5F]">2.4 GB</div>
          <p className="text-[11px] text-gray-500">Cloudflare R2 Bucket</p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-2 border-l-4 border-l-[#1F7A8C]">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Pending Moderation</span>
            <MessageSquare className="h-4 w-4 text-[#1F7A8C]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1E3A5F]">2</div>
          <p className="text-[11px] text-amber-600 font-semibold">Needs review</p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex border-b border-gray-200/60 space-x-4">
          {['Overview & Activity', 'Events CRUD', 'Comment Moderation', 'R2 Storage'].map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-bold border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-[#D96C8F] text-[#D96C8F]'
                  : 'border-transparent text-gray-500 hover:text-[#1E3A5F]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#1E3A5F]">Recent Activity & Content Moderation</h3>
          <div className="space-y-3">
            {[
              { title: 'New comment by Shri Venkatesh Rao on Event #101', status: 'Approved', time: '10 mins ago' },
              { title: 'Upload batch of 8 photos to Sharad Navaratri Cloud', status: 'Completed', time: '1 hour ago' },
              { title: 'New donation of ₹5,000 received for Vidya Sambhavana', status: 'Verified', time: '3 hours ago' },
            ].map((act, i) => (
              <div key={i} className="bg-white/50 p-4 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-[#234E70]" />
                  <span className="font-semibold text-[#1E3A5F]">{act.title}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                    {act.status}
                  </span>
                  <span className="text-gray-400">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
