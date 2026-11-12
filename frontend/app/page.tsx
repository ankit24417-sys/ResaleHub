'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { HeroBanner } from '@/components/marketplace/HeroBanner';
import { SearchFilters } from '@/components/marketplace/SearchFilters';
import { ListingTeaserCard, ListingTeaser } from '@/components/marketplace/ListingTeaserCard';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  FileCheck,
  Building,
  TrendingUp,
  Layers,
  CheckCircle2,
  Users,
} from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, token } = useAuth();
  const [listings, setListings] = useState<ListingTeaser[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    brand: 'All Brands',
    state: 'All States',
    priceRange: 'All Prices',
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const params = new URLSearchParams();
        if (filters.brand !== 'All Brands') {
          params.set('brand', filters.brand);
        }

        const qs = params.toString();
        const url = qs ? `/api/listings?${qs}` : '/api/listings';

        const res = await fetch(url, { headers });
        if (!res.ok) {
          throw new Error('Failed to fetch listings from database.');
        }
        const data = await res.json();
        setListings(Array.isArray(data.listings) ? data.listings : []);
      } catch (err: any) {
        console.error('Error fetching listings from database:', err);
        setFetchError(err.message || 'Unable to load listings from MongoDB.');
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [token, isAuthenticated, filters.brand]);

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (filters.category !== 'All Categories' && item.category !== filters.category) {
        return false;
      }
      if (filters.state !== 'All States' && item.state !== filters.state) {
        return false;
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matches =
          item.publicTitle.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q) ||
          item.teaserSummary.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (filters.priceRange !== 'All Prices') {
        const price = item.askingPrice || 0;
        if (filters.priceRange === 'under-1m' && price >= 1000000) return false;
        if (filters.priceRange === '1m-1.5m' && (price < 1000000 || price > 1500000)) return false;
        if (filters.priceRange === 'over-1.5m' && price <= 1500000) return false;
      }
      return true;
    });
  }, [listings, filters]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All Categories',
      brand: 'All Brands',
      state: 'All States',
      priceRange: 'All Prices',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Floating Search Container */}
      <SearchFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        totalCount={filteredListings.length}
      />

      {/* 3. Listings Grid Section */}
      <section id="listings-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-xs uppercase tracking-widest mb-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Gated Marketplace</span>
            </div>
            <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 uppercase tracking-tight">
              CURRENT BLIND <span className="text-emerald-500">RESALE LISTINGS</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium">
              Blind teasers maintain brand and staff confidentiality until a digital NDA is completed.
            </p>
          </div>

          {!isAuthenticated && (
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-colors shadow-sm"
              >
                <Lock className="w-3 h-3 text-emerald-400" />
                Login to Unlock Financials
              </Link>
            </div>
          )}
        </div>

        {/* Listings Grid Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-slate-200" />
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                  <div className="h-12 bg-slate-100 rounded" />
                  <div className="h-16 bg-slate-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : fetchError ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-rose-200 shadow-sm p-8">
            <Building className="w-12 h-12 text-rose-300 mx-auto mb-4" />
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight">
              Database Connection Unavailable
            </h3>
            <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
              {fetchError}
            </p>
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <ListingTeaserCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight">
              No matching franchise resales found
            </h3>
            <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your category or state filters, or search for different criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-6 py-2.5 rounded-full bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>

      {/* 4. The 3-Tier Confidentiality Protocol */}
      <section className="bg-slate-950 py-24 text-white border-y border-slate-900 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              Transaction Integrity Architecture
            </span>
            <h2 className="mt-2 font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight">
              HOW RESALEHUB GUARDS <span className="text-emerald-500">CONFIDENTIALITY</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 font-medium">
              We eliminate the catastrophic risks of leaked listings. Your employees, customers, and competitors never learn you are selling until closing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-lg mb-6 border border-emerald-500/20">
                01
              </div>
              <h3 className="font-black text-lg text-white uppercase tracking-tight mb-2">
                Blind Teaser Screening
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Listings are stripped of brand marks, store numbers, and exact street coordinates. Public guests see only regional submarkets and financial ranges.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero unsolicited staff inquiries</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-lg mb-6 border border-emerald-500/20">
                02
              </div>
              <h3 className="font-black text-lg text-white uppercase tracking-tight mb-2">
                Digital NDA Execution
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Prospective buyers must register verified corporate identities, declare liquid capital, and execute a legally binding digital Non-Disclosure Agreement.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Time-stamped audit logs & IP binding</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-lg mb-6 border border-emerald-500/20">
                03
              </div>
              <h3 className="font-black text-lg text-white uppercase tracking-tight mb-2">
                Virtual Data Room & Approvals
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Access audited 3-year P&Ls, lease contracts, and franchisor approval checklists. Franchisor representatives review buyer qualification directly.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Smooth 6-stage franchisor signoff</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Stakeholder Matrix */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Dedicated Stakeholder Portals
          </span>
          <h2 className="mt-2 font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
            BUILT FOR THE ENTIRE <span className="text-emerald-500">M&A ECOSYSTEM</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Buyers Card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
                For Buyers
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Skip ground-up delays. Acquire verified, profitable franchise operations with existing cash flow, trained staff, and approved territories.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Audited 3-year financial statements
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  SBA 7(a) financing pre-approval packages
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Direct franchisor transfer guidance
                </li>
              </ul>
            </div>
            <Link
              href="/buyers"
              className="mt-8 inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-900 font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Explore Buyer Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sellers Card */}
          <div className="bg-white rounded-2xl p-8 border-2 border-emerald-500/20 shadow-2xl flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-md">
              High Demand
            </span>
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-6 shadow-md">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
                For Sellers
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Exit your franchise at maximum institutional multiple without alerting your staff, vendors, or competitors.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Multi-step confidential Listing Studio
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Strict 100% blind teaser privacy
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Average 60-90 day closing timeline
                </li>
              </ul>
            </div>
            <Link
              href="/sellers"
              className="mt-8 inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-950 text-white hover:bg-emerald-600 font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <span>Seller Solutions & Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Franchisors Card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
                For Franchisors
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Maintain brand integrity during ownership transfers. Audit buyer backgrounds and manage multi-stage corporate transfer approvals in one portal.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Enforce brand liquidity & net worth floors
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Automated candidate discovery interviews
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Prevent unauthorized store closures
                </li>
              </ul>
            </div>
            <Link
              href="/franchisors"
              className="mt-8 inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-900 font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Franchisor Enterprise Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Bottom Institutional CTA Strip */}
      <section className="bg-slate-950 py-16 text-center border-t border-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-black text-2xl sm:text-4xl uppercase tracking-tight">
            READY TO ACQUIRE OR EXIT A <span className="text-emerald-500">FRANCHISE?</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 font-medium">
            Join over 1,200 verified buyers and franchise owners conducting confidential transactions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all"
            >
              Create Confidential Account
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs uppercase tracking-widest transition-all"
            >
              Speak with Senior Advisor
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

