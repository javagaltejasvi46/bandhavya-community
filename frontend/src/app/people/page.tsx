'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_MEMBERS, MemberItem } from '@/services/mockData';
import { Search, Users, MapPin, Award, BookOpen, Calendar, ArrowRight } from 'lucide-react';

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = MOCK_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F]">Bhandhavya Family Directory</h1>
            <p className="text-sm text-gray-600 mt-1">
              Connect with esteemed community members, trustees, and active volunteers. ({filteredMembers.length} Members)
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search member name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full pl-10 pr-4 py-2 text-xs font-medium"
            />
          </div>
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member: MemberItem) => (
          <div key={member.id} className="glass-card p-6 rounded-3xl text-center space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <span className="inline-block bg-[#D96C8F]/15 text-[#D96C8F] px-3 py-0.5 rounded-full text-[10px] font-bold">
                  {member.badge}
                </span>
                <h3 className="text-base font-bold text-[#1E3A5F] mt-1">{member.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{member.role}</p>
              </div>

              <div className="text-[11px] text-gray-500 flex items-center justify-center space-x-1">
                <MapPin className="h-3.5 w-3.5 text-[#C76B42]" />
                <span>{member.location}</span>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/50 text-xs">
                <div className="bg-white/50 p-2 rounded-xl">
                  <span className="block font-bold text-[#234E70]">{member.postsCount}</span>
                  <span className="text-[10px] text-gray-500">Posts</span>
                </div>
                <div className="bg-white/50 p-2 rounded-xl">
                  <span className="block font-bold text-[#234E70]">{member.eventsCount}</span>
                  <span className="text-[10px] text-gray-500">Events</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/profile"
                className="glass-button-secondary inline-flex items-center justify-center space-x-1.5 rounded-full w-full py-2 text-xs font-bold"
              >
                <span>View Profile</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
