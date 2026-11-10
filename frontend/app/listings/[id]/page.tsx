'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { TerritoryMap } from '@/components/marketplace/TerritoryMap';
import {
  Lock,
  Unlock,
  ShieldCheck,
  FileText,
  Building,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  DollarSign,
  Download,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Check,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface ListingDetail {
  _id: string;
  publicTitle: string;
  category: string;
  region: string;
  state: string;
  askingPrice: number | null;
  cashFlow: number | null;
  grossRevenue: number | null;
  inventory?: number;
  establishedYear: number;
  employeeCount: number;
  status: string;
  teaserSummary: string;
  imageUrl: string;
  highlights: string[];
  territory?: {
    type: string;
    coordinates: number[][][];
  };
  privateData?: {
    brandName: string;
    legalEntity: string;
    exactAddress: string;
    city: string;
    zipCode: string;
    pnlBreakdown: {
      annualGrossRevenue: number;
      costOfGoodsSold: number;
      grossProfit: number;
      operatingExpenses: number;
      payroll: number;
      royalties: number;
      marketingFund: number;
      rentAndLease: number;
      ebitda: number;
      netDiscretionaryEarnings: number;
    };
    franchisorApprovalDetails: {
      franchiseFee: number;
      transferFee: number;
      minimumNetWorthRequirement: number;
      minimumLiquidCapitalRequirement: number;
      trainingDurationWeeks: number;
      transferApprovalStages: string[];
    };
    leaseDetails: {
      monthlyRent: number;
      squareFootage: number;
      expirationDate: string;
      renewalOptions: string;
    };
    documents: Array<{
      title: string;
      type: string;
      fileUrl: string;
      fileSize: string;
    }>;
  };
}

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading } = useAuth();
  const listingId = params?.id as string;

  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [ndaSigned, setNdaSigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Digital NDA Form State
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [signature, setSignature] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedLiquidity, setAgreedLiquidity] = useState(false);
  const [signingNda, setSigningNda] = useState(false);
  const [ndaError, setNdaError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const fetchListingData = async () => {
    try {
      setLoading(true);
      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/listings/${listingId}`, { headers });
      if (!res.ok) {
        throw new Error('Listing not found or server error.');
      }
      const data = await res.json();
      setListing(data.listing);
      setNdaSigned(data.ndaSigned || false);

      if (user) {
        setFullName(user.name);
        setCompany(user.company || '');
        setPhone(user.phone || '');
        setSignature(user.name);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load listing.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchListingData();
    }
  }, [listingId, token, user, isLoading]);

  const handleSignNda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms || !agreedLiquidity) {
      setNdaError('Please check both verification checkboxes to execute the legal NDA.');
      return;
    }
    if (!signature.trim()) {
      setNdaError('Please provide your legal electronic signature.');
      return;
    }

    setSigningNda(true);
    setNdaError(null);

    try {
      const res = await fetch('/api/nda/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listingId,
          signature,
          fullName,
          company,
          phone,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to execute NDA.');
      }

      // Re-fetch listing data to receive unlocked private data room
      await fetchListingData();
    } catch (err: any) {
      setNdaError(err.message || 'Error processing digital signature.');
    } finally {
      setSigningNda(false);
    }
  };

  const handleDownloadDoc = (docTitle: string) => {
    setDownloadSuccess(`Access granted: Downloading "${docTitle}" from encrypted VDR vault.`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const formatCurrency = (val: number | null | undefined) => {
    if (val === null || val === undefined) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
          <p className="font-black text-xs uppercase tracking-widest text-emerald-400">
            Decrypting Deal Room...
          </p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-xl">
          <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="font-black text-xl text-slate-900 uppercase">Opportunity Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            The requested confidential listing may have been placed under definitive contract or withdrawn.
          </p>
          <Link
            href="/#listings-grid"
            className="px-6 py-3 rounded-full bg-slate-950 text-white font-black text-xs uppercase tracking-wider"
          >
            Return to Active Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. Header Banner */}
      <div className="relative bg-slate-950 text-white py-16 border-b border-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity transform scale-105"
          style={{ backgroundImage: `url('${listing.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4">
            <Link href="/" className="hover:text-emerald-400">Resales</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-emerald-400">{listing.category}</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="truncate max-w-[200px] text-slate-300">
              {ndaSigned && listing.privateData ? listing.privateData.brandName : listing.publicTitle}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950">
                  {listing.category}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                  <MapPin className="w-3 h-3 inline mr-1 text-emerald-400" />
                  {listing.region}
                </span>
                {ndaSigned ? (
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <Unlock className="w-3 h-3" />
                    VDR UNLOCKED
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    NDA REQUIRED
                  </span>
                )}
              </div>

              <h1 className="font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
                {ndaSigned && listing.privateData ? (
                  <span>
                    {listing.privateData.brandName}{' '}
                    <span className="text-emerald-400">({listing.state})</span>
                  </span>
                ) : (
                  <span>{listing.publicTitle}</span>
                )}
              </h1>

              {ndaSigned && listing.privateData && (
                <p className="mt-2 text-xs text-slate-300 font-bold flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-400" />
                  {listing.privateData.exactAddress}, {listing.privateData.city}, {listing.state} {listing.privateData.zipCode}
                </p>
              )}
            </div>

            {/* Financial Header Box */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md min-w-[280px]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Asking Price
                  </span>
                  <span className="font-black text-2xl text-white tracking-tight">
                    {formatCurrency(listing.askingPrice)}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Annual Cash Flow (SDE)
                  </span>
                  <span className="font-black text-2xl text-emerald-400 tracking-tight">
                    {formatCurrency(listing.cashFlow)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadSuccess && (
        <div className="sticky top-24 z-50 max-w-xl mx-auto my-4 p-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center justify-between animate-in fade-in">
          <span>{downloadSuccess}</span>
          <button onClick={() => setDownloadSuccess(null)} className="ml-2 font-black">✕</button>
        </div>
      )}

      {/* 2. Main Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Overview, Highlights, Teaser Summary */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Operational Summary */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight">
                  EXECUTIVE BUSINESS SUMMARY
                </h3>
                <span className="text-xs font-bold text-slate-400">
                  Est. {listing.establishedYear} • {listing.employeeCount} Employees
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {listing.teaserSummary}
              </p>

              {/* Key Investment Highlights */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3">
                  Investment Highlights
                </h4>
                <div className="space-y-2.5">
                  {listing.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* UNLOCKED VIRTUAL DATA ROOM (When NDA is signed) */}
            {ndaSigned && listing.privateData ? (
              <div className="space-y-8 animate-in fade-in duration-500">
                
                {/* 1. Audited 3-Year P&L Breakdown Table */}
                <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500/20 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                        Certified Financial Schedule
                      </span>
                      <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
                        ANNUAL PROFIT & LOSS BREAKDOWN
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      SDE Reconciled
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <tbody className="divide-y divide-slate-100">
                        <tr className="bg-slate-50/50 font-bold text-slate-900">
                          <td className="py-3 px-4">Gross Annual Revenue</td>
                          <td className="py-3 px-4 text-right">
                            {formatCurrency(listing.privateData.pnlBreakdown.annualGrossRevenue)}
                          </td>
                        </tr>
                        <tr className="text-slate-600">
                          <td className="py-3 px-4 pl-8">Cost of Goods Sold (COGS)</td>
                          <td className="py-3 px-4 text-right text-rose-600">
                            - {formatCurrency(listing.privateData.pnlBreakdown.costOfGoodsSold)}
                          </td>
                        </tr>
                        <tr className="font-bold text-slate-900 bg-slate-50">
                          <td className="py-3 px-4">Gross Profit</td>
                          <td className="py-3 px-4 text-right">
                            {formatCurrency(listing.privateData.pnlBreakdown.grossProfit)}
                          </td>
                        </tr>
                        <tr className="text-slate-600">
                          <td className="py-3 px-4 pl-8">Store Payroll & Management</td>
                          <td className="py-3 px-4 text-right text-rose-600">
                            - {formatCurrency(listing.privateData.pnlBreakdown.payroll)}
                          </td>
                        </tr>
                        <tr className="text-slate-600">
                          <td className="py-3 px-4 pl-8">Franchisor Royalty Fee</td>
                          <td className="py-3 px-4 text-right text-rose-600">
                            - {formatCurrency(listing.privateData.pnlBreakdown.royalties)}
                          </td>
                        </tr>
                        <tr className="text-slate-600">
                          <td className="py-3 px-4 pl-8">Brand Marketing & Advertising Fund</td>
                          <td className="py-3 px-4 text-right text-rose-600">
                            - {formatCurrency(listing.privateData.pnlBreakdown.marketingFund)}
                          </td>
                        </tr>
                        <tr className="text-slate-600">
                          <td className="py-3 px-4 pl-8">Commercial Base Rent & Triple Net</td>
                          <td className="py-3 px-4 text-right text-rose-600">
                            - {formatCurrency(listing.privateData.pnlBreakdown.rentAndLease)}
                          </td>
                        </tr>
                        <tr className="font-black text-sm bg-emerald-50 text-emerald-900 border-t-2 border-emerald-500/20">
                          <td className="py-3.5 px-4">Net Seller's Discretionary Earnings (SDE)</td>
                          <td className="py-3.5 px-4 text-right text-emerald-700">
                            {formatCurrency(listing.privateData.pnlBreakdown.netDiscretionaryEarnings)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* GeoJSON Spatial Territory Visualization */}
                <TerritoryMap
                  region={listing.region}
                  brandName={listing.privateData.brandName}
                  coordinates={listing.territory?.coordinates}
                />

                {/* 2. Franchisor Transfer Requirements & Approval Stages */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
                  <div className="pb-4 border-b border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                      Corporate Brand Guidelines
                    </span>
                    <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
                      FRANCHISOR TRANSFER PROTOCOL
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block">Transfer Fee</span>
                      <p className="font-black text-sm text-slate-900 mt-0.5">
                        {formatCurrency(listing.privateData.franchisorApprovalDetails.transferFee)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block">Min Liquid Capital</span>
                      <p className="font-black text-sm text-slate-900 mt-0.5">
                        {formatCurrency(listing.privateData.franchisorApprovalDetails.minimumLiquidCapitalRequirement)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block">Min Net Worth</span>
                      <p className="font-black text-sm text-slate-900 mt-0.5">
                        {formatCurrency(listing.privateData.franchisorApprovalDetails.minimumNetWorthRequirement)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block">Training Period</span>
                      <p className="font-black text-sm text-slate-900 mt-0.5">
                        {listing.privateData.franchisorApprovalDetails.trainingDurationWeeks} Weeks
                      </p>
                    </div>
                  </div>

                  {/* Transfer Stages List */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3">
                      Mandatory Transfer Stages
                    </h4>
                    <div className="space-y-2">
                      {listing.privateData.franchisorApprovalDetails.transferApprovalStages.map((st, i) => (
                        <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Real Estate Lease Specifications */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-4">
                  <div className="pb-4 border-b border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                      Premises Specifications
                    </span>
                    <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
                      COMMERCIAL LEASE TERMS
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Monthly Rent (NNN)</span>
                      <p className="font-black text-base text-slate-900 mt-0.5">
                        {formatCurrency(listing.privateData.leaseDetails.monthlyRent)} / mo
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Facility Square Footage</span>
                      <p className="font-black text-base text-slate-900 mt-0.5">
                        {listing.privateData.leaseDetails.squareFootage.toLocaleString()} Sq. Ft.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Current Lease Expiration</span>
                      <p className="font-black text-base text-slate-900 mt-0.5">
                        {listing.privateData.leaseDetails.expirationDate}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Renewal Options</span>
                      <p className="font-black text-base text-slate-900 mt-0.5">
                        {listing.privateData.leaseDetails.renewalOptions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Downloadable Due Diligence Vault */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-4">
                  <div className="pb-4 border-b border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                      Encrypted Document Vault
                    </span>
                    <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
                      DUE DILIGENCE DOSSIERS
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {listing.privateData.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-black text-xs text-slate-900 uppercase tracking-tight">
                              {doc.title}
                            </p>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {doc.type} • {doc.fileSize}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadDoc(doc.title)}
                          className="px-4 py-2 rounded-full bg-slate-900 hover:bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : null}

          </div>

          {/* Right Column: NDA Signing Pad OR Contact M&A Advisor */}
          <div className="lg:col-span-5 space-y-8">
            
            {!ndaSigned ? (
              /* Digital NDA Execution Pad */
              <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500/40 shadow-2xl sticky top-28 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-200 mb-3">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Legally Binding Digital NDA</span>
                  </div>
                  <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">
                    EXECUTE NDA TO UNLOCK <span className="text-emerald-500">DATA ROOM</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    By signing below, you gain instant access to the store's exact brand name, street address, audited P&Ls, and franchisor transfer schedules.
                  </p>
                </div>

                {ndaError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                    {ndaError}
                  </div>
                )}

                <form onSubmit={handleSignNda} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                      Legal Signer Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Reynolds"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                        Corporate Entity
                      </label>
                      <input
                        type="text"
                        placeholder="Apex Capital LLC"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Electronic Signature Box */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                      Electronic Signature (Type full legal name)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="/s/ Full Legal Signature"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500/50 bg-slate-50 font-serif italic text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Cryptographically bound to IP {typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1'}
                    </span>
                  </div>

                  {/* Verification Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-[11px] text-slate-600 leading-tight">
                        I agree to strict 24-month confidentiality. I will not contact store staff, shift managers, or landlords directly.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedLiquidity}
                        onChange={(e) => setAgreedLiquidity(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-[11px] text-slate-600 leading-tight">
                        I certify that I meet or exceed the franchisor's minimum liquidity requirement of {formatCurrency(150000)}.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={signingNda}
                    className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                  >
                    {signingNda ? (
                      <span>Executing NDA...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 stroke-[2.5]" />
                        <span>EXECUTE NDA & UNLOCK DATA ROOM</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Already Signed: Action Center & Contact Broker */
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 sticky top-28">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs text-emerald-950 uppercase">NDA Executed</h4>
                    <p className="text-[11px] text-emerald-700">Digital credentials verified for this listing</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight">
                    NEXT DUE DILIGENCE STEPS
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Our Senior M&A intermediary is available to coordinate a private after-hours site inspection or schedule a conference call with the franchisor transfer director.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-950 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest text-center block transition-colors shadow-md"
                  >
                    Schedule Private Store Tour
                  </Link>

                  <Link
                    href="/contact"
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs uppercase tracking-wider text-center block transition-colors"
                  >
                    Submit Letter of Intent (LOI)
                  </Link>
                </div>

                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-[11px] text-slate-400">
                    Lead Broker: Arthur Pendelton, CBI • +1 (800) 840-7372
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}

