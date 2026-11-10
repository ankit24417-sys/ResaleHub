'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import {
  Briefcase,
  CheckCircle2,
  DollarSign,
  Users,
  Handshake,
  Send,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function ConsultantsPage() {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    firm: '',
    email: '',
    phone: '',
    experienceYears: '5 - 10 Years',
    specialty: 'Food & QSR',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Hero Header */}
      <PageHeader
        badge="Co-Brokerage & Advisor Alliance"
        title="BROKER & CONSULTANT"
        highlightWord="PARTNERSHIPS"
        subtitle="Monetize your buyer and seller relationships. Join North America's premier franchise co-broker network with protected 50/50 commission splits and deal room infrastructure."
        bgImageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#register"
            className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all"
          >
            REGISTER AS ADVISOR
          </a>
          <a
            href="#splits"
            className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs uppercase tracking-widest transition-all"
          >
            COMMISSION SPLIT SCHEDULE
          </a>
        </div>
      </PageHeader>

      {/* 2. Co-Brokerage Value Props */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Professional Co-Op Model
          </span>
          <h2 className="mt-2 font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            WHY M&A BROKERS CO-BROKE WITH <span className="text-emerald-500">RESALEHUB</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-medium">
            We supply the buyer flow, certified P&L packaging, and franchisor brand relationships so you close more deals with higher predictability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-6">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-2">
              Guaranteed 50/50 Splits
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you bring a pre-qualified buyer to an active ResaleHub listing, or refer a franchise seller into our studio, your 50% commission is legally protected in escrow.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-2">
              Protected Buyer Non-Circumvent
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Register your prospective buyers with 12-month client exclusivity across all inventory in our network.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-2">
              Turnkey Virtual Data Rooms
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stop chasing tax returns and lease amendments. Our analyst team creates institutional VDR dossiers ready for immediate SBA lender underwriting.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Commission Split Comparison Schedule */}
      <section id="splits" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              Clear & Transparent Compensation
            </span>
            <h2 className="mt-2 font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
              COMMISSION SPLIT <span className="text-emerald-500">STRUCTURE</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <thead>
                <tr className="bg-slate-950 text-white text-xs font-black uppercase tracking-wider">
                  <th className="py-4 px-6">Transaction Enterprise Value</th>
                  <th className="py-4 px-6">Total Success Fee</th>
                  <th className="py-4 px-6 text-emerald-400">Your Co-Op Commission (50%)</th>
                  <th className="py-4 px-6">Escrow Settlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700 bg-white">
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">$500,000 – $1,000,000</td>
                  <td className="py-4 px-6">10.0% ($50k – $100k)</td>
                  <td className="py-4 px-6 font-black text-emerald-600">$25,000 – $50,000</td>
                  <td className="py-4 px-6">Direct Wire at Closing</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">$1,000,000 – $2,500,000</td>
                  <td className="py-4 px-6">8.0% ($80k – $200k)</td>
                  <td className="py-4 px-6 font-black text-emerald-600">$40,000 – $100,000</td>
                  <td className="py-4 px-6">Direct Wire at Closing</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">$2,500,000+ (Multi-Unit)</td>
                  <td className="py-4 px-6">6.0% – 7.0%</td>
                  <td className="py-4 px-6 font-black text-emerald-600">$75,000 – $250,000+</td>
                  <td className="py-4 px-6">Direct Wire at Closing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Advisor Registration Form */}
      <section id="register" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              Co-Op Partner Network
            </span>
            <h3 className="font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight mt-1">
              JOIN AS CERTIFIED <span className="text-emerald-500">ADVISOR</span>
            </h3>
            <p className="text-xs text-slate-600 mt-2 font-medium">
              Gain access to co-brokerage inventory and submit buyer registrations.
            </p>
          </div>

          {registered ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-black text-xl text-slate-900 uppercase">
                Advisor Application Approved
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Welcome to the network! Check your email for your Co-Op Broker Agreement and immediate access to confidential off-market inventory.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Advisor Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robert Vance, CBI"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Brokerage Firm / Agency
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alliance Business Brokers"
                    value={formData.firm}
                    onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Business Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="robert@alliancebrokers.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Years in M&A / Brokerage
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="1 - 3 Years">1 – 3 Years</option>
                    <option value="3 - 5 Years">3 – 5 Years</option>
                    <option value="5 - 10 Years">5 – 10 Years</option>
                    <option value="10+ Years">10+ Years (Senior)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Primary Franchise Sector
                  </label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Food & QSR">Quick Service & Casual Dining</option>
                    <option value="Fitness & Wellness">Boutique Fitness & Personal Care</option>
                    <option value="Automotive">Automotive & Fleet Services</option>
                    <option value="Home Services">Commercial & Home Services</option>
                    <option value="Multi-Unit Portfolios">Large Multi-Unit Portfolios</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-slate-950 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest transition-all duration-200 shadow-xl flex items-center justify-center gap-2"
              >
                <span>REGISTER AS ADVISOR PARTNER</span>
                <Send className="w-4 h-4 text-emerald-400" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

