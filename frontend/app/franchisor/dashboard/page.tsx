'use client';

import React, { useState, useEffect } from 'react';
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
  FileCheck,
  Sparkles,
} from 'lucide-react';

interface TransferCandidate {
  _id: string;
  id?: string;
  candidateName: string;
  company: string;
  storeUnit: string;
  brand: string;
  region: string;
  liquidCapital: number;
  netWorth: number;
  creditScore: string;
  backgroundCheckStatus: 'Clear' | 'In Review' | 'Flagged';
  fddAcknowledgedDate: string;
  stage: number; // 1 to 4 (PRD 4-Step State Machine)
  status: 'In Review' | 'Approved' | 'Action Needed';
}

// Exact PRD FR-FRA-02 Four-Step Sequential State Machine
const STAGES = [
  '1. Initial Screening',
  '2. FDD Receipt Acknowledgement',
  '3. Corporate Interview',
  '4. Final Franchise Agreement Sign-off',
];

export default function FranchisorDashboardPage() {
  const { token } = useAuth();
  const [candidates, setCandidates] = useState<TransferCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransfers = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/transfers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to load transfer pipeline from database.');
        }
        const data = await res.json();
        setCandidates(Array.isArray(data.transfers) ? data.transfers : []);
      } catch (err: any) {
        setError(err.message || 'Unable to fetch franchisor transfer records.');
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, [token]);

  const handleAdvanceStage = async (id: string) => {
    try {
      const res = await fetch(`/api/transfers/${id}/advance`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to advance candidate stage.');
      }

      const data = await res.json();
      const updated = data.transfer;

      setCandidates((prev) =>
        prev.map((c) => ((c._id || c.id) === id ? updated : c))
      );
      setNotification(
        `Candidate ${updated.candidateName} advanced to Stage ${updated.stage}: ${STAGES[updated.stage - 1]}`
      );
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      setNotification(err.message || 'Error updating candidate stage.');
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const avgLiquidity =
    candidates.length > 0
      ? Math.round(
          candidates.reduce((sum, c) => sum + (c.liquidCapital || 0), 0) /
            candidates.length
        )
      : 0;

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
        badge="Franchisor Corporate Desk (FR-FRA-01 / 02)"
        title="CORPORATE TRANSFER"
        highlightWord="PIPELINE"
        subtitle="Manage brand compliance, audit incoming buyer capital, and execute sequential 4-stage transfer approvals across your franchise system."
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
              <p className="font-black text-3xl text-slate-900 mt-1">{candidates.length} Candidates</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">Brand transfer queue</p>
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
              <p className="font-black text-3xl text-slate-900 mt-1">{formatCurrency(avgLiquidity)}</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">&gt; 30% Asking Price Rule</p>
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
              <p className="text-[11px] text-slate-500 mt-0.5">Guaranteed closing escrow</p>
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
                PRD 4-Step Sequential State Machine
              </span>
              <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
                TRANSFER MILESTONE APPROVAL QUEUE
              </h3>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-slate-950 text-emerald-400 font-black text-xs uppercase tracking-wider">
              {candidates.length} Candidates Under Review
            </span>
          </div>

          {/* Candidates Pipeline Cards */}
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
              <p className="font-black text-xs uppercase tracking-widest text-slate-500">
                Loading Franchisor Pipeline from Database...
              </p>
            </div>
          ) : error ? (
            <div className="py-12 text-center bg-rose-50 rounded-2xl border border-rose-200 p-6">
              <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-2" />
              <p className="font-black text-sm text-slate-900 uppercase">Unable to Load Pipeline</p>
              <p className="text-xs text-slate-600 mt-1">{error}</p>
            </div>
          ) : candidates.length === 0 ? (
            <div className="py-12 text-center bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-black text-sm text-slate-900 uppercase">No Active Transfer Applications</p>
            </div>
          ) : (
            <div className="space-y-6">
              {candidates.map((c) => {
                const candidateId = c._id || c.id || '';
                return (
              <div
                key={candidateId}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/50 transition-all space-y-5"
              >
                {/* Top Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white">
                        {c.brand}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">
                        Unit: {c.storeUnit} • {c.region}
                      </span>
                    </div>
                    <h4 className="font-black text-lg text-slate-900 uppercase">
                      {c.candidateName} —{' '}
                      <span className="text-slate-500 font-bold">{c.company}</span>
                    </h4>
                  </div>

                  {/* Vetting Profiles (Credit Score, Background, Liquidity, Net Worth) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">
                        Credit Score
                      </span>
                      <span className="font-black text-slate-900 text-xs">
                        {c.creditScore}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">
                        Background Check
                      </span>
                      <span className="font-black text-emerald-600 text-xs flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        {c.backgroundCheckStatus}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">
                        Liquid Capital
                      </span>
                      <span className="font-black text-emerald-600 text-xs">
                        {formatCurrency(c.liquidCapital)}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">
                        Audited Net Worth
                      </span>
                      <span className="font-black text-slate-900 text-xs">
                        {formatCurrency(c.netWorth)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exact 4-Step State Machine Pipeline */}
                <div className="pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[10px] font-bold">
                    {STAGES.map((st, idx) => {
                      const isComplete = c.stage > idx + 1;
                      const isCurrent = c.stage === idx + 1;
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl text-center border transition-all ${
                            isComplete
                              ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-black'
                              : isCurrent
                              ? 'bg-slate-950 text-emerald-400 border-slate-950 font-black shadow-md'
                              : 'bg-white text-slate-400 border-slate-200'
                          }`}
                        >
                          <span className="block truncate">{st}</span>
                          {isComplete && <span className="text-[9px] uppercase">✓ Completed</span>}
                          {isCurrent && <span className="text-[9px] uppercase">● Active Gate</span>}
                          {!isComplete && !isCurrent && <span className="text-[9px] uppercase">○ Pending</span>}
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
                      onClick={() => handleAdvanceStage(candidateId)}
                      disabled={c.stage >= 4 && c.status === 'Approved'}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-md flex items-center gap-1.5"
                    >
                      {c.stage === 3 ? (
                        <>
                          <FileCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Issue Final Brand Transfer Sign-off</span>
                        </>
                      ) : c.stage >= 4 ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Transfer Fully Approved</span>
                        </>
                      ) : (
                        <>
                          <span>Advance to Stage {c.stage + 1}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
