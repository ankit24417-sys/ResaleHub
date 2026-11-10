'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { PageHeader } from '@/components/common/PageHeader';
import {
  ShieldCheck,
  Building2,
  DollarSign,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Sparkles,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';

const CATEGORIES = [
  'Food & Beverage',
  'Fitness & Wellness',
  'Automotive Services',
  'Commercial & Home Services',
  'Health & Medical',
  'B2B Services',
  'Retail & Specialized',
];

export default function SellerCreatePage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Studio Form Data
  const [formData, setFormData] = useState({
    // Step 1: Blind Teaser Identity
    publicTitle: '',
    category: 'Food & Beverage',
    region: '',
    state: 'CO',
    teaserSummary: '',
    highlight1: '',
    highlight2: '',
    highlight3: '',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',

    // Step 2: Financial Metrics
    askingPrice: '950000',
    cashFlow: '280000',
    grossRevenue: '1450000',
    inventory: '25000',
    establishedYear: '2018',
    employeeCount: '8',

    // Step 3: Confidential Brand & Address
    brandName: '',
    legalEntity: '',
    exactAddress: '',
    city: '',
    zipCode: '',

    // Step 4: Franchisor & Territory Requirements
    transferFee: '12500',
    minimumLiquidCapitalRequirement: '150000',
    minimumNetWorthRequirement: '450000',
    trainingDurationWeeks: '3',
    territoryZone: 'Standard 5-Mile Protected Radius',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setError(null);
    if (currentStep === 1) {
      if (!formData.publicTitle || !formData.region || !formData.teaserSummary) {
        setError('Please complete the Public Title, Region, and Executive Summary.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.askingPrice || !formData.cashFlow) {
        setError('Please specify both Asking Price and Annual Cash Flow (SDE).');
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.brandName || !formData.exactAddress || !formData.city) {
        setError('Please provide the Confidential Brand Name and physical street address.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublish = async () => {
    setSubmitting(true);
    setError(null);

    const highlights = [
      formData.highlight1 || 'Turnkey management team in place',
      formData.highlight2 || 'Prime commercial real estate pad site',
      formData.highlight3 || 'High recurring customer volume',
    ].filter(Boolean);

    const payload = {
      publicTitle: formData.publicTitle,
      category: formData.category,
      region: formData.region,
      state: formData.state.toUpperCase(),
      askingPrice: Number(formData.askingPrice),
      cashFlow: Number(formData.cashFlow),
      grossRevenue: Number(formData.grossRevenue),
      inventory: Number(formData.inventory),
      establishedYear: Number(formData.establishedYear),
      employeeCount: Number(formData.employeeCount),
      teaserSummary: formData.teaserSummary,
      imageUrl: formData.imageUrl,
      highlights,
      territoryCoordinates: [
        [
          [-105.02, 39.73],
          [-104.95, 39.73],
          [-104.95, 39.78],
          [-105.02, 39.78],
          [-105.02, 39.73],
        ],
      ],
      privateData: {
        brandName: formData.brandName,
        legalEntity: formData.legalEntity || `${formData.brandName} Operating LLC`,
        exactAddress: formData.exactAddress,
        city: formData.city,
        zipCode: formData.zipCode || '80001',
        pnlBreakdown: {
          annualGrossRevenue: Number(formData.grossRevenue),
          costOfGoodsSold: Math.round(Number(formData.grossRevenue) * 0.28),
          grossProfit: Math.round(Number(formData.grossRevenue) * 0.72),
          operatingExpenses: Math.round(Number(formData.cashFlow) * 0.7),
          payroll: Math.round(Number(formData.grossRevenue) * 0.22),
          royalties: Math.round(Number(formData.grossRevenue) * 0.06),
          marketingFund: Math.round(Number(formData.grossRevenue) * 0.02),
          rentAndLease: 72000,
          ebitda: Number(formData.cashFlow),
          netDiscretionaryEarnings: Number(formData.cashFlow),
        },
        franchisorApprovalDetails: {
          franchiseFee: 45000,
          transferFee: Number(formData.transferFee),
          minimumNetWorthRequirement: Number(formData.minimumNetWorthRequirement),
          minimumLiquidCapitalRequirement: Number(formData.minimumLiquidCapitalRequirement),
          trainingDurationWeeks: Number(formData.trainingDurationWeeks),
          transferApprovalStages: [
            'Candidate Background & Liquidity Screen',
            'Franchisor Discovery Day Interview',
            'Corporate Transfer Committee Approval',
            'Franchise Agreement & Lease Assignment',
            'Operational Management Training',
            'Escrow Disbursement & Store Cutover',
          ],
        },
        leaseDetails: {
          monthlyRent: 6000,
          squareFootage: 2200,
          expirationDate: '2030-12-31',
          renewalOptions: 'Two 5-Year Extensions',
        },
        documents: [
          {
            title: 'Certified 3-Year Profit & Loss Statements',
            type: 'P&L Statement',
            fileUrl: '/mock-vdr/certified-pl.pdf',
            fileSize: '3.1 MB',
          },
          {
            title: 'Corporate Federal Tax Returns (Past 3 Years)',
            type: 'Tax Return',
            fileUrl: '/mock-vdr/tax-returns.pdf',
            fileSize: '4.5 MB',
          },
          {
            title: 'Franchise Disclosure Document (FDD) Item 19',
            type: 'Franchise Agreement',
            fileUrl: '/mock-vdr/fdd-disclosure.pdf',
            fileSize: '8.4 MB',
          },
        ],
      },
    };

    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to publish listing.');
      }

      router.push(`/#listings-grid`);
    } catch (err: any) {
      setError(err.message || 'Error publishing listing.');
    } finally {
      setSubmitting(false);
    }
  };

  const stepsHeader = [
    { num: 1, title: 'Teaser Identity' },
    { num: 2, title: 'Financials' },
    { num: 3, title: 'Confidential Data' },
    { num: 4, title: 'Territory & Brand' },
    { num: 5, title: 'Preview & Publish' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header */}
      <PageHeader
        badge="Seller Listing Studio"
        title="BUILD YOUR"
        highlightWord="BLIND RESALE"
        subtitle="Our guided studio recasts your financials, sets territory boundaries, and prepares your confidential blind teaser for high-net-worth buyers."
        bgImageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Step Progression Bar */}
        <div className="mb-12">
          <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center">
            {stepsHeader.map((s) => (
              <div key={s.num} className="space-y-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    currentStep >= s.num ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
                <span
                  className={`text-[10px] font-black uppercase tracking-wider block truncate ${
                    currentStep === s.num ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {s.num}. {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Wizard Card Surface */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl">
          
          {/* STEP 1: BLIND TEASER IDENTITY */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  Step 1 of 5
                </span>
                <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
                  PUBLIC BLIND TEASER IDENTITY
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Keep this strictly blind. Do not mention your actual franchise brand name or exact street address.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                  Public Listing Title (Blind Headline)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-Volume Fast Casual QSR Franchise - North Denver"
                  value={formData.publicTitle}
                  onChange={(e) => handleChange('publicTitle', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Industry Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Metro Region & State
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Denver Metro, CO"
                    value={formData.region}
                    onChange={(e) => handleChange('region', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                  Blind Executive Summary
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the opportunity without giving away brand identity: e.g. 'Turnkey drive-thru franchise location in high-growth submarket with 12% annual growth and experienced GM...'"
                  value={formData.teaserSummary}
                  onChange={(e) => handleChange('teaserSummary', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600">
                  Key Strengths & Highlights (Bullet Points)
                </label>
                <input
                  type="text"
                  placeholder="Highlight 1: e.g. Fully remodeled store meeting latest 2026 franchisor specs"
                  value={formData.highlight1}
                  onChange={(e) => handleChange('highlight1', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Highlight 2: e.g. Prime anchor center pad site with double-lane drive-thru"
                  value={formData.highlight2}
                  onChange={(e) => handleChange('highlight2', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: FINANCIAL METRICS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  Step 2 of 5
                </span>
                <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
                  FINANCIAL PERFORMANCE & RECASTING
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  These numbers are gated from unauthenticated public guests and only visible to verified buyers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Asking Price ($ USD)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="950000"
                    value={formData.askingPrice}
                    onChange={(e) => handleChange('askingPrice', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Seller Discretionary Earnings (SDE / Cash Flow)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="280000"
                    value={formData.cashFlow}
                    onChange={(e) => handleChange('cashFlow', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-black text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Annual Gross Revenue ($ USD)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="1450000"
                    value={formData.grossRevenue}
                    onChange={(e) => handleChange('grossRevenue', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Included Inventory Value ($ USD)
                  </label>
                  <input
                    type="number"
                    placeholder="25000"
                    value={formData.inventory}
                    onChange={(e) => handleChange('inventory', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Year Established
                  </label>
                  <input
                    type="number"
                    placeholder="2018"
                    value={formData.establishedYear}
                    onChange={(e) => handleChange('establishedYear', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Staff & Employee Count
                  </label>
                  <input
                    type="number"
                    placeholder="8"
                    value={formData.employeeCount}
                    onChange={(e) => handleChange('employeeCount', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIDENTIAL BRAND & PHYSICAL ADDRESS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  Step 3 of 5
                </span>
                <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
                  CONFIDENTIAL BRAND & REAL LOCATION
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  This confidential information is locked behind our Digital NDA gate and strictly inaccessible until buyer clearance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Actual Brand Name & Store Unit #
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jersey Mike's Subs #14022"
                    value={formData.brandName}
                    onChange={(e) => handleChange('brandName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Legal Operating Entity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mile High Subs LLC"
                    value={formData.legalEntity}
                    onChange={(e) => handleChange('legalEntity', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                  Exact Physical Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10440 Federal Blvd, Suite A"
                  value={formData.exactAddress}
                  onChange={(e) => handleChange('exactAddress', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Westminster"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    placeholder="80031"
                    value={formData.zipCode}
                    onChange={(e) => handleChange('zipCode', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FRANCHISOR & TERRITORY REQUIREMENTS */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  Step 4 of 5
                </span>
                <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
                  FRANCHISOR & TERRITORY CRITERIA
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Specify the franchisor's official transfer terms so incoming buyers are qualified up front.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Franchisor Transfer Fee ($)
                  </label>
                  <input
                    type="number"
                    placeholder="12500"
                    value={formData.transferFee}
                    onChange={(e) => handleChange('transferFee', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Buyer Min Liquid Capital ($)
                  </label>
                  <input
                    type="number"
                    placeholder="150000"
                    value={formData.minimumLiquidCapitalRequirement}
                    onChange={(e) => handleChange('minimumLiquidCapitalRequirement', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Buyer Min Net Worth ($)
                  </label>
                  <input
                    type="number"
                    placeholder="450000"
                    value={formData.minimumNetWorthRequirement}
                    onChange={(e) => handleChange('minimumNetWorthRequirement', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                    Corporate Training Duration
                  </label>
                  <select
                    value={formData.trainingDurationWeeks}
                    onChange={(e) => handleChange('trainingDurationWeeks', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="2">2 Weeks Training</option>
                    <option value="3">3 Weeks Training</option>
                    <option value="4">4 Weeks Training</option>
                    <option value="6">6 Weeks Training</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & PUBLISH */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  Step 5 of 5
                </span>
                <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
                  REVIEW & PUBLISH BLIND LISTING
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Compare how public guests will see your blind teaser vs how verified NDA signers view your private data room.
                </p>
              </div>

              {/* Side-by-side Preview Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Guest View Preview */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-500">Public Guest View</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-slate-900 text-emerald-400">
                      BLIND
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 uppercase">
                      {formData.publicTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {formData.category} • {formData.region}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 text-center relative overflow-hidden">
                    <div className="filter blur-xs opacity-40 text-xs text-white">
                      Asking: $950,000 | Cash Flow: $280,000
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80">
                      <span className="text-[10px] font-black text-emerald-400 uppercase flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Financials Gated
                      </span>
                    </div>
                  </div>
                </div>

                {/* Unlocked VDR Preview */}
                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-emerald-700">Verified NDA View</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500 text-white">
                      UNLOCKED
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 uppercase">
                      {formData.brandName}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {formData.exactAddress}, {formData.city}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-white border border-emerald-100">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">Asking Price</span>
                      <span className="font-black text-slate-900">${Number(formData.askingPrice).toLocaleString()}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-emerald-100">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">Cash Flow (SDE)</span>
                      <span className="font-black text-emerald-600">${Number(formData.cashFlow).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <p className="text-xs text-slate-600">
                  By publishing, you certify that financial figures are accurate and that your listing complies with franchisor disclosure guidelines.
                </p>
              </div>
            </div>
          )}

          {/* Wizard Action Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest transition-all shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handlePublish}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-xl disabled:opacity-50"
              >
                {submitting ? (
                  <span>Publishing Listing...</span>
                ) : (
                  <>
                    <span>PUBLISH CONFIDENTIAL RESALE</span>
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

