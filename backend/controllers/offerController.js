import Offer from '../models/Offer.js';
import Listing from '../models/Listing.js';
import NdaAgreement from '../models/NdaAgreement.js';

export const createOffer = async (req, res) => {
  try {
    const {
      listingId,
      offerAmount,
      cashDownPayment,
      financingType = 'SBA 7(a) Loan',
      closingTimelineDays = 60,
      contingencies,
      notes = '',
    } = req.body;

    const userId = req.user._id;

    if (!listingId || !offerAmount || !cashDownPayment) {
      return res.status(400).json({
        success: false,
        message: 'Listing ID, Offer Amount, and Cash Down Payment are required.',
      });
    }

    // Verify buyer has signed NDA for this listing in MongoDB
    const agreement = await NdaAgreement.findOne({
      buyer: userId,
      listing: listingId,
      status: 'active',
    });
    const ndaSigned = !!agreement || req.user.role === 'admin';

    if (!ndaSigned) {
      return res.status(403).json({
        success: false,
        message: 'A signed Non-Disclosure Agreement (NDA) is required before submitting a formal purchase offer.',
      });
    }

    const listing = await Listing.findById(listingId);
    const listingTitle = listing ? listing.publicTitle : 'Confidential Franchise Resale';

    const newOffer = await Offer.create({
      buyer: userId,
      buyerName: req.user.name,
      buyerEmail: req.user.email,
      company: req.user.company || 'Private Investor',
      listing: listingId,
      listingTitle,
      offerAmount: Number(offerAmount),
      cashDownPayment: Number(cashDownPayment),
      financingType,
      closingTimelineDays: Number(closingTimelineDays),
      contingencies: contingencies || [
        'Franchisor Transfer & Brand Approval',
        'Commercial Lease Assignment Consent',
        'Final 30-Day Financial & Tax Audit',
      ],
      status: 'submitted',
      notes,
    });

    return res.status(201).json({
      success: true,
      message: 'Purchase Offer (LOI) submitted to seller and advisory desk.',
      offer: newOffer,
    });
  } catch (err) {
    console.error('Error submitting offer:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit purchase offer.',
    });
  }
};

export const getOffersByListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const offers = await Offer.find({ listing: listingId }).sort({ createdAt: -1 });
    return res.json({ success: true, count: offers.length, offers });
  } catch (err) {
    console.error('Error fetching listing offers:', err);
    return res.status(500).json({ success: false, message: 'Failed to load offers.' });
  }
};

export const getSellerOffers = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role !== 'admin') {
      const sellerListings = await Listing.find({ seller: req.user._id }).select('_id');
      const listingIds = sellerListings.map((l) => l._id);
      filter = { listing: { $in: listingIds } };
    }

    const offers = await Offer.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: offers.length, offers });
  } catch (err) {
    console.error('Error fetching seller offers:', err);
    return res.status(500).json({ success: false, message: 'Failed to load seller offers.' });
  }
};

export const getMyOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ buyer: req.user._id }).sort({ createdAt: -1 });
    return res.json({ success: true, count: offers.length, offers });
  } catch (err) {
    console.error('Error fetching user offers:', err);
    return res.status(500).json({ success: false, message: 'Failed to load offers.' });
  }
};

export const updateOfferStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['submitted', 'under_review', 'accepted', 'countered', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid offer status.' });
    }

    const offer = await Offer.findByIdAndUpdate(id, { status }, { new: true });
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found.' });
    }

    return res.json({ success: true, message: `Offer marked as ${status}.`, offer });
  } catch (err) {
    console.error('Error updating offer:', err);
    return res.status(500).json({ success: false, message: 'Failed to update offer.' });
  }
};
