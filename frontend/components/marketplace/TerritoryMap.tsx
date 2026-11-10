'use client';

import React from 'react';
import { MapPin, Shield, Layers, Navigation } from 'lucide-react';

interface TerritoryMapProps {
  region: string;
  brandName?: string;
  coordinates?: number[][][];
}

export const TerritoryMap = ({
  region,
  brandName = 'Confidential Franchise',
  coordinates,
}: TerritoryMapProps) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
            Exclusive Franchise Territory
          </span>
          <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
            GEOJSON SPATIAL BOUNDARY
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Shield className="w-3 h-3" />
            Exclusive Protected Rights
          </span>
        </div>
      </div>

      {/* Styled Interactive Spatial Territory Map Container */}
      <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col justify-between p-6">
        {/* Subtle Map Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3341551a_1px,transparent_1px),linear-gradient(to_bottom,#3341551a_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

        {/* Territory Overlay Shape */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 240"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="territoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {/* Spatial polygon simulating GeoJSON 2dsphere territory boundary */}
          <polygon
            points="60,40 340,30 360,190 120,210 50,150"
            fill="url(#territoryGrad)"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="6,4"
          />
          {/* Store Pin Location */}
          <circle cx="200" cy="120" r="8" fill="#10b981" />
          <circle cx="200" cy="120" r="16" fill="#10b981" fillOpacity="0.3" className="animate-ping" />
        </svg>

        {/* Top Info Overlay */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
              Market Corridor
            </span>
            <p className="font-bold text-white flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {region}
            </p>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-right text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
              Boundary Type
            </span>
            <p className="font-bold text-emerald-400 flex items-center gap-1 justify-end mt-0.5">
              <Layers className="w-3.5 h-3.5" />
              GeoJSON 2dsphere
            </p>
          </div>
        </div>

        {/* Center Target Indicator */}
        <div className="relative z-10 text-center pointer-events-none">
          <div className="inline-block bg-slate-950/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-500/40 shadow-lg text-[11px] font-bold text-slate-200">
            Store Location & 5-Mile Non-Compete Buffer
          </div>
        </div>

        {/* Bottom Coordinates Strip */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/80 gap-2">
          <span>Lat: 39.7392° N, Long: 104.9903° W</span>
          <span className="text-emerald-400 font-bold">100% Exclusivity Guaranteed by Franchisor</span>
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed font-normal">
        The franchisor covenants that no other franchise unit, corporate outlet, or ghost kitchen delivery hub will be licensed within this demarcated boundary for the duration of the 10-year franchise term.
      </p>
    </div>
  );
};

