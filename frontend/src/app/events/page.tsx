'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_EVENTS, EventItem } from '@/services/mockData';
import { Search, Calendar, MapPin, ArrowRight, Tag } from 'lucide-react';

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cultural Celebration', 'Educational Service', 'Heritage & Music'];

  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="glass-card p-8 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F]">Community Events</h1>
            <p className="text-sm text-gray-600 mt-1">
              Editorial collage face cards capturing moments of celebration, heritage, and service.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full pl-10 pr-4 py-2 text-xs font-medium"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#234E70] text-white shadow-xs'
                  : 'bg-white/50 text-[#1E3A5F] hover:bg-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events List Grid */}
      <div className="space-y-8">
        {filteredEvents.map((event: EventItem) => (
          <div
            key={event.id}
            className="glass-card p-6 sm:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Multi-photo Editorial Collage */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3 relative">
              {event.photos.slice(0, 3).map((photo, idx) => (
                <div
                  key={photo.id}
                  className={`relative rounded-2xl overflow-hidden shadow-md group ${
                    idx === 0 ? 'col-span-2 h-52' : 'h-36'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                    <span className="text-[10px] text-white font-medium">{photo.caption}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Event Information */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-[#D96C8F]/15 text-[#D96C8F] px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <Tag className="h-3 w-3" />
                  <span>{event.category}</span>
                </span>
                <span className="text-xs font-semibold text-gray-500 flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5 text-[#234E70]" />
                  <span>{event.date}</span>
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#1E3A5F]">{event.title}</h2>

              <p className="text-xs font-semibold text-gray-600 flex items-center space-x-1.5">
                <MapPin className="h-4 w-4 text-[#C76B42]" />
                <span>{event.location}</span>
              </p>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {event.shortDescription}
              </p>

              <div className="pt-2">
                <Link
                  href={`/events/${event.id}`}
                  className="glass-button-primary inline-flex items-center space-x-2 rounded-full px-6 py-2.5 text-xs font-bold"
                >
                  <span>View Event Story & Photos</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="glass-card p-12 text-center text-gray-500 rounded-3xl">
            <p className="text-sm font-semibold">No events found matching your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
