'use client';

import React from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  Building2,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface ListingTeaser {
  _id: string;
  publicTitle: string;
  category: string;
  brand?: string;
  region: string;
  state: string;
  askingPrice: number | null;
  cashFlow: number | null;
  grossRevenue?: number | null;
  inventory?: number;
  establishedYear: number;
  employeeCount: number;
  teaserSummary: string;
  imageUrl: string;
  highlights: string[];
  isGated?: boolean;
}

interface ListingTeaserCardProps {
  listing: ListingTeaser;
}

export const ListingTeaserCard = ({ listing }: ListingTeaserCardProps) => {
  const { isAuthenticated } = useAuth();
  
  // The card is gated if either the API response flagged isGated or the user is not authenticated
  const isGated = listing.isGated || !isAuthenticated;

  const formatCurrency = (val: number | null | undefined) => {
    if (val === null || val === undefined) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      
      {/* Visual Header with Overlay & Blind Category Badge */}
      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-50"
          style={{ backgroundImage: `url('${listing.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/90 text-white backdrop-blur-md shadow-sm">
            <Building2 className="w-3 h-3" />
            {listing.category}
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
            <MapPin className="w-3 h-3 text-emerald-400" />
            {listing.region}
          </span>
        </div>

        {/* Confidential Blind Tag */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest bg-slate-800/90 text-slate-300 border border-slate-700">
            BLIND TEASER #{(listing._id || '101').slice(-4).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Title */}
          <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {listing.publicTitle}
          </h3>

          {/* Quick Metrics Line */}
          <div className="mt-2 flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Est. {listing.establishedYear}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {listing.employeeCount} Staff
            </span>
          </div>

          {/* Executive Summary */}
          <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
            {listing.teaserSummary}
          </p>

          {/* Highlights Checklist */}
          {listing.highlights && listing.highlights.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
              {listing.highlights.slice(0, 2).map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="truncate">{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Financial Metrics Section: Gated vs Unlocked */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          {isGated ? (
            /* Gated Guest Overlay */
            <div className="relative rounded-xl overflow-hidden bg-slate-900 p-4 border border-slate-800 text-center shadow-inner">
              {/* Blurred Dummy Figures Behind Backdrop Filter */}
              <div className="filter blur-sm select-none opacity-20 pointer-events-none flex justify-around">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Asking Price</p>
                  <p className="font-bold text-lg text-white">$1,450,000</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Cash Flow</p>
                  <p className="font-bold text-lg text-emerald-400">$385,000</p>
                </div>
              </div>

              {/* Lock Action Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-slate-950/75 backdrop-blur-[4px]">
                <div className="flex items-center gap-1.5 text-slate-300 text-xs font-black uppercase tracking-wider mb-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Financials Gated</span>
                </div>
                <Link
                  href={`/login?redirect=/listings/${listing._id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-[11px] uppercase tracking-widest shadow-md transition-all hover:scale-105"
                >
                  <Unlock className="w-3 h-3 stroke-[2.5]" />
                  Login to Unlock
                </Link>
              </div>
            </div>
          ) : (
            /* Authenticated Financial Display */
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    Asking Price
                  </span>
                  <span className="font-black text-base text-slate-900 tracking-tight">
                    {formatCurrency(listing.askingPrice)}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    Cash Flow (SDE)
                  </span>
                  <span className="font-black text-base text-emerald-600 tracking-tight">
                    {formatCurrency(listing.cashFlow)}
                  </span>
                </div>
              </div>

              <Link
                href={`/listings/${listing._id}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-widest transition-all duration-200 shadow-md group-hover:bg-slate-950"
              >
                <span>ENTER DEAL ROOM & NDA</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

