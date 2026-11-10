'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { PageHeader } from '@/components/common/PageHeader';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Building,
  Check,
  ChevronRight,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface TransferCandidate {
  id: string;
  candidateName: string;
  company: string;
  storeUnit: string;
  brand: string;
  region: string;
  liquidCapital: number;
  netWorth: number;
  stage: number; // 1 to 6
  status: 'In Review' | 'Approved' | 'Action Needed';
}

const INITIAL_CANDIDATES: TransferCandidate[] = [
  {
    id: 'tx-101',
    candidateName: 'David Reynolds',
    company: 'Apex Capital Partners LLC',
    storeUnit: 'Westminster Flagship #14022',
    brand: "Jersey Mike's Subs",
    region: 'Denver Metro, CO',
    liquidCapital: 750000,
    netWorth: 2500000,
    stage: 3,
    status: 'In Review',
  },
  {
    id: 'tx-102',
    candidateName: 'Dr. Kimberly Vance',
    company: 'Lonestar Wellness Holdings',
    storeUnit: 'Tech Ridge Center #218',
    brand: 'Anytime Fitness',
    region: 'Austin Metro, TX',
    liquidCapital: 340000,
    netWorth: 1800000,
    stage: 4,
    status: 'Approved',
  },
  {
    id: 'tx-103',
    candidateName: 'Marcus Bradley',
    company: 'Suncoast Care Ventures',
    storeUnit: 'Tampa Bay Central #401',
    brand: 'JAN-PRO Commercial Cleaning',
    region: 'Tampa Bay Area, FL',
    liquidCapital: 195000,
    netWorth: 620000,
    stage: 2,
    status: 'Action Needed',
  },
];

const STAGES = [
  '1. Background & Liquidity',
  '2. Brand Discovery Interview',
  '3. Committee Approval',
  '4. Agreement & Lease',
  '5. Operator Certification',
  '6. Escrow Closing',
];

export default function FranchisorDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [candidates, setCandidates] = useState<TransferCandidate[]>(INITIAL_CANDIDATES);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAdvanceStage = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStage = Math.min(c.stage + 1, 6);
          const isDone = nextStage === 6;
          setNotification(
            `Candidate ${c.candidateName} advanced to Stage ${nextStage}: ${STAGES[nextStage - 1]}`
          );
          setTimeout(() => setNotification(null), 4000);
          return {
            ...c,
            stage: nextStage,
            status: isDone ? 'Approved' : 'In Review',
          };
        }
        return c;
      })
    );
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header */}
      <PageHeader
        badge="Franchisor Corporate Desk"
        title="TRANSFER APPROVAL"
        highlightWord="PIPELINE"
        subtitle="Manage brand compliance, audit incoming buyer capital, and execute corporate transfer authorizations across all active resale locations."
        bgImageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Notification Toast */}
      {notification && (
        <div className="sticky top-24 z-50 max-w-lg mx-auto my-4 p-4 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs shadow-2xl flex items-center justify-between animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="ml-2 font-black">
            ✕
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Metric Cards Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Active Store Transfers
              </span>
              <p className="font-black text-3xl text-slate-900 mt-1">3 Resales</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">100% on schedule</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Annual Royalty Protected
              </span>
              <p className="font-black text-3xl text-emerald-600 mt-1">$312,500</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Recurring system revenues</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Average Buyer Liquidity
              </span>
              <p className="font-black text-3xl text-slate-900 mt-1">$428,000</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">2.8x minimum brand floor</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Escrow Transfer Fees
              </span>
              <p className="font-black text-3xl text-slate-900 mt-1">$37,500</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Reimbursed to franchisor</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Transfer Pipeline Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                Live Brand Governance
              </span>
              <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
                INCOMING BUYER CANDIDATE QUEUE
              </h3>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-slate-950 text-emerald-400 font-black text-xs uppercase tracking-wider">
              3 Candidates Under Review
            </span>
          </div>

          {/* Candidates Pipeline Cards */}
          <div className="space-y-6">
            {candidates.map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/50 transition-all space-y-5"
              >
                {/* Top Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white">
                        {c.brand}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Unit: {c.storeUnit} ({c.region})
                      </span>
                    </div>
                    <h4 className="font-black text-lg text-slate-900 uppercase">
                      {c.candidateName} —{' '}
                      <span className="text-slate-500 font-bold">{c.company}</span>
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase text-slate-400 block">
                        Verified Liquidity
                      </span>
                      <span className="font-black text-emerald-600 text-sm">
                        {formatCurrency(c.liquidCapital)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase text-slate-400 block">
                        Audited Net Worth
                      </span>
                      <span className="font-black text-slate-900 text-sm">
                        {formatCurrency(c.netWorth)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 6-Stage Progress Indicator */}
                <div className="pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[10px] font-bold">
                    {STAGES.map((st, idx) => {
                      const isComplete = c.stage > idx + 1;
                      const isCurrent = c.stage === idx + 1;
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl text-center border transition-all ${
                            isComplete
                              ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-black'
                              : isCurrent
                              ? 'bg-slate-950 text-emerald-400 border-slate-950 font-black shadow-md'
                              : 'bg-white text-slate-400 border-slate-200'
                          }`}
                        >
                          <span className="block truncate">{st}</span>
                          {isComplete && <span className="text-[9px] uppercase">✓ Done</span>}
                          {isCurrent && <span className="text-[9px] uppercase">● Active</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Current Stage: {STAGES[c.stage - 1]}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleAdvanceStage(c.id)}
                      disabled={c.stage >= 6}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-md flex items-center gap-1.5"
                    >
                      <span>
                        {c.stage >= 6 ? 'Transfer Completed' : 'Advance to Next Stage'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

