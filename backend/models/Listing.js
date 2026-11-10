import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['P&L Statement', 'Tax Return', 'Franchise Agreement', 'Lease Agreement', 'Equipment Asset List', 'VDR Dossier'],
    default: 'P&L Statement',
  },
  fileUrl: { type: String, required: true },
  fileSize: { type: String, default: '1.8 MB' },
  uploadedAt: { type: Date, default: Date.now },
});

const privateDataSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  legalEntity: { type: String, default: 'Proprietary HoldCo LLC' },
  exactAddress: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  pnlBreakdown: {
    annualGrossRevenue: { type: Number, default: 0 },
    costOfGoodsSold: { type: Number, default: 0 },
    grossProfit: { type: Number, default: 0 },
    operatingExpenses: { type: Number, default: 0 },
    payroll: { type: Number, default: 0 },
    royalties: { type: Number, default: 0 }, // e.g. 5-7% franchisor royalty
    marketingFund: { type: Number, default: 0 }, // 1.5-3% brand fund
    rentAndLease: { type: Number, default: 0 },
    ebitda: { type: Number, default: 0 },
    netDiscretionaryEarnings: { type: Number, default: 0 },
  },
  franchisorApprovalDetails: {
    franchiseFee: { type: Number, default: 45000 },
    transferFee: { type: Number, default: 12500 },
    minimumNetWorthRequirement: { type: Number, default: 500000 },
    minimumLiquidCapitalRequirement: { type: Number, default: 150000 },
    trainingDurationWeeks: { type: Number, default: 4 },
    transferApprovalStages: {
      type: [String],
      default: [
        'Candidate Background & Financial Audit',
        'Franchisor Discovery Interview',
        'Formal Franchisor Executive Approval',
        'Franchise Agreement & Lease Assignment',
        'Comprehensive Brand Certification Training',
        'Closing & Official Escrow Transfer',
      ],
    },
  },
  leaseDetails: {
    monthlyRent: { type: Number, default: 6500 },
    squareFootage: { type: Number, default: 2400 },
    expirationDate: { type: String, default: '2029-06-30' },
    renewalOptions: { type: String, default: 'Two 5-Year Options Available' },
  },
  documents: [documentSchema],
});

const territorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Polygon'],
      default: 'Polygon',
    },
    coordinates: {
      type: [[[Number]]], // Array of arrays of [longitude, latitude]
      required: true,
      default: [
        [
          [-105.02, 39.73],
          [-104.95, 39.73],
          [-104.95, 39.78],
          [-105.02, 39.78],
          [-105.02, 39.73],
        ],
      ],
    },
  },
  { _id: false }
);

const listingSchema = new mongoose.Schema(
  {
    publicTitle: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Food & Beverage',
        'Fitness & Wellness',
        'Automotive Services',
        'Commercial & Home Services',
        'Health & Medical',
        'B2B Services',
        'Retail & Specialized',
      ],
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    askingPrice: {
      type: Number,
      required: true,
    },
    cashFlow: {
      type: Number,
      required: true,
    },
    grossRevenue: {
      type: Number,
      required: true,
    },
    inventory: {
      type: Number,
      default: 0,
    },
    establishedYear: {
      type: Number,
      default: 2017,
    },
    employeeCount: {
      type: Number,
      default: 8,
    },
    status: {
      type: String,
      enum: ['active', 'under_contract', 'sold'],
      default: 'active',
    },
    teaserSummary: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    },
    highlights: {
      type: [String],
      default: [],
    },
    territory: {
      type: territorySchema,
      required: false,
    },
    privateData: {
      type: privateDataSchema,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// 2dsphere index for GeoJSON spatial territory mapping
listingSchema.index({ territory: '2dsphere' });

const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);

export default Listing;

