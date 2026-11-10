'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  UserCheck,
  Key,
  DollarSign,
  ArrowRight,
  Clock,
  Building,
  HelpCircle,
} from 'lucide-react';

export default function BuyersPage() {
  const steps = [
    {
      num: '01',
      title: 'Confidential Account Creation',
      desc: 'Register your corporate entity or individual investor profile. Set target franchise sectors (QSR, Fitness, Auto, Services) and geographic acquisition boundaries.',
      icon: UserCheck,
    },
    {
      num: '02',
      title: 'Financial & Liquidity Verification',
      desc: 'Verify liquid capital ($100k-$1M+) and net worth criteria required by national franchisors to ensure immediate qualification for transfer approval.',
      icon: DollarSign,
    },
    {
      num: '03',
      title: 'Digital NDA Execution',
      desc: 'Execute legally binding, listing-specific Non-Disclosure Agreements with a single click. Cryptographically signed and time-stamped for seller protection.',
      icon: FileText,
    },
    {
      num: '04',
      title: 'Virtual Data Room Access',
      desc: 'Instantly unlock store-level 3-year audited P&Ls, equipment asset lists, commercial leases, and corporate franchisor transfer fee schedules.',
      icon: Key,
    },
  ];

  const preQualCriteria = [
    {
      title: 'Minimum Liquid Capital',
      val: '$100,000 - $350,000+',
      detail: 'Cash, marketable securities, or approved HELOC lines available for acquisition down payment and working capital.',
    },
    {
      title: 'Minimum Net Worth',
      val: '$350,000 - $1,500,000',
      detail: 'Standard franchisor threshold depending on brand tier (tier 1 QSR vs home services).',
    },
    {
      title: 'Credit Score Benchmark',
      val: '680+ FICO Score',
      detail: 'Required for commercial lease assignment and SBA 7(a) / 504 acquisition loan underwriting.',
    },
    {
      title: 'Managerial Readiness',
      val: 'Owner-Operator or Executive Oversight',
      detail: 'Willingness to attend 2-6 weeks of franchisor brand certification and operational management training.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Unsplash Executive Backdrop Hero Header */}
      <PageHeader
        badge="Qualified Buyer Services"
        title="BUYER RESALE"
        highlightWord="SERVICES"
        subtitle="Skip ground-up delays. Acquire established, cash-flowing franchise resale operations with existing customer bases, tenured staff, and immediate cash distributions."
        bgImageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#listings-grid"
            className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all"
          >
            BROWSE ACTIVE RESALES
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs uppercase tracking-widest transition-all"
          >
            VERIFY BUYER PROFILE
          </Link>
        </div>
      </PageHeader>

      {/* 2. Step-by-Step Buyer Onboarding Flow */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Institutional Acquisition Path
          </span>
          <h2 className="mt-2 font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            THE 4-STEP BUYER <span className="text-emerald-500">ONBOARDING GUIDE</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-medium">
            From blind teaser review to escrow closing in 60 to 90 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-emerald-600 tracking-tight">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-900 flex items-center justify-center border border-slate-200">
                      <Icon className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                  <h3 className="font-black text-base text-slate-900 uppercase tracking-tight mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Confidential</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Pre-Qualification Criteria Checklist */}
      <section id="qualification" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                Underwriting Standards
              </span>
              <h2 className="font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight leading-tight">
                FRANCHISOR BUYER <span className="text-emerald-500">PRE-QUALIFICATION</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Unlike independent businesses, franchise resale transfers require direct franchisor approval. Sellers and brand headquarters mandate verifiable proof of funds prior to releasing confidential store locations and full tax returns.
              </p>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <p className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  SBA 7(a) Loan Pre-Approval Available
                </p>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Most active resale listings on ResaleHub are pre-qualified with our preferred national SBA lenders, allowing acquisitions with as little as 10-15% equity down payment.
                </p>
              </div>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-md"
              >
                <span>Submit Buyer Verification</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {preQualCriteria.map((c, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      {c.title}
                    </span>
                    <p className="font-black text-xl text-slate-900 uppercase tracking-tight mt-1 mb-2">
                      {c.val}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {c.detail}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Industry standard benchmark</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Buyer FAQ Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Frequently Asked Questions
          </span>
          <h2 className="mt-2 font-black text-3xl text-slate-900 uppercase tracking-tight">
            BUYING A FRANCHISE RESALE <span className="text-emerald-500">FAQ</span>
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              Why buy an existing franchise resale instead of starting a new location?
            </h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              New build-outs incur 9-18 months of permitting delays, site selection risk, and zero revenue while burning lease capital. Resales offer immediate positive cash flow from day one, trained staff, operational infrastructure, and documented customer sales histories.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              Who pays the franchisor transfer fee?
            </h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Franchisor transfer fees typically range between $7,500 and $15,000 depending on the franchise agreement. Allocation is negotiated in the definitive Purchase and Sale Agreement (often split 50/50 or assumed by the buyer).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              What documents will I receive in the Virtual Data Room?
            </h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Upon executing the digital NDA, you receive certified 3-year Profit & Loss statements, Form 1120-S corporate tax returns, current commercial real estate lease agreements with renewal terms, equipment depreciation registries, and the franchisor Franchise Disclosure Document (FDD).
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#listings-grid"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all"
          >
            <span>VIEW ACTIVE BLIND RESALES</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>
      </section>
    </div>
  );
}

