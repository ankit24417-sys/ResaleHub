import mongoose from 'mongoose';

const transferApplicationSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    storeUnit: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    liquidCapital: {
      type: Number,
      required: true,
    },
    netWorth: {
      type: Number,
      required: true,
    },
    creditScore: {
      type: String,
      required: true,
    },
    backgroundCheckStatus: {
      type: String,
      enum: ['Clear', 'In Review', 'Flagged'],
      default: 'Clear',
    },
    fddAcknowledgedDate: {
      type: String,
      required: true,
    },
    stage: {
      type: Number,
      min: 1,
      max: 4,
      default: 1,
    },
    status: {
      type: String,
      enum: ['In Review', 'Approved', 'Action Needed'],
      default: 'In Review',
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const TransferApplication =
  mongoose.models.TransferApplication ||
  mongoose.model('TransferApplication', transferApplicationSchema);

export default TransferApplication;

