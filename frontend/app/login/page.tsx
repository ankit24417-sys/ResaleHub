'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const { login, register, quickLogin } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'buyer' | 'seller' | 'franchisor' | 'consultant'>('buyer');
  const [regCompany, setRegCompany] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLiquidCapital, setRegLiquidCapital] = useState('250000');
  const [regNetWorth, setRegNetWorth] = useState('1000000');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await login(loginEmail, loginPassword);
    setLoading(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setError(res.message || 'Invalid email or password.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await register({
      name: regName,
      email: regEmail,
      password: regPassword,
      role: regRole,
      company: regCompany,
      phone: regPhone,
      liquidCapital: Number(regLiquidCapital),
      netWorth: Number(regNetWorth),
    });
    setLoading(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  const handleDemoClick = async (role: 'buyer' | 'seller' | 'franchisor' | 'consultant') => {
    setLoading(true);
    setError(null);
    const success = await quickLogin(role);
    setLoading(false);
    if (success) {
      router.push(redirectPath);
    } else {
      setError('Failed to log in with demo account.');
    }
  };

  return (
    <div className="relative max-w-md w-full mx-auto space-y-8">
      {/* Page Title & Subhead (redundant logo removed since navbar displays it) */}
      <div className="text-center pt-2">
        <h1 className="font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
          {activeTab === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 font-medium">
          {activeTab === 'login'
            ? 'Access confidential franchise resales, digital NDAs, and Virtual Data Rooms.'
            : 'Register for verified buyer, seller, franchisor, or advisor deal room access.'}
        </p>
      </div>

      {/* Tab Toggle: Login / Create Account */}
      <div className="flex rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800 shadow-lg">
        <button
          type="button"
          onClick={() => {
            setActiveTab('login');
            setError(null);
          }}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 ${
            activeTab === 'login'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('register');
            setError(null);
          }}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 ${
            activeTab === 'register'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Create Account
        </button>
      </div>

      {/* 1-Click Demo Accounts Selector */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Demo Quick-Switch</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleDemoClick('buyer')}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold border border-slate-700 text-left transition-colors flex items-center justify-between"
          >
            <span>Buyer Demo</span>
            <span className="text-[9px] text-emerald-400 font-extrabold uppercase">1-Click</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoClick('seller')}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold border border-slate-700 text-left transition-colors flex items-center justify-between"
          >
            <span>Seller Demo</span>
            <span className="text-[9px] text-emerald-400 font-extrabold uppercase">1-Click</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoClick('franchisor')}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold border border-slate-700 text-left transition-colors flex items-center justify-between"
          >
            <span>Franchisor Demo</span>
            <span className="text-[9px] text-emerald-400 font-extrabold uppercase">1-Click</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoClick('consultant')}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold border border-slate-700 text-left transition-colors flex items-center justify-between"
          >
            <span>Advisor Demo</span>
            <span className="text-[9px] text-emerald-400 font-extrabold uppercase">1-Click</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Main Form Surface */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl">
        {activeTab === 'login' ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="e.g. buyer@resalehub.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all duration-200 disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Logging In...</span>
              ) : (
                <>
                  <span>LOGIN</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setError(null);
                  }}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* CREATE ACCOUNT FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                Full Name / Principal
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. David Reynolds"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="david@apexcapital.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                  Your Primary Role
                </label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="buyer">Prospective Buyer</option>
                  <option value="seller">Franchise Seller</option>
                  <option value="franchisor">Franchisor Brand Admin</option>
                  <option value="consultant">M&A Broker / Advisor</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                  Company / Entity
                </label>
                <input
                  type="text"
                  placeholder="HoldCo LLC"
                  value={regCompany}
                  onChange={(e) => setRegCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                  Liquid Capital
                </label>
                <input
                  type="number"
                  placeholder="250000"
                  value={regLiquidCapital}
                  onChange={(e) => setRegLiquidCapital(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                  Net Worth
                </label>
                <input
                  type="number"
                  placeholder="1000000"
                  value={regNetWorth}
                  onChange={(e) => setRegNetWorth(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest shadow-xl transition-all duration-200 disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>CREATE ACCOUNT</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setError(null);
                  }}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Unsplash Backdrop with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity transform scale-105 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950 pointer-events-none" />

      <Suspense
        fallback={
          <div className="text-center text-white text-xs uppercase tracking-widest font-black">
            Loading Portal...
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </div>
  );
}
