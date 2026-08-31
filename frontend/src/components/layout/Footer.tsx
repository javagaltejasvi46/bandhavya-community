'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/40 bg-[#FFF8F0]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#D96C8F] to-[#F4A300] text-white shadow-md">
                <span className="font-bold text-xl">भ</span>
              </div>
              <span className="text-xl font-bold text-[#1E3A5F]">Bhandhavya</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Floating Heritage Glass community portal dedicated to preserving traditional heritage, celebrating family milestones, and supporting Vedic education & charity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D96C8F] mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-[#1E3A5F] font-medium">
              <li><Link href="/" className="hover:text-[#D96C8F] transition-colors">Home & Values</Link></li>
              <li><Link href="/events" className="hover:text-[#D96C8F] transition-colors">Community Events</Link></li>
              <li><Link href="/blog" className="hover:text-[#D96C8F] transition-colors">Heritage Blog & Feed</Link></li>
              <li><Link href="/gallery" className="hover:text-[#D96C8F] transition-colors">Photo Cloud Gallery</Link></li>
              <li><Link href="/people" className="hover:text-[#D96C8F] transition-colors">Member Directory</Link></li>
            </ul>
          </div>

          {/* Community Seva */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D96C8F] mb-4">Community Seva</h4>
            <ul className="space-y-2 text-xs text-[#1E3A5F] font-medium">
              <li><Link href="/donate" className="hover:text-[#D96C8F] transition-colors">Vedic Education Fund</Link></li>
              <li><Link href="/donate" className="hover:text-[#D96C8F] transition-colors">Senior Elder Care</Link></li>
              <li><Link href="/donate" className="hover:text-[#D96C8F] transition-colors">Cultural Preservation</Link></li>
              <li><Link href="/donate" className="hover:text-[#D96C8F] transition-colors">Youth Scholarships</Link></li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D96C8F] mb-4">Contact Bhavan</h4>
            <div className="flex items-start space-x-2 text-xs text-[#1E3A5F]">
              <MapPin className="h-4 w-4 text-[#D96C8F] shrink-0 mt-0.5" />
              <span>Bhandhavya Heritage Bhavan, #42 Gayathri Nagar, Bengaluru - 560021</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#1E3A5F]">
              <Mail className="h-4 w-4 text-[#D96C8F] shrink-0" />
              <span>contact@bhandhavya.org</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#1E3A5F]">
              <Phone className="h-4 w-4 text-[#D96C8F] shrink-0" />
              <span>+91 98800 12345</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Bhandhavya Brahmin Family Association. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-[#D96C8F] fill-current" />
            <span>for our community</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
