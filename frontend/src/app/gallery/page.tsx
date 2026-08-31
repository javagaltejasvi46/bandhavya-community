'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_PHOTO_CLOUD, PhotoCloudItem } from '@/services/mockData';
import { Sparkles, Maximize2, X, ArrowRight } from 'lucide-react';

/* ─── Reusable image tile ──────────────────────────────────────────────── */
function PhotoTile({
  photo,
  aspectRatio,
  objectPosition = 'center',
  className = '',
  onClick,
}: {
  photo: PhotoCloudItem;
  aspectRatio: string;
  objectPosition?: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
      style={{
        aspectRatio,
        boxShadow: '0 6px 24px rgba(30, 58, 95, 0.18), 0 2px 6px rgba(217,108,143,0.10)',
        border: '3px solid rgba(255,255,255,0.88)',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'scale(1.04)';
        el.style.boxShadow = '0 14px 40px rgba(30,58,95,0.28), 0 4px 12px rgba(217,108,143,0.18)';
        el.style.zIndex = '20';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'scale(1)';
        el.style.boxShadow = '0 6px 24px rgba(30, 58, 95, 0.18), 0 2px 6px rgba(217,108,143,0.10)';
        el.style.zIndex = '';
      }}
    >
      <img
        src={photo.imageUrl}
        alt={photo.caption}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        style={{ objectPosition }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <span className="text-[9px] uppercase font-bold text-[#F4A300] leading-tight">
          {photo.occasion}
        </span>
        <span className="text-xs font-bold text-white leading-tight line-clamp-1">
          {photo.caption}
        </span>
        <span className="text-[9px] text-gray-300 flex items-center gap-1 mt-0.5">
          <Maximize2 className="h-2.5 w-2.5" /> Preview
        </span>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function GalleryPage() {
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [activePhoto, setActivePhoto] = useState<PhotoCloudItem | null>(null);

  const occasions = ['All', 'Maha Sammelan 2026', 'Vidya Sambhavana', 'Sharad Navaratri'];

  // Build a stable pool of exactly 9 photos
  const pool = [...MOCK_PHOTO_CLOUD, ...MOCK_PHOTO_CLOUD, ...MOCK_PHOTO_CLOUD];
  const filtered =
    selectedOccasion === 'All'
      ? pool
      : pool.filter((p) => p.occasion === selectedOccasion);
  const photos = (filtered.length >= 9 ? filtered : pool).slice(0, 9);

  const open = (p: PhotoCloudItem) => setActivePhoto(p);

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#D96C8F]/15 px-3.5 py-1 text-xs font-bold text-[#D96C8F] mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cross-Axis Photo Cloud</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F]">
              Bhandhavya Photo Cloud
            </h1>
            <p className="text-sm text-gray-600">
              Memories arranged across four quadrants, divided by an invisible cross of negative space.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {occasions.map((occ) => (
              <button
                key={occ}
                onClick={() => setSelectedOccasion(occ)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedOccasion === occ
                    ? 'bg-[#234E70] text-white shadow-sm'
                    : 'bg-white/50 text-[#1E3A5F] hover:bg-white/80'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Photo Cloud — 4-Quadrant Cross Layout ───────────────
          Grid structure:
            cols:  [left quadrant]  [cross gap]  [right quadrant]
            rows:  [top quadrant]   [cross gap]  [bottom quadrant]
          Each quadrant has its own internal mosaic of 2-3 images.
          No rotation. No overlap. Tight gaps within quadrants.
      ──────────────────────────────────────────────────────────── */}
      <div
        className="w-full"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 56px 1fr',
          gridTemplateRows: 'auto 48px auto',
          gap: '0',
        }}
      >
        {/* ┌─────────────────────────────────────────────┐ */}
        {/* │  TOP-LEFT QUADRANT  — 3 images              │ */}
        {/* │  [   landscape 16:9            ]            │ */}
        {/* │  [ square 1:1 ] [ portrait 2:3 ]            │ */}
        {/* └─────────────────────────────────────────────┘ */}
        <div className="flex flex-col gap-3 pr-3 pb-3">
          {/* img 0 — wide landscape, full width of quadrant */}
          <PhotoTile
            photo={photos[0]}
            aspectRatio="16/9"
            objectPosition="center 40%"
            className="w-full"
            onClick={() => open(photos[0])}
          />
          {/* img 1 + img 2 — square and portrait side by side */}
          <div className="flex gap-3 items-stretch">
            <PhotoTile
              photo={photos[1]}
              aspectRatio="1/1"
              objectPosition="center"
              className="flex-1"
              onClick={() => open(photos[1])}
            />
            <PhotoTile
              photo={photos[2]}
              aspectRatio="2/3"
              objectPosition="center 35%"
              className="flex-1"
              onClick={() => open(photos[2])}
            />
          </div>
        </div>

        {/* ── Cross vertical arm (center column) ── */}
        <div /> {/* empty — this IS the cross */}

        {/* ┌─────────────────────────────────────────────┐ */}
        {/* │  TOP-RIGHT QUADRANT — 2 images              │ */}
        {/* │  [ portrait 2:3 ] [ small square ]          │ */}
        {/* └─────────────────────────────────────────────┘ */}
        <div className="flex gap-3 pl-3 pb-3 items-start">
          <PhotoTile
            photo={photos[3]}
            aspectRatio="2/3"
            objectPosition="center 30%"
            className="flex-[2]"
            onClick={() => open(photos[3])}
          />
          <PhotoTile
            photo={photos[4]}
            aspectRatio="1/1"
            objectPosition="center"
            className="flex-[1.2]"
            onClick={() => open(photos[4])}
          />
        </div>

        {/* ── Cross horizontal arm (center row, all 3 cols) ── */}
        <div /> {/* left of cross center */}
        <div /> {/* cross center */}
        <div /> {/* right of cross center */}

        {/* ┌─────────────────────────────────────────────┐ */}
        {/* │  BOTTOM-LEFT QUADRANT — 2 images            │ */}
        {/* │  [    wide landscape 16:9        ]          │ */}
        {/* │  [ portrait 2:3 (centered) ]                │ */}
        {/* └─────────────────────────────────────────────┘ */}
        <div className="flex flex-col gap-3 pr-3 pt-3">
          <PhotoTile
            photo={photos[5]}
            aspectRatio="16/9"
            objectPosition="center 55%"
            className="w-full"
            onClick={() => open(photos[5])}
          />
          <div className="flex gap-3">
            <PhotoTile
              photo={photos[6]}
              aspectRatio="3/2"
              objectPosition="center 50%"
              className="flex-[1.5]"
              onClick={() => open(photos[6])}
            />
            <PhotoTile
              photo={photos[7]}
              aspectRatio="2/3"
              objectPosition="center 40%"
              className="flex-[0.9]"
              onClick={() => open(photos[7])}
            />
          </div>
        </div>

        {/* ── Cross vertical arm (center column, bottom row) ── */}
        <div />

        {/* ┌─────────────────────────────────────────────┐ */}
        {/* │  BOTTOM-RIGHT QUADRANT — 1 image            │ */}
        {/* │  [   landscape 4:3   ]                      │ */}
        {/* └─────────────────────────────────────────────┘ */}
        <div className="flex flex-col gap-3 pl-3 pt-3">
          <PhotoTile
            photo={photos[8]}
            aspectRatio="4/3"
            objectPosition="center 60%"
            className="w-full"
            onClick={() => open(photos[8])}
          />
        </div>
      </div>

      {/* ── Lightbox Modal ─────────────────────────────────── */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-3xl w-full p-6 rounded-3xl relative bg-white/90 space-y-4">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-black bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="rounded-2xl overflow-hidden max-h-[65vh]">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.caption}
                className="w-full h-full object-contain mx-auto"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-200">
              <div>
                <span className="text-xs uppercase font-bold text-[#D96C8F]">
                  {activePhoto.occasion}
                </span>
                <h3 className="text-lg font-bold text-[#1E3A5F]">{activePhoto.caption}</h3>
              </div>
              <Link
                href={`/events/${activePhoto.eventId}`}
                onClick={() => setActivePhoto(null)}
                className="glass-button-primary rounded-full px-5 py-2.5 text-xs font-bold inline-flex items-center space-x-2 shrink-0"
              >
                <span>Go to Associated Event</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
