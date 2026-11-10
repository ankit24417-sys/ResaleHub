'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { PageHeader } from '@/components/common/PageHeader';
import {
  FileCheck,
  Check,
  X,
  Clock,
  ArrowRight,
  DollarSign,
  Building,
  User,
  ShieldCheck,
  PlusCircle,
  AlertCircle,
} from 'lucide-react';

interface OfferItem {
  _id: string;
  id?: string;
  buyerName: string;
  buyerEmail: string;
  company: string;
  listingTitle: string;
  offerAmount: number;
  cashDownPayment: number;
  financingType: string;
  closingTimelineDays: number;
  contingencies: string[];
  status: 'submitted' | 'under_review' | 'accepted' | 'countered' | 'rejected';
  notes: string;
  createdAt: string;
}

const INITIAL_OFFERS: OfferItem[] = [
  {
    _id: 'offer-1',
    buyerName: 'David Reynolds',
    buyerEmail: 'buyer@resalehub.com',
    company: 'Apex Capital Partners LLC',
    listingTitle: 'High-Volume QSR Franchise - North Denver Metro',
    offerAmount: 1400000,
    cashDownPayment: 420000, // 30%
    financingType: 'SBA 7(a) Loan',
    closingTimelineDays: 60,
    contingencies: [
      'Franchisor Transfer & Brand Approval',
      'Commercial Lease Assignment Consent',
      'Final 30-Day Financial & Tax Audit',
    ],
    status: 'submitted',
    notes: 'Pre-approved with Live Oak Bank for 70% SBA 7(a). Ready to close within 60 days.',
    createdAt: new Date().toISOString(),
  },
];

export default function SellerOffersPage() {
  const { user, token } = useAuth();
  const [offers, setOffers] = useState<OfferItem[]>(INITIAL_OFFERS);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/offers/listing/663f10111111111111111101', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        if (data.offers && data.offers.length > 0) {
          setOffers(data.offers);
        }
      }
    } catch {
      // Keep initial offers
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [token]);

  const handleUpdateStatus = async (id: string, newStatus: 'accepted' | 'rejected') => {
    try {
      await fetch(`/api/offers/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // fallback
    }

    setOffers((prev) =>
      prev.map((o) => (o._id === id || o.id === id ? { ...o, status: newStatus } : o))
    );
    setNotification(`Offer has been marked as ${newStatus.toUpperCase()}.`);
    setTimeout(() => setNotification(null), 4000);
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
      <PageHeader
        badge="Seller Review Console"
        title="PURCHASE OFFERS &"
        highlightWord="LOI PIPELINE"
        subtitle="Evaluate purchase offers, down payment structures, and financing contingencies submitted by verified buyers who executed NDAs."
        bgImageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
      >
        <div className="flex gap-4">
          <Link
            href="/seller/create"
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md"
          >
            Create New Resale Listing
          </Link>
        </div>
      </PageHeader>

      {/* Notification Toast */}
      {notification && (
        <div className="sticky top-24 z-50 max-w-lg mx-auto my-4 p-4 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs shadow-2xl flex items-center justify-between animate-in fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="ml-2 font-black">✕</button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-8">
          <div>
            <h2 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
              INCOMING PURCHASE OFFERS (LOIs)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review legally binding purchase offers submitted through the Virtual Data Room.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase border border-emerald-200">
            {offers.length} Active Offers
          </span>
        </div>

        {offers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
            <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-black text-base text-slate-900 uppercase">No Offers Received Yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              Prospective buyers will submit binding LOIs once they review your Data Room.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {offers.map((offer) => (
              <div
                key={offer._id || offer.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-emerald-400">
                      LOI #{offer._id.slice(-6).toUpperCase()}
                    </span>
                    <h3 className="font-black text-lg text-slate-900 uppercase mt-1">
                      {offer.listingTitle}
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider self-start sm:self-auto ${
                      offer.status === 'accepted'
                        ? 'bg-emerald-500 text-slate-950'
                        : offer.status === 'rejected'
                        ? 'bg-rose-500 text-white'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Status: {offer.status}
                  </span>
                </div>

                {/* Offer Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Offer Amount</span>
                    <p className="font-black text-2xl text-slate-900 mt-0.5">
                      {formatCurrency(offer.offerAmount)}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Cash Down Payment</span>
                    <p className="font-black text-2xl text-emerald-600 mt-0.5">
                      {formatCurrency(offer.cashDownPayment)}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Financing</span>
                    <p className="font-black text-sm text-slate-800 mt-1">
                      {offer.financingType}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Closing Timeline</span>
                    <p className="font-black text-sm text-slate-800 mt-1">
                      {offer.closingTimelineDays} Days
                    </p>
                  </div>
                </div>

                {/* Buyer Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Prospective Buyer</span>
                    <p className="font-bold text-slate-900 mt-0.5">{offer.buyerName} ({offer.company})</p>
                    <p className="text-[11px] text-slate-500">{offer.buyerEmail}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Offer Notes</span>
                    <p className="text-slate-700 mt-0.5 italic">{offer.notes || 'No special transition requests.'}</p>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Contingencies: Franchisor Approval, Lease Assignment, CPA Audit
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={offer.status === 'rejected'}
                      onClick={() => handleUpdateStatus(offer._id || offer.id!, 'rejected')}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      Reject Offer
                    </button>
                    <button
                      type="button"
                      disabled={offer.status === 'accepted'}
                      onClick={() => handleUpdateStatus(offer._id || offer.id!, 'accepted')}
                      className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Accept LOI</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

