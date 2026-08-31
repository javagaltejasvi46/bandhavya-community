'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'GUEST' | 'USER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  memberSince: string;
  postsCount: number;
  eventsCount: number;
}

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  isGuest: boolean;
  isUser: boolean;
  isAdmin: boolean;
}

const defaultUser: UserProfile = {
  id: 'usr_1',
  name: 'Tejasvi Javagal',
  email: 'tejasvi@bhandhavya.org',
  role: 'ADMIN',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  memberSince: 'Jan 2022',
  postsCount: 14,
  eventsCount: 8,
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  role: 'ADMIN',
  setRole: () => {},
  login: () => {},
  logout: () => {},
  isGuest: false,
  isUser: false,
  isAdmin: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('ADMIN');
  const [user, setUser] = useState<UserProfile | null>(defaultUser);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'GUEST') {
      setUser(null);
    } else if (!user) {
      setUser({
        ...defaultUser,
        role: newRole,
      });
    } else {
      setUser({
        ...user,
        role: newRole,
      });
    }
  };

  const login = (email: string, requestedRole: UserRole = 'USER') => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0] || 'Community Member',
      email: email,
      role: requestedRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
      memberSince: 'Aug 2026',
      postsCount: 0,
      eventsCount: 1,
    };
    setUser(newUser);
    setRoleState(requestedRole);
  };

  const logout = () => {
    setUser(null);
    setRoleState('GUEST');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        login,
        logout,
        isGuest: role === 'GUEST',
        isUser: role === 'USER',
        isAdmin: role === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
