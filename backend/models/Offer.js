import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    buyerEmail: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: '',
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    listingTitle: {
      type: String,
      required: true,
    },
    offerAmount: {
      type: Number,
      required: true,
    },
    cashDownPayment: {
      type: Number,
      required: true,
    },
    financingType: {
      type: String,
      enum: ['SBA 7(a) Loan', 'All Cash', 'Seller Financing', 'Conventional Bank'],
      default: 'SBA 7(a) Loan',
    },
    closingTimelineDays: {
      type: Number,
      default: 60,
    },
    contingencies: {
      type: [String],
      default: [
        'Franchisor Transfer & Brand Approval',
        'Commercial Lease Assignment Consent',
        'Final 30-Day Financial & Tax Audit',
      ],
    },
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'accepted', 'countered', 'rejected'],
      default: 'submitted',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.models.Offer || mongoose.model('Offer', offerSchema);

export default Offer;

