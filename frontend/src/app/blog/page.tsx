'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_POSTS, BlogPostItem } from '@/services/mockData';
import { useAuth } from '@/context/AuthContext';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Image as ImageIcon, 
  Send, 
  Sparkles, 
  Rss, 
  Flame, 
  Users, 
  Tag, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

export default function BlogPage() {
  const router = useRouter();
  const { user, isGuest, isAdmin } = useAuth();

  const [posts, setPosts] = useState<BlogPostItem[]>(MOCK_POSTS);
  const [activeTab, setActiveTab] = useState('Feed');
  const [newPostContent, setNewPostContent] = useState('');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  // Handle Admin Post Creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !isAdmin || !user) return;

    const createdPost: BlogPostItem = {
      id: `post_${Date.now()}`,
      author: {
        name: user.name,
        avatar: user.avatar,
        role: user.role === 'ADMIN' ? 'Admin / Executive' : 'Member',
        handle: `@${user.name.toLowerCase().replace(/\s+/g, '')}`,
      },
      timestamp: 'Just now',
      category: 'General Update',
      content: newPostContent,
      likes: 0,
      commentsCount: 0,
      comments: [],
    };

    setPosts([createdPost, ...posts]);
    setNewPostContent('');
  };

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  // Photo click behavior: Navigate to related event and highlight media
  const handlePhotoClick = (eventId: string, mediaId: string) => {
    router.push(`/events/${eventId}?highlightMedia=${mediaId}#media-${mediaId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar */}
      <div className="hidden lg:block lg:col-span-3 space-y-4">
        <div className="glass-card p-5 rounded-3xl space-y-2 sticky top-24">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D96C8F] px-3 py-1 mb-2">
            Feed Navigation
          </div>

          {[
            { name: 'Feed', icon: Rss },
            { name: 'For You', icon: Flame },
            { name: 'Following', icon: Users },
            { name: 'Categories', icon: Tag },
            { name: 'Saved', icon: Bookmark },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center space-x-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#234E70] text-white shadow-md'
                    : 'text-[#1E3A5F] hover:bg-white/60'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Centre Feed */}
      <div className="lg:col-span-9 space-y-6">
        {/* Header Tabs */}
        <div className="glass-card p-4 rounded-3xl flex items-center justify-between">
          <div className="flex space-x-2">
            {['All Posts', 'Announcements', 'Community Seva'].map((tab, idx) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  idx === 0 ? 'bg-[#D96C8F] text-white' : 'text-[#1E3A5F] hover:bg-white/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Admin Role Status Badge */}
          {isAdmin ? (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full flex items-center space-x-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Admin Mode: Post Composer Active</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Read-Only Feed View ({isGuest ? 'Guest' : 'Member'})
            </span>
          )}
        </div>

        {/* Admin-Only Create Post Composer */}
        {isAdmin && user && (
          <div className="glass-card p-6 rounded-3xl space-y-4 border-2 border-[#D96C8F]/40 shadow-lg">
            <div className="flex items-center space-x-3">
              <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-[#1E3A5F]">Create Official Post</h4>
                <p className="text-[10px] text-gray-500">Visible to all community members and visitors</p>
              </div>
            </div>

            <textarea
              rows={3}
              placeholder="What heritage news, event update, or blessing would you like to share?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="glass-input w-full p-4 text-xs font-medium resize-none"
            />

            <div className="flex items-center justify-between pt-2">
              <button className="text-xs text-gray-500 hover:text-[#D96C8F] flex items-center space-x-1 font-semibold">
                <ImageIcon className="h-4 w-4 text-[#D96C8F]" />
                <span>Attach Event Photo</span>
              </button>

              <button
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className="glass-button-primary rounded-full px-6 py-2.5 text-xs font-bold flex items-center space-x-1.5 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Publish Post</span>
              </button>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="glass-card p-6 rounded-3xl space-y-4 shadow-md">
              {/* Author Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img src={post.author.avatar} alt={post.author.name} className="h-11 w-11 rounded-full object-cover border border-white" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-[#1E3A5F]">{post.author.name}</h3>
                      <span className="text-[11px] text-gray-400">{post.author.handle}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#D96C8F] bg-[#D96C8F]/10 px-2 py-0.5 rounded-md">
                      {post.author.role}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{post.timestamp}</span>
              </div>

              {/* Post Content */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                {post.content}
              </p>

              {/* Event Photo Media Link (Photo Click Requirement) */}
              {post.eventMediaRef && (
                <div
                  onClick={() => handlePhotoClick(post.eventMediaRef!.eventId, post.eventMediaRef!.mediaId)}
                  className="cursor-pointer group relative rounded-2xl overflow-hidden border-2 border-white/80 shadow-md"
                >
                  <img
                    src={post.eventMediaRef.imageUrl}
                    alt={post.eventMediaRef.caption}
                    className="w-full h-64 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[10px] uppercase font-bold text-[#F4A300]">📸 Click to view in Event Gallery</span>
                    <span className="text-xs font-semibold text-white">{post.eventMediaRef.caption}</span>
                  </div>
                </div>
              )}

              {/* Interactions Bar */}
              <div className="flex items-center justify-between border-t border-gray-200/50 pt-3 text-xs text-gray-600 font-semibold">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-colors ${
                    post.isLiked ? 'text-rose-600 bg-rose-50' : 'hover:bg-white/60'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full hover:bg-white/60 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-[#234E70]" />
                  <span>{post.comments.length} Comments</span>
                </button>

                <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full hover:bg-white/60 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Expandable Inline Comments */}
              {expandedPostId === post.id && (
                <div className="mt-4 pt-4 border-t border-gray-200/50 space-y-3">
                  <h4 className="text-xs font-bold text-[#1E3A5F]">Inline Comments Thread</h4>
                  {post.comments.map((c) => (
                    <div key={c.id} className="bg-white/50 p-3 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1E3A5F]">{c.author}</span>
                        <span className="text-[10px] text-gray-400">{c.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
