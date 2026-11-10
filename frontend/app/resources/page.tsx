'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import {
  FileText,
  Download,
  BookOpen,
  Lock,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';

export default function ResourcesPage() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const guides = [
    {
      id: 'valuation-report',
      title: '2026 North American Franchise Resale Multiples Report',
      category: 'M&A Market Valuation',
      desc: 'Comprehensive analysis of 650+ franchise transactions across QSR, fitness, auto, and home services. Multiple benchmarks by brand tier and geographic region.',
      size: '4.8 MB PDF',
      reads: '1,420 Downloads',
    },
    {
      id: 'due-diligence-playbook',
      title: 'Institutional Franchise Buyer Due Diligence Playbook',
      category: 'Buyer Guide',
      desc: 'The essential 45-point audit checklist covering P&L normalization, POS transaction logs, mystery shopper audits, and royalty calculations.',
      size: '3.2 MB PDF',
      reads: '2,150 Downloads',
    },
    {
      id: 'sba-financing-guide',
      title: 'SBA 7(a) & 504 Franchise Acquisition Financing Guide',
      category: 'Lending & Capital',
      desc: 'How to structure franchise resale acquisitions with 10% equity down. Preferred lender benchmarks, DSCR ratios, and working capital buffers.',
      size: '2.9 MB PDF',
      reads: '980 Downloads',
    },
    {
      id: 'seller-exit-strategy',
      title: 'The Confidential Seller Exit Strategy & Tax Optimization',
      category: 'Seller Advisory',
      desc: 'Asset sale vs stock sale considerations, section 1060 purchase price allocation, and avoiding unauthorized landlord lease assignment defaults.',
      size: '3.5 MB PDF',
      reads: '1,120 Downloads',
    },
  ];

  const handleDownload = (title: string) => {
    setDownloadSuccess(`Downloaded "${title}". Check your downloads.`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Hero Header */}
      <PageHeader
        badge="Research & M&A Publications"
        title="FRANCHISE RESALE"
        highlightWord="KNOWLEDGE CENTER"
        subtitle="Institutional research, proprietary valuation multiples, and legal documentation frameworks curated by senior franchise brokers and M&A attorneys."
        bgImageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Download Alert Toast */}
      {downloadSuccess && (
        <div className="sticky top-24 z-40 max-w-md mx-auto my-4 p-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center justify-between animate-in fade-in">
          <span>{downloadSuccess}</span>
          <button onClick={() => setDownloadSuccess(null)} className="ml-2 font-black">
            ✕
          </button>
        </div>
      )}

      {/* 2. Downloadable Guides Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Institutional Research
          </span>
          <h2 className="mt-2 font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            DOWNLOADABLE GUIDES & <span className="text-emerald-500">M&A REPORTS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {g.category}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{g.size}</span>
                </div>
                <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight mb-2">
                  {g.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {g.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">{g.reads}</span>
                <button
                  onClick={() => handleDownload(g.title)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download Guide</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Sample Digital NDA Specification Section */}
      <section id="nda-terms" className="py-20 bg-slate-950 text-white border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Legal Architecture
              </span>
              <h2 className="font-black text-3xl sm:text-4xl uppercase tracking-tight">
                DIGITAL NON-DISCLOSURE <span className="text-emerald-500">AGREEMENT (NDA)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Every deal room on ResaleHub is protected by our standard v2.4 Franchise Resale Confidentiality Agreement. Binding liquidated damages, restrictive covenant non-solicits, and IP-verified digital execution prevent unauthorized leaks.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">24-Month Non-Circumvention</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Prospective buyers agree not to approach franchise employees, landlords, or franchisors directly without broker representation.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Cryptographic Audit Trail</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Execution timestamps, IPv4/IPv6 addresses, and verified corporate identity fingerprints attached permanently to the contract.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated NDA Contract Box */}
            <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl font-mono text-[11px] text-slate-300 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-emerald-400 uppercase tracking-widest text-xs">
                  FORM NDA-2026-FRANCHISE
                </span>
                <span className="text-slate-500">SECURE DRAFT</span>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar text-slate-400 leading-relaxed font-sans text-xs">
                <p>
                  <strong className="text-white">1. Confidential Information:</strong> The term "Confidential Material" encompasses all financial statements, P&L schedules, customer volumes, franchisor Item 19 addenda, and lease terms disclosed via the ResaleHub Virtual Data Room.
                </p>
                <p>
                  <strong className="text-white">2. Non-Disclosure & Staff Protection:</strong> The Recipient shall not contact any employee, store manager, shift supervisor, landlord, or franchisor representative without prior written consent of ResaleHub.
                </p>
                <p>
                  <strong className="text-white">3. Liquidated Damages:</strong> Unauthorized disclosure resulting in employee disruption or franchisor lease termination shall subject the violating party to liquidated damages of up to $100,000 per violation plus legal fees.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold">Standard 1-Year Term</span>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-black uppercase text-[10px] tracking-wider"
                >
                  Execute with Account
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Resale Transfer FAQ */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Legal & Regulatory Knowledge
          </span>
          <h2 className="mt-2 font-black text-3xl text-slate-900 uppercase tracking-tight">
            LEGAL TRANSFER <span className="text-emerald-500">DOCUMENTATION FAQ</span>
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              What is the difference between an Asset Sale and a Stock Sale in franchise resales?
            </h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Over 95% of franchise resales are structured as Asset Sales. The buyer creates a new operating LLC to acquire the store assets, inventory, and goodwill, while avoiding historical liabilities, tax liens, or labor claims of the seller's entity.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              How is the commercial lease transferred during closing?
            </h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              The buyer executes a formal Lease Assignment and Assumption Agreement approved in writing by the landlord. Most landlords require personal credit scores of 680+ and 2 years of business tax returns before releasing the prior tenant's personal guarantee.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              What role does Item 19 of the Franchisor FDD play?
            </h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Item 19 (Financial Performance Representations) of the brand's Franchise Disclosure Document outlines corporate system average unit volumes (AUV). Comparing the specific resale store's historical P&Ls against Item 19 benchmarks reveals whether the unit is outperforming or underperforming the brand average.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

