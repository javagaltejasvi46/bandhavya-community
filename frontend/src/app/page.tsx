'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_EVENTS, MOCK_POSTS, MOCK_PHOTO_CLOUD } from '@/services/mockData';
import { 
  Sparkles, 
  Calendar, 
  Heart, 
  Users, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Award,
  Sun
} from 'lucide-react';

export default function HomePage() {
  const featuredEvent = MOCK_EVENTS[0];
  const featuredPost = MOCK_POSTS[0];

  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl glass-card p-8 sm:p-12 border border-white/80 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-gradient-to-br from-[#D96C8F]/20 to-[#F4A300]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-gradient-to-tr from-[#234E70]/20 to-[#1F7A8C]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#D96C8F]/15 px-4 py-1.5 text-xs font-bold text-[#D96C8F] backdrop-blur-md border border-[#D96C8F]/20">
              <Sun className="h-4 w-4 animate-spin-slow text-[#F4A300]" />
              <span>Floating Heritage Glass Experience</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E3A5F] leading-tight">
              Preserving Heritage, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D96C8F] via-[#C76B42] to-[#F4A300]">
                Uniting Families.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              Bhandhavya is a joyful, calm, and vibrant community platform for Brahmin families. Celebrating sacred traditions, honoring senior elders, empowering youth education, and preserving cherished memories.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/events"
                className="glass-button-primary flex items-center space-x-2 rounded-full px-6 py-3.5 text-sm font-bold shadow-lg"
              >
                <Calendar className="h-4 w-4" />
                <span>Explore Events</span>
              </Link>
              <Link
                href="/donate"
                className="glass-button-secondary flex items-center space-x-2 rounded-full px-6 py-3.5 text-sm font-bold"
              >
                <Heart className="h-4 w-4 text-[#D96C8F]" />
                <span>Support Seva</span>
              </Link>
            </div>
          </div>

          {/* Hero Media Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/60 group">
              <img
                src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800"
                alt="Bhandhavya Heritage Sammelan"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-xs uppercase font-bold text-[#F4A300] tracking-widest">Featured Sammelan</span>
                <h3 className="text-lg font-bold text-white">Maha Sammelan & Cultural Utsav</h3>
                <p className="text-xs text-gray-200 mt-1">Bengaluru • Oct 15-17, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY VALUES */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F]">Pillars of Bhandhavya</h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Guiding values that strengthen our family bonds and preserve our sacred heritage across generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 space-y-3 border-t-4 border-t-[#D96C8F]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D96C8F]/15 text-[#D96C8F]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E3A5F]">Heritage & Samskara</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Nurturing traditional Vedic rituals, cultural arts, and passing timeless values to our children.
            </p>
          </div>

          <div className="glass-card p-6 space-y-3 border-t-4 border-t-[#234E70]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#234E70]/15 text-[#234E70]">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E3A5F]">Vidya & Youth Empowerment</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Awarding scholarships, mentoring students, and supporting Veda Pathashalas.
            </p>
          </div>

          <div className="glass-card p-6 space-y-3 border-t-4 border-t-[#F4A300]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4A300]/15 text-[#F4A300]">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E3A5F]">Seva & Elder Care</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Providing medical support, honoring senior members, and fostering selfless community service.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS & BLOG HIGHLIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Event Card */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96C8F] bg-[#D96C8F]/10 px-3 py-1 rounded-full">
                Upcoming Community Event
              </span>
              <span className="text-xs font-semibold text-[#234E70]">{featuredEvent.date}</span>
            </div>

            <h3 className="text-2xl font-bold text-[#1E3A5F] mt-4">{featuredEvent.title}</h3>
            <p className="text-xs text-gray-500 mt-1">📍 {featuredEvent.location}</p>

            <p className="text-sm text-gray-700 mt-3 leading-relaxed">
              {featuredEvent.shortDescription}
            </p>

            {/* Collage preview */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {featuredEvent.photos.slice(0, 3).map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={photo.caption}
                  className="h-24 w-full object-cover rounded-xl shadow-xs"
                />
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/events/${featuredEvent.id}`}
              className="glass-button-primary inline-flex items-center space-x-2 rounded-full px-5 py-2.5 text-xs font-bold"
            >
              <span>View Full Event Story</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Featured Blog Feed Highlight */}
        <div className="lg:col-span-5 glass-card p-6 sm:p-8 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#234E70] flex items-center space-x-1.5">
                <BookOpen className="h-4 w-4" />
                <span>Heritage Feed Update</span>
              </span>
              <span className="text-xs text-gray-400">{featuredPost.timestamp}</span>
            </div>

            <div className="flex items-center space-x-3 mt-4">
              <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h4 className="text-sm font-bold text-[#1E3A5F]">{featuredPost.author.name}</h4>
                <p className="text-[11px] text-gray-500">{featuredPost.author.role}</p>
              </div>
            </div>

            <p className="text-xs text-gray-700 mt-3 leading-relaxed line-clamp-3">
              {featuredPost.content}
            </p>

            {featuredPost.eventMediaRef && (
              <div className="mt-3 rounded-xl overflow-hidden border border-white/60">
                <img src={featuredPost.eventMediaRef.imageUrl} alt="Ref" className="h-32 w-full object-cover" />
              </div>
            )}
          </div>

          <div className="pt-3">
            <Link
              href="/blog"
              className="glass-button-secondary inline-flex items-center space-x-2 rounded-full px-5 py-2.5 text-xs font-bold w-full justify-center"
            >
              <span>Explore Community Feed</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* COMMUNITY STATS */}
      <section
        className="rounded-3xl shadow-xl p-8"
        style={{
          background: 'linear-gradient(135deg, #234E70 0%, #1E3A5F 50%, #234E70 100%)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F4A300]">1,200+</div>
            <div className="text-xs font-semibold text-white/80 mt-1">Associated Families</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#D96C8F]">45+</div>
            <div className="text-xs font-semibold text-white/80 mt-1">Vedic Scholarships</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#8FAF88]">120+</div>
            <div className="text-xs font-semibold text-white/80 mt-1">Community Events</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#D8B384]">15+ Years</div>
            <div className="text-xs font-semibold text-white/80 mt-1">Heritage Legacy</div>
          </div>
        </div>
      </section>

      {/* MEMORY PREVIEW GALLERY */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F]">Community Memory Cloud</h2>
            <p className="text-xs text-gray-600">Preserving moments of togetherness across generations.</p>
          </div>
          <Link href="/gallery" className="text-xs font-bold text-[#D96C8F] hover:underline flex items-center space-x-1">
            <span>View Full Photo Cloud</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {MOCK_PHOTO_CLOUD.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden glass-card shadow-md aspect-square">
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#F4A300]">{item.occasion}</span>
                <span className="text-xs text-white font-medium line-clamp-1">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DONATE CTA BANNER */}
      <section className="glass-card p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FFF8F0] via-[#F8F4EC] to-[#FFF8F0] border-2 border-[#D96C8F]/30 shadow-xl text-center space-y-4">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#D96C8F]/15 text-[#D96C8F]">
          <Heart className="h-7 w-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F]">Support Bhandhavya Community Seva</h2>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          Your voluntary contributions empower young Vedic scholars, honor senior elders, and maintain our heritage programs. Guests & members alike are welcome to contribute.
        </p>
        <div>
          <Link
            href="/donate"
            className="glass-button-primary inline-flex items-center space-x-2 rounded-full px-8 py-3.5 text-sm font-bold shadow-lg"
          >
            <Heart className="h-4 w-4" />
            <span>Make a Contribution</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
