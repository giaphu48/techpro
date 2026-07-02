'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  favorites?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  toggleFavorite: (productId: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user data on mount
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Optionally fetch latest favorites here
      api.get('/api/users/favorites').then((res) => {
        setUser(prev => prev ? { ...prev, favorites: res.data.favorites } : prev);
        localStorage.setItem('user', JSON.stringify({ ...JSON.parse(storedUser), favorites: res.data.favorites }));
      }).catch(err => console.error("Failed to fetch favorites", err));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  const toggleFavorite = async (productId: string) => {
    if (!user) return;
    try {
      const res = await api.post('/api/users/favorites', { productId });
      const newFavorites = res.data.favorites;
      const updatedUser = { ...user, favorites: newFavorites };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Lỗi khi cập nhật yêu thích:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleFavorite, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
