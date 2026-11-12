'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'franchisor' | 'consultant' | 'admin';
  company?: string;
  phone?: string;
  isVerified?: boolean;
  netWorth?: number;
  liquidCapital?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
    company?: string;
    phone?: string;
    netWorth?: number;
    liquidCapital?: number;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  quickLogin: (role: 'buyer' | 'seller' | 'franchisor' | 'consultant') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = '/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to sync cookie for Next.js middleware and SSR
  const setCookie = (name: string, value: string, days = 7) => {
    if (typeof document === 'undefined') return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const removeCookie = (name: string) => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('resalehub_token') : null;
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem('resalehub_user') : null;

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setCookie('token', storedToken);

          // Verify token with backend
          try {
            const res = await fetch(`${API_BASE}/auth/me`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            if (res.ok) {
              const data = await res.json();
              if (data.user) {
                setUser(data.user);
                localStorage.setItem('resalehub_user', JSON.stringify(data.user));
              }
            } else if (res.status === 401) {
              // Token expired
              localStorage.removeItem('resalehub_token');
              localStorage.removeItem('resalehub_user');
              removeCookie('token');
              setUser(null);
              setToken(null);
            }
          } catch {
            // Keep local session if backend temporarily unreachable
          }
        }
      } catch (err) {
        console.error('Failed to restore auth state:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Login failed.' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('resalehub_token', data.token);
      localStorage.setItem('resalehub_user', JSON.stringify(data.user));
      setCookie('token', data.token);

      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'Network error connecting to auth server.' };
    }
  };

  const register = async (formData: {
    name: string;
    email: string;
    password: string;
    role?: string;
    company?: string;
    phone?: string;
    netWorth?: number;
    liquidCapital?: number;
  }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Registration failed.' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('resalehub_token', data.token);
      localStorage.setItem('resalehub_user', JSON.stringify(data.user));
      setCookie('token', data.token);

      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, message: 'Network error connecting to auth server.' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {});
      }
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('resalehub_token');
      localStorage.removeItem('resalehub_user');
      removeCookie('token');
    }
  };

  const quickLogin = async (role: 'buyer' | 'seller' | 'franchisor' | 'consultant') => {
    const credentials = {
      buyer: { email: 'buyer@resalehub.com', password: 'password123' },
      seller: { email: 'seller@resalehub.com', password: 'password123' },
      franchisor: { email: 'franchisor@resalehub.com', password: 'password123' },
      consultant: { email: 'consultant@resalehub.com', password: 'password123' },
    }[role];

    const res = await login(credentials.email, credentials.password);
    return res.success;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        quickLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

