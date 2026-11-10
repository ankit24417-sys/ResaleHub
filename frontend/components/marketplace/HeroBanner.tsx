'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, ArrowRight, Building, CheckCircle2, TrendingUp } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <section className="relative bg-slate-950 overflow-hidden pt-12 pb-24 md:pb-32 border-b border-slate-900">
      {/* Background Unsplash Container with Luminosity Blend & Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity transform scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Trust Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-sm">
          <Shield className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
          <span>Institutional Franchise Resale Brokerage</span>
        </div>

        {/* Main Headline with Montserrat Hierarchy & Emerald Anchor */}
        <h1 className="font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-[1.08] max-w-5xl mx-auto">
          THE INSTITUTIONAL PLATFORM FOR{' '}
          <span className="text-emerald-500">FRANCHISE RESALES</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
          Buy and sell profitable, operating franchise units with absolute confidentiality.
          Protect your staff, customers, and franchisor relationships behind verified blind teasers and digital NDAs.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#listings-grid"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            BROWSE ACTIVE RESALES
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </a>

          <Link
            href="/seller/create"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs uppercase tracking-widest shadow-lg hover:border-slate-500 transition-all duration-200"
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            CREATE BLIND LISTING
          </Link>
        </div>

        {/* Executive Metric Cards Ribbon */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction Volume</span>
            </div>
            <p className="font-black text-2xl sm:text-3xl text-white tracking-tight">$140M+</p>
            <p className="text-[11px] text-slate-400 mt-1">Multi-unit & single-unit transferred</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Lock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confidentiality</span>
            </div>
            <p className="font-black text-2xl sm:text-3xl text-white tracking-tight">100%</p>
            <p className="text-[11px] text-slate-400 mt-1">Strict blind teaser gating protocol</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Qualified Buyers</span>
            </div>
            <p className="font-black text-2xl sm:text-3xl text-white tracking-tight">1,250+</p>
            <p className="text-[11px] text-slate-400 mt-1">Audited liquidity & net worth</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Building className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Speed to Escrow</span>
            </div>
            <p className="font-black text-2xl sm:text-3xl text-white tracking-tight">64 Days</p>
            <p className="text-[11px] text-slate-400 mt-1">Average NDA to definitive LOI</p>
          </div>

        </div>

      </div>
    </section>
  );
};

