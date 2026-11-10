'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import {
  ShieldAlert,
  Lock,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileSpreadsheet,
  Building,
  HelpCircle,
} from 'lucide-react';

export default function SellersPage() {
  // Interactive Valuation Calculator State
  const [revenue, setRevenue] = useState<number>(1200000);
  const [cashFlow, setCashFlow] = useState<number>(320000);
  const [industryMultiplier, setIndustryMultiplier] = useState<number>(3.2);

  const estimatedLow = Math.round(cashFlow * (industryMultiplier - 0.3));
  const estimatedHigh = Math.round(cashFlow * (industryMultiplier + 0.4));
  const averageVal = Math.round(cashFlow * industryMultiplier);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const timelineSteps = [
    {
      phase: 'Weeks 1 - 2',
      title: 'Valuation & Blind Studio Setup',
      desc: 'Our M&A advisors normalize your P&Ls, add back discretionary owner expenses, and build your confidential blind teaser inside the Seller Listing Studio.',
    },
    {
      phase: 'Weeks 3 - 5',
      title: 'Buyer Matching & NDA Clearance',
      desc: 'We market your blind teaser to our 1,200+ verified corporate and private equity buyers. Interested parties execute binding digital NDAs and verify liquidity.',
    },
    {
      phase: 'Weeks 6 - 8',
      title: 'Franchisor Transfer Submission',
      desc: 'Once an acceptable Letter of Intent (LOI) is executed, buyer applications are submitted to the franchisor corporate transfer desk for approval.',
    },
    {
      phase: 'Weeks 9 - 10',
      title: 'Closing & Escrow Disbursement',
      desc: 'Franchise agreement assignment, commercial lease transfer, and escrow disbursement of acquisition funds with zero store downtime.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Hero Header */}
      <PageHeader
        badge="Confidential M&A Advisory"
        title="SELL YOUR FRANCHISE"
        highlightWord="CONFIDENTIALLY"
        subtitle="Exit at peak valuation without alerting your staff, suppliers, or competitors. We engineer airtight blind marketing packages and pre-screen every prospective buyer."
        bgImageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/seller/create"
            className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all"
          >
            LAUNCH SELLER STUDIO
          </Link>
          <a
            href="#calculator"
            className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs uppercase tracking-widest transition-all"
          >
            FREE VALUATION CALCULATOR
          </a>
        </div>
      </PageHeader>

      {/* 2. Interactive Valuation Calculator */}
      <section id="calculator" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-200">
              <Calculator className="w-3.5 h-3.5" />
              <span>Real-Time M&A Multiple Model</span>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight leading-tight">
              ESTIMATE YOUR <span className="text-emerald-500">RESALE VALUE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Franchise resales trade on a multiple of Seller's Discretionary Earnings (SDE) or adjusted EBITDA. Calculate your expected exit valuation instantly using current market transaction benchmarks.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Discretionary Owner Add-Backs
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Remember to add back owner salary, personal vehicle allowances, health benefits, and one-time non-recurring expenses to your net net income to determine true SDE cash flow.
              </p>
            </div>
          </div>

          {/* Calculator Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl">
            <div className="space-y-6">
              
              {/* Annual Gross Revenue */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Annual Gross Revenue
                  </label>
                  <span className="font-black text-sm text-slate-900">
                    {formatCurrency(revenue)}
                  </span>
                </div>
                <input
                  type="range"
                  min="300000"
                  max="5000000"
                  step="50000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Annual Cash Flow / SDE */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Seller Discretionary Earnings (SDE / Cash Flow)
                  </label>
                  <span className="font-black text-sm text-emerald-600">
                    {formatCurrency(cashFlow)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1500000"
                  step="10000"
                  value={cashFlow}
                  onChange={(e) => setCashFlow(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Multiple Selector */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-900 block mb-2">
                  Industry Multiple Benchmark
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'QSR / Food', val: 3.5 },
                    { label: 'Fitness & Auto', val: 3.2 },
                    { label: 'Services / Health', val: 3.8 },
                  ].map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setIndustryMultiplier(m.val)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        industryMultiplier === m.val
                          ? 'bg-slate-950 text-emerald-400 border-slate-950 shadow-md'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m.label} ({m.val}x)
                    </button>
                  ))}
                </div>
              </div>

              {/* Valuation Result Panel */}
              <div className="pt-6 border-t border-slate-100 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                  Estimated Resale Market Valuation
                </span>
                <p className="font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  {formatCurrency(averageVal)}
                </p>
                <p className="text-xs font-bold text-emerald-600 mt-1">
                  Expected Asking Range: {formatCurrency(estimatedLow)} – {formatCurrency(estimatedHigh)}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/seller/create"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest text-center shadow-md transition-all"
                  >
                    Build Blind Listing in Studio
                  </Link>
                  <Link
                    href="/contact"
                    className="py-3 px-4 rounded-xl bg-slate-900 text-white font-extrabold text-xs uppercase tracking-widest text-center hover:bg-slate-800 transition-colors"
                  >
                    Request Certified CPA Opinion
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Blind Listing Privacy Guarantees */}
      <section className="py-20 bg-slate-950 text-white border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              The Franchise Resale Privacy Protocol
            </span>
            <h2 className="mt-2 font-black text-3xl sm:text-4xl uppercase tracking-tight">
              4 NON-NEGOTIABLE <span className="text-emerald-500">PRIVACY SHIELDS</span>
            </h2>
            <p className="mt-3 text-sm text-slate-400 font-medium">
              We understand what is at stake. An unshielded listing leads to employee walkouts, landlord hold-ups, and franchisor friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm text-white uppercase tracking-tight mb-2">
                Blind Geographical Teasers
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Listings are cataloged only by broader metro regions (e.g., "North Denver Metro, CO") with zero address or unit numbers visible publicly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm text-white uppercase tracking-tight mb-2">
                Mandatory Legal NDAs
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every prospective buyer must sign a binding NDA with severe liquidated damages before viewing store brand identity or financials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm text-white uppercase tracking-tight mb-2">
                Redacted Due Diligence
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Employee names and sensitive vendor account numbers are redacted in all P&Ls and tax schedules until an executed LOI is delivered.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm text-white uppercase tracking-tight mb-2">
                Zero Landlord Notification
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Commercial landlords are only engaged at the lease assignment stage after full buyer approval and franchisor certification.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Seller Process Timeline */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Predictable Closing Milestones
          </span>
          <h2 className="mt-2 font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            THE 60-DAY SELLER <span className="text-emerald-500">ROADMAP</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineSteps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg relative flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-emerald-400 mb-4">
                  {s.phase}
                </span>
                <h3 className="font-black text-base text-slate-900 uppercase tracking-tight mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                <Clock className="w-3.5 h-3.5" />
                <span>On-schedule execution</span>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Launch CTA Box */}
        <div className="mt-16 bg-gradient-to-r from-slate-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              Interactive Seller Portal
            </span>
            <h3 className="font-black text-2xl sm:text-4xl uppercase tracking-tight mt-2">
              READY TO BUILD YOUR <span className="text-emerald-500">BLIND LISTING?</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300">
              Our 5-step Seller Listing Studio guides you through financial recasting, territory polygon definition, and instant blind teaser generation.
            </p>
            <div className="mt-8">
              <Link
                href="/seller/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all"
              >
                <span>LAUNCH SELLER LISTING STUDIO</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

