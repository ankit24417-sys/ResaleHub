'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Lock,
  Award,
  Send,
  CheckCircle2,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Buyer Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Hero Header */}
      <PageHeader
        badge="Direct Executive Communications"
        title="CONNECT WITH OUR"
        highlightWord="M&A TEAM"
        subtitle="Speak directly with licensed franchise intermediaries, certified business appraisers, and franchisor transfer directors in complete confidence."
        bgImageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Security & Compliance Badges Strip */}
        <div className="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center gap-3">
            <Lock className="w-5 h-5 text-emerald-500" />
            <div className="text-left">
              <p className="text-xs font-black uppercase text-slate-900 tracking-wider">256-Bit Encrypted VDR</p>
              <p className="text-[10px] text-slate-500 font-medium">Bank-grade digital data rooms</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <div className="text-left">
              <p className="text-xs font-black uppercase text-slate-900 tracking-wider">SOC-2 Type II Certified</p>
              <p className="text-[10px] text-slate-500 font-medium">Audited information security controls</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center gap-3">
            <Award className="w-5 h-5 text-emerald-500" />
            <div className="text-left">
              <p className="text-xs font-black uppercase text-slate-900 tracking-wider">IBBA & M&A Source Member</p>
              <p className="text-[10px] text-slate-500 font-medium">Certified business intermediary standards</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details & Regional Offices */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                Direct Inquiries
              </span>
              <h2 className="font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight mt-1">
                EXECUTIVE <span className="text-emerald-500">HEADQUARTERS</span>
              </h2>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed font-normal">
                Our national brokerage desk is available Monday through Friday from 8:00 AM to 7:00 PM EST. All client communications are strictly confidential.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Direct Phone Desk</h4>
                  <p className="text-sm font-black text-emerald-600 mt-0.5">+1 (800) 840-7372</p>
                  <p className="text-[11px] text-slate-500">Direct M&A Advisory Toll-Free</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Advisory Inbox</h4>
                  <p className="text-sm font-black text-slate-900 mt-0.5">advisory@resalehub.com</p>
                  <p className="text-[11px] text-slate-500">Underwritten response within 2 hours</p>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="pt-4 border-t border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">
                Regional M&A Hubs
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                  <p className="font-black text-slate-900 uppercase">New York City</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">100 Wall St, 24th Floor</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                  <p className="font-black text-slate-900 uppercase">Denver Metro</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">1144 15th St, Suite 1900</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                  <p className="font-black text-slate-900 uppercase">Austin Corridor</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">500 W 2nd St, Suite 800</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                  <p className="font-black text-slate-900 uppercase">Dallas / Fort Worth</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">2000 McKinney Ave</p>
                </div>
              </div>
            </div>

          </div>

          {/* Submission Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
                  Inquiry Dispatched
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. A Senior Franchise M&A Advisor has been assigned to your message and will respond within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
                    CONFIDENTIAL <span className="text-emerald-500">INQUIRY FORM</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    All correspondence is safeguarded by strict attorney-client style confidentiality.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Chang"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="michael@capital.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                      Direct Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="Buyer Inquiry">Buyer: Request Deal Room Access</option>
                      <option value="Confidential Seller Valuation">Seller: Request Confidential Valuation</option>
                      <option value="Franchisor Partnership">Franchisor: Corporate Transfer Portal</option>
                      <option value="Co-Brokerage Split">Broker: Co-Op Representation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Confidential Notes or Target Locations
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details regarding your target brands, capital availability, or franchise locations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-slate-950 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest transition-all duration-200 shadow-xl flex items-center justify-center gap-2"
                >
                  <span>SUBMIT CONFIDENTIAL INQUIRY</span>
                  <Send className="w-4 h-4 text-emerald-400" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

