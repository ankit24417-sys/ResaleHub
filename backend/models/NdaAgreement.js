import mongoose from 'mongoose';
import crypto from 'crypto';

const ndaAgreementSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
      trim: true,
    },
    buyerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    buyerPhone: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
    },
    signature: {
      type: String,
      required: true,
      trim: true,
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1',
    },
    signedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'revoked', 'expired'],
      default: 'active',
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(32).toString('hex'),
    },
    termsVersion: {
      type: String,
      default: 'v2.4-standard-brokerage',
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1-year NDA validity
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to quickly check if a user signed an NDA for a listing
ndaAgreementSchema.index({ buyer: 1, listing: 1 }, { unique: true });

const NdaAgreement =
  mongoose.models.NdaAgreement || mongoose.model('NdaAgreement', ndaAgreementSchema);

export default NdaAgreement;

