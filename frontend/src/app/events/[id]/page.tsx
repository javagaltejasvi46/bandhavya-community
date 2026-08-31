'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_EVENTS } from '@/services/mockData';
import { useAuth } from '@/context/AuthContext';
import { Calendar, MapPin, Tag, User, MessageSquare, Send, LogIn, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function EventDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = params?.id as string;
  const highlightMedia = searchParams.get('highlightMedia');

  const { user, isGuest } = useAuth();

  const event = MOCK_EVENTS.find((e) => e.id === eventId) || MOCK_EVENTS[0];

  const [comments, setComments] = useState([
    {
      id: 'c1',
      author: 'Smt. Gayatri Devi',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      timestamp: '2 hours ago',
      text: 'A truly divine and memorable event! Grateful to all organizers for preserving our traditions.',
    },
    {
      id: 'c2',
      author: 'Shri Ramachandra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      timestamp: 'Yesterday',
      text: 'The Veda chanting in the morning gave me immense peace. Looking forward to the next Sammelan.',
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isGuest || !user) return;

    setComments([
      ...comments,
      {
        id: `c_${Date.now()}`,
        author: user.name,
        avatar: user.avatar,
        timestamp: 'Just now',
        text: newComment,
      },
    ]);
    setNewComment('');
  };

  return (
    <div className="space-y-10">
      {/* Back Button */}
      <Link href="/events" className="inline-flex items-center space-x-2 text-xs font-bold text-[#234E70] hover:text-[#D96C8F] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Events List</span>
      </Link>

      {/* Hero Header */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-[#D96C8F]/15 text-[#D96C8F] px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Tag className="h-3.5 w-3.5" />
            <span>{event.category}</span>
          </span>
          <span className="text-xs font-semibold text-gray-500 flex items-center space-x-1">
            <Calendar className="h-3.5 w-3.5 text-[#234E70]" />
            <span>{event.date}</span>
          </span>
          <span className="text-xs font-semibold text-gray-500 flex items-center space-x-1">
            <MapPin className="h-3.5 w-3.5 text-[#C76B42]" />
            <span>{event.location}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A5F]">{event.title}</h1>

        <div className="flex items-center space-x-3 text-xs text-gray-600 border-t border-b border-gray-200/60 py-3">
          <User className="h-4 w-4 text-[#234E70]" />
          <span>Organized by <strong className="text-[#1E3A5F]">{event.organizer}</strong></span>
        </div>

        {/* Hero Photo Composition */}
        <div className="rounded-2xl overflow-hidden shadow-2xl h-80 sm:h-96 relative">
          <img src={event.photos[0]?.url} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs text-white/90 font-medium">{event.photos[0]?.caption}</span>
          </div>
        </div>
      </div>

      {/* Main Narrative & Story Hub */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold text-[#1E3A5F] border-b border-gray-200/60 pb-3">Event Story & Narrative</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
          {event.narrative}
        </p>
      </div>

      {/* Memory Archive Photo Gallery */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1E3A5F] flex items-center space-x-2">
            <ImageIcon className="h-6 w-6 text-[#D96C8F]" />
            <span>Event Photo Archive</span>
          </h2>
          <span className="text-xs text-gray-500">{event.photos.length} Photos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.photos.map((photo) => {
            const isHighlighted = highlightMedia === photo.id;
            return (
              <div
                key={photo.id}
                id={`media-${photo.id}`}
                className={`group relative rounded-2xl overflow-hidden glass-card p-2 transition-all ${
                  isHighlighted ? 'flash-highlight ring-4 ring-[#D96C8F]' : ''
                }`}
              >
                <div className="h-48 rounded-xl overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs font-semibold text-[#1E3A5F] mt-2 px-1">{photo.caption}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comments Hub */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold text-[#1E3A5F] flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-[#234E70]" />
          <span>Community Comments ({comments.length})</span>
        </h2>

        {/* Add Comment Form or Guest Login Notice */}
        {!isGuest && user ? (
          <form onSubmit={handleAddComment} className="flex gap-3">
            <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Share your warm thoughts or blessings on this event..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="glass-input flex-1 px-4 py-2.5 text-xs font-medium"
              />
              <button
                type="submit"
                className="glass-button-primary rounded-full px-5 py-2.5 text-xs font-bold flex items-center space-x-1"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Post</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/80 flex items-center justify-between">
            <div className="text-xs text-gray-700">
              <strong className="text-[#1E3A5F]">Viewing as Guest:</strong> Sign in to leave a comment and interact with community members.
            </div>
            <Link
              href="/login"
              className="glass-button-secondary rounded-full px-4 py-2 text-xs font-bold flex items-center space-x-1.5 shrink-0"
            >
              <LogIn className="h-3.5 w-3.5 text-[#D96C8F]" />
              <span>Login to Comment</span>
            </Link>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4 pt-2">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white/40 backdrop-blur-xs rounded-2xl p-4 border border-white/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img src={comment.avatar} alt={comment.author} className="h-8 w-8 rounded-full object-cover" />
                  <span className="text-xs font-bold text-[#1E3A5F]">{comment.author}</span>
                </div>
                <span className="text-[11px] text-gray-400">{comment.timestamp}</span>
              </div>
              <p className="text-xs text-gray-700 pl-10">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
