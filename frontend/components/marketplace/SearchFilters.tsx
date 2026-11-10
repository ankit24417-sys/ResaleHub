'use client';

import React from 'react';
import { Search, Filter, RotateCcw, Building2, MapPin, DollarSign, Award } from 'lucide-react';

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  state: string;
  priceRange: string;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalCount: number;
}

const CATEGORIES = [
  'All Categories',
  'Food & Beverage',
  'Fitness & Wellness',
  'Automotive Services',
  'Commercial & Home Services',
  'Health & Medical',
];

const BRANDS = [
  'All Brands',
  "Jersey Mike's",
  'Anytime Fitness',
  'AAMCO',
  'JAN-PRO',
  'Visiting Angels',
];

const STATES = [
  'All States',
  'AZ',
  'CO',
  'FL',
  'NC',
  'TX',
  'CA',
  'NY',
  'GA',
  'IL',
];

export const SearchFilters = ({
  filters,
  onFilterChange,
  onReset,
  totalCount,
}: SearchFiltersProps) => {
  const handleChange = (field: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category !== 'All Categories' ||
    filters.brand !== 'All Brands' ||
    filters.state !== 'All States' ||
    filters.priceRange !== 'All Prices';

  return (
    <div className="-mt-10 md:-mt-14 relative z-20 mx-auto max-w-6xl px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 md:p-6 transition-all">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                FILTER CONFIDENTIAL RESALES
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Showing {totalCount} vetted blind opportunities
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500 hover:text-rose-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Filter Input Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Keyword Search */}
          <div className="relative">
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
              Keyword Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. QSR, Gym, Denver..."
                value={filters.search}
                onChange={(e) => handleChange('search', e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
              Sector / Category
            </label>
            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer appearance-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* Franchise Brand Dropdown (FR-BUY-03) */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
              Franchise Brand
            </label>
            <div className="relative">
              <select
                value={filters.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer appearance-none"
              >
                {BRANDS.map((br) => (
                  <option key={br} value={br}>
                    {br}
                  </option>
                ))}
              </select>
              <Award className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* State / Region Dropdown */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
              Target State
            </label>
            <div className="relative">
              <select
                value={filters.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer appearance-none"
              >
                {STATES.map((st) => (
                  <option key={st} value={st}>
                    {st === 'All States' ? 'All States (US)' : `State: ${st}`}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
              Asking Price Tier
            </label>
            <div className="relative">
              <select
                value={filters.priceRange}
                onChange={(e) => handleChange('priceRange', e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer appearance-none"
              >
                <option value="All Prices">All Price Tiers</option>
                <option value="under-1m">Under $1,000,000</option>
                <option value="1m-1.5m">$1,000,000 - $1,500,000</option>
                <option value="over-1.5m">$1,500,000+</option>
              </select>
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                ▼
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

