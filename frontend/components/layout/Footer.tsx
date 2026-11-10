import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Award, FileText, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-slate-900 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-white">100% Blind Listings</p>
                <p className="text-[11px] text-slate-400">Zero brand or location leaks prior to signed NDA</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-white">Vetted Buyers Only</p>
                <p className="text-[11px] text-slate-400">Audited net worth & liquid capital pre-qualifications</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-white">Franchisor Aligned</p>
                <p className="text-[11px] text-slate-400">Direct integration with corporate brand transfer desks</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-white">Bank-Grade VDR</p>
                <p className="text-[11px] text-slate-400">Full 3-year P&L, lease, and asset schedules</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sitemap Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400 border border-slate-700">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white uppercase">
                RESALE<span className="text-emerald-500">HUB</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              The premier institutional brokerage platform built for confidential franchise resales. Connecting verified buyers, motivated franchise owners, and corporate franchisors through structured Virtual Data Rooms and strict NDA enforcement.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>100 Wall Street, 24th Floor, New York, NY 10005</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>+1 (800) 840-RESALE (7372)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>advisory@resalehub.com</span>
              </div>
            </div>
          </div>

          {/* Column 1: Buyers */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              BUYER SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/buyers" className="hover:text-emerald-400 transition-colors">
                  Buyer Onboarding
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Blind Resale Teasers
                </Link>
              </li>
              <li>
                <Link href="/buyers#qualification" className="hover:text-emerald-400 transition-colors">
                  Financial Pre-Qualification
                </Link>
              </li>
              <li>
                <Link href="/resources#vdr" className="hover:text-emerald-400 transition-colors">
                  Virtual Data Room Access
                </Link>
              </li>
              <li>
                <Link href="/resources#faq" className="hover:text-emerald-400 transition-colors">
                  Buyer Due Diligence Checklist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Sellers & Studio */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              SELLER SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/sellers" className="hover:text-emerald-400 transition-colors">
                  Confidential Resale Process
                </Link>
              </li>
              <li>
                <Link href="/seller/create" className="hover:text-emerald-400 transition-colors">
                  Seller Listing Studio
                </Link>
              </li>
              <li>
                <Link href="/sellers#valuation" className="hover:text-emerald-400 transition-colors">
                  Franchise Valuation Calculator
                </Link>
              </li>
              <li>
                <Link href="/sellers#privacy" className="hover:text-emerald-400 transition-colors">
                  Blind Teaser Privacy Protocol
                </Link>
              </li>
              <li>
                <Link href="/sellers#timeline" className="hover:text-emerald-400 transition-colors">
                  Closing Timeline (60-90 Days)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Franchisors & Partners */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              PARTNERS & LEGAL
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/franchisors" className="hover:text-emerald-400 transition-colors">
                  Franchisor Transfer Portal
                </Link>
              </li>
              <li>
                <Link href="/consultants" className="hover:text-emerald-400 transition-colors">
                  Broker Co-Op Network
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-emerald-400 transition-colors">
                  Resale Knowledge Center
                </Link>
              </li>
              <li>
                <Link href="/resources#nda-terms" className="hover:text-emerald-400 transition-colors">
                  Sample Digital NDA Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Advisory Team
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimers & Copyright */}
        <div className="mt-14 pt-8 border-t border-slate-900 text-[11px] text-slate-500 space-y-4">
          <p className="leading-relaxed">
            <strong className="text-slate-400">Brokerage & Compliance Disclaimer:</strong> ResaleHub is a specialized commercial M&A marketing and transaction platform. All franchise listing summaries and teaser financials are provided by sellers and certified by third-party accountants. Prospective buyers must execute a binding Non-Disclosure Agreement (NDA) and conduct independent accounting, operational, and legal due diligence before making any purchase commitment. All brand trademarks (e.g. Jersey Mike's, Anytime Fitness, AAMCO) are the proprietary property of their respective franchisors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>© {new Date().getFullYear()} ResaleHub Technologies LLC / FranTransfer. All rights reserved.</p>
            <div className="flex items-center space-x-6 text-slate-400">
              <Link href="/resources" className="hover:text-emerald-400">Privacy Policy</Link>
              <Link href="/resources" className="hover:text-emerald-400">Terms of Service</Link>
              <Link href="/resources" className="hover:text-emerald-400">Digital NDA Agreement</Link>
              <Link href="/contact" className="hover:text-emerald-400">Security Audit</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

