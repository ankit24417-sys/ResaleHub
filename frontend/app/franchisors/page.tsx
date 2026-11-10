'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import {
  ShieldCheck,
  CheckCircle2,
  Building,
  Users,
  FileCheck,
  Sliders,
  Send,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';

export default function FranchisorsPage() {
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    corporateEmail: '',
    franchiseBrand: '',
    unitCount: '50 - 200 Units',
    phone: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  const workflowStages = [
    {
      step: '01',
      title: 'Automated Candidate Financial Screen',
      desc: 'Verify liquid capital ($150k+) and net worth criteria automatically against your brand standards before releasing confidential store units.',
    },
    {
      step: '02',
      title: 'Digital Discovery Day & Interview',
      desc: 'Schedule and record virtual discovery sessions directly inside the brand portal with integrated candidate evaluation scorecards.',
    },
    {
      step: '03',
      title: 'Franchisor Transfer Committee Signoff',
      desc: 'One-click executive voting and formal transfer approval memo issuance directly to buyer, seller, and legal counsel.',
    },
    {
      step: '04',
      title: 'Franchise Agreement & Lease Assignment',
      desc: 'Automated document distribution with DocuSign integration for new 10-year franchise agreements and commercial lease assumption riders.',
    },
    {
      step: '05',
      title: 'Mandatory Operator Training Tracking',
      desc: 'Track buyer progress through corporate operational academies, manager certifications, and POS system onboarding modules.',
    },
    {
      step: '06',
      title: 'Closing & Escrow Fee Disbursement',
      desc: 'Receive corporate transfer fees ($10,000 - $20,000) directly from escrow prior to final point-of-sale store license cutover.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Hero Header */}
      <PageHeader
        badge="Enterprise Brand Portal"
        title="CORPORATE TRANSFER"
        highlightWord="MANAGEMENT"
        subtitle="Protect system-wide brand equity and eliminate dark store risk. Centralize candidate audits, transfer approvals, and fee collections in one automated portal."
        bgImageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#demo-form"
            className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all"
          >
            REQUEST CORPORATE DEMO
          </a>
          <a
            href="#workflow"
            className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs uppercase tracking-widest transition-all"
          >
            VIEW TRANSFER PROTOCOL
          </a>
        </div>
      </PageHeader>

      {/* 2. Enterprise Overview Matrix */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Brand Governance Infrastructure
          </span>
          <h2 className="mt-2 font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            WHY LEADING BRANDS PARTNER WITH <span className="text-emerald-500">RESALEHUB</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-medium">
            Franchise transfers are notoriously vulnerable to poor operator handoffs and unapproved sales. We bring order and strict compliance to the resale lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-2">
              Zero Unqualified Operators
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Every buyer must surpass your brand's specific liquidity, net worth, and criminal background standards before being presented for discovery interviews.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-2">
              Royalty Continuity Preservation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Prevent revenue drops from tired or retiring franchisees. Transition underperforming stores to well-capitalized, growth-oriented multi-unit operators.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-6">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-2">
              Remodel & PIP Enforcement
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Tie resale transfer approval to Property Improvement Plans (PIP) and mandatory equipment upgrades funded through buyer escrow deposits.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 6-Stage Approval Workflow */}
      <section id="workflow" className="py-20 bg-slate-950 text-white border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              Transfer Workflow Automation
            </span>
            <h2 className="mt-2 font-black text-3xl sm:text-4xl uppercase tracking-tight">
              6-STAGE CORPORATE <span className="text-emerald-500">APPROVAL PIPELINE</span>
            </h2>
            <p className="mt-3 text-sm text-slate-400 font-medium">
              Maintain full audit trails for legal compliance and franchise disclosure alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflowStages.map((st) => (
              <div
                key={st.step}
                className="bg-slate-900/90 rounded-2xl p-7 border border-slate-800 shadow-xl relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-emerald-400 tracking-tight">
                    {st.step}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                    Stage {st.step}
                  </span>
                </div>
                <h3 className="font-black text-base text-white uppercase tracking-tight mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Demo Request Form */}
      <section id="demo-form" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              Franchisor Partnership Desk
            </span>
            <h3 className="font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight mt-1">
              REQUEST ENTERPRISE <span className="text-emerald-500">PORTAL DEMO</span>
            </h3>
            <p className="text-xs text-slate-600 mt-2 font-medium">
              Discover how our team handles resales for 80+ national franchise brands.
            </p>
          </div>

          {demoSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-black text-xl text-slate-900 uppercase">
                Demo Request Received
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Our Corporate Brand VP will contact you within 2 business hours to configure your staging portal and transfer fee schedules.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Your Name & Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins (VP Franchise Development)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@franchisebrand.com"
                    value={formData.corporateEmail}
                    onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Franchise Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jersey Subs, FitStudio, etc."
                    value={formData.franchiseBrand}
                    onChange={(e) => setFormData({ ...formData, franchiseBrand: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    System Unit Count
                  </label>
                  <select
                    value={formData.unitCount}
                    onChange={(e) => setFormData({ ...formData, unitCount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="25 - 50 Units">25 – 50 Operating Units</option>
                    <option value="50 - 200 Units">50 – 200 Operating Units</option>
                    <option value="200 - 500 Units">200 – 500 Operating Units</option>
                    <option value="500+ Units">500+ Units (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                  Specific Resale or Transfer Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding your current resale pipeline or franchisee retirement programs..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-slate-950 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest transition-all duration-200 shadow-xl flex items-center justify-center gap-2"
              >
                <span>SUBMIT DEMO REQUEST</span>
                <Send className="w-4 h-4 text-emerald-400" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

