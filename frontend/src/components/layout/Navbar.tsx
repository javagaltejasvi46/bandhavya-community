'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Heart, 
  Calendar, 
  BookOpen, 
  Image as ImageIcon, 
  Users, 
  ShieldAlert, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, role, setRole, isGuest, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: Sparkles },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
    { name: 'People', href: '/people', icon: Users },
    { name: 'Donate', href: '/donate', icon: Heart, highlight: true },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="glass-nav flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#D96C8F] to-[#F4A300] text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="font-bold text-xl">भ</span>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#1E3A5F] group-hover:text-[#D96C8F] transition-colors">
              Bhandhavya
            </span>
            <span className="block text-[10px] uppercase font-semibold text-[#D96C8F] tracking-widest -mt-1">
              Brahmin Family Association
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            if (link.highlight) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="glass-button-primary flex items-center space-x-1.5 rounded-full px-4 py-2 text-xs font-semibold"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#234E70] text-white shadow-sm'
                    : 'text-[#1E3A5F] hover:bg-white/60 hover:text-[#D96C8F]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* Admin Route Link (Only visible to ADMIN) */}
          {isAdmin && (
            <Link
              href="/admin"
              className={`flex items-center space-x-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-all ${
                pathname.startsWith('/admin')
                  ? 'bg-[#D96C8F] text-white shadow-sm'
                  : 'bg-[#D96C8F]/10 text-[#D96C8F] hover:bg-[#D96C8F]/20'
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Admin</span>
            </Link>
          )}
        </div>

        {/* Right Section: Role Switcher & Auth */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Interactive Role Switcher Widget for Dev & Perm Testing */}
          <div className="flex items-center bg-white/50 backdrop-blur-md border border-white/60 rounded-full px-2 py-1 text-[11px] font-semibold text-[#1E3A5F]">
            <span className="mr-1.5 text-gray-500 pl-1">Role:</span>
            <button
              onClick={() => setRole('GUEST')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                role === 'GUEST' ? 'bg-amber-500 text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
              title="Guest View (No Auth)"
            >
              Guest
            </button>
            <button
              onClick={() => setRole('USER')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                role === 'USER' ? 'bg-[#234E70] text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
              title="Member View (Standard User)"
            >
              Member
            </button>
            <button
              onClick={() => setRole('ADMIN')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                role === 'ADMIN' ? 'bg-[#D96C8F] text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
              title="Admin View (Full CRUD)"
            >
              Admin
            </button>
          </div>

          {/* User Profile or Login */}
          {!isGuest && user ? (
            <div className="flex items-center space-x-2">
              <Link href="/profile" className="flex items-center space-x-2 group">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-xs group-hover:scale-105 transition-transform"
                />
                <span className="text-xs font-semibold text-[#1E3A5F] group-hover:text-[#D96C8F]">
                  {user.name.split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-white/50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="glass-button-secondary flex items-center space-x-1.5 rounded-full px-4 py-2 text-xs font-semibold"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1E3A5F] hover:bg-white/50 rounded-full"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-card p-5 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-[#1E3A5F] hover:bg-white/60"
                >
                  <Icon className="h-5 w-5 text-[#D96C8F]" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-[#D96C8F] bg-[#D96C8F]/10"
              >
                <ShieldAlert className="h-5 w-5" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>

          <div className="pt-3 border-t border-gray-200/50 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-600 font-semibold px-1">
              <span>Switch Role View:</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => setRole('GUEST')}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    role === 'GUEST' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Guest
                </button>
                <button
                  onClick={() => setRole('USER')}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    role === 'USER' ? 'bg-[#234E70] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Member
                </button>
                <button
                  onClick={() => setRole('ADMIN')}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    role === 'ADMIN' ? 'bg-[#D96C8F] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {!isGuest && user ? (
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3">
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-bold text-[#1E3A5F]">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-xl bg-red-100 text-red-600 text-xs font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="glass-button-primary text-center rounded-xl py-3 text-sm font-semibold"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
