import Offer from '../models/Offer.js';
import Listing from '../models/Listing.js';
import NdaAgreement from '../models/NdaAgreement.js';
import { checkDbStatus } from '../config/db.js';
import { seedListings } from '../config/seed.js';

if (!global.__mockOffers) {
  global.__mockOffers = [
    {
      _id: 'offer_mock_1',
      id: 'offer_mock_1',
      buyer: 'mock_user_1',
      buyerName: 'David Reynolds',
      buyerEmail: 'buyer@resalehub.com',
      company: 'Apex Capital Partners LLC',
      listing: '663f10111111111111111101',
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
      createdAt: new Date(Date.now() - 2 * 864e5),
    },
  ];
}

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

    const userId = req.user?._id || req.user?.id;

    if (!listingId || !offerAmount || !cashDownPayment) {
      return res.status(400).json({
        success: false,
        message: 'Listing ID, Offer Amount, and Cash Down Payment are required.',
      });
    }

    // Verify buyer has signed NDA for this listing
    let ndaSigned = false;
    if (checkDbStatus()) {
      const agreement = await NdaAgreement.findOne({
        buyer: userId,
        listing: listingId,
        status: 'active',
      });
      ndaSigned = !!agreement || req.user.role === 'admin';
    } else {
      const match = (global.__mockNdas || []).find(
        (n) => n.listing.toString() === listingId.toString() && n.buyer.toString() === userId.toString()
      );
      ndaSigned = !!match || req.user.role === 'admin';
    }

    if (!ndaSigned) {
      return res.status(403).json({
        success: false,
        message: 'A signed Non-Disclosure Agreement (NDA) is required before submitting a formal purchase offer.',
      });
    }

    // Lookup listing title
    let listingTitle = 'Confidential Franchise Resale';
    if (checkDbStatus()) {
      const listing = await Listing.findById(listingId);
      if (listing) listingTitle = listing.publicTitle;
    } else {
      const listing = seedListings.find((l) => l._id.toString() === listingId.toString());
      if (listing) listingTitle = listing.publicTitle;
    }

    const payload = {
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
    };

    if (checkDbStatus()) {
      const newOffer = await Offer.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Purchase Offer (LOI) submitted to seller and advisory desk.',
        offer: newOffer,
      });
    } else {
      const newOffer = {
        _id: `offer_${Date.now()}`,
        id: `offer_${Date.now()}`,
        ...payload,
        createdAt: new Date(),
      };
      global.__mockOffers.unshift(newOffer);
      return res.status(201).json({
        success: true,
        message: 'Purchase Offer (LOI) submitted to seller and advisory desk.',
        offer: newOffer,
      });
    }
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

    if (checkDbStatus()) {
      const offers = await Offer.find({ listing: listingId }).sort({ createdAt: -1 });
      return res.json({ success: true, count: offers.length, offers });
    } else {
      const offers = (global.__mockOffers || []).filter(
        (o) => o.listing.toString() === listingId.toString()
      );
      return res.json({ success: true, count: offers.length, offers });
    }
  } catch (err) {
    console.error('Error fetching listing offers:', err);
    return res.status(500).json({ success: false, message: 'Failed to load offers.' });
  }
};

export const getMyOffers = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (checkDbStatus()) {
      const offers = await Offer.find({ buyer: userId }).sort({ createdAt: -1 });
      return res.json({ success: true, count: offers.length, offers });
    } else {
      const offers = (global.__mockOffers || []).filter(
        (o) => o.buyer.toString() === userId.toString()
      );
      return res.json({ success: true, count: offers.length, offers });
    }
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

    if (checkDbStatus()) {
      const offer = await Offer.findByIdAndUpdate(id, { status }, { new: true });
      if (!offer) return res.status(404).json({ success: false, message: 'Offer not found.' });
      return res.json({ success: true, message: `Offer marked as ${status}.`, offer });
    } else {
      const offer = (global.__mockOffers || []).find((o) => (o._id || o.id) === id);
      if (!offer) return res.status(404).json({ success: false, message: 'Offer not found.' });
      offer.status = status;
      return res.json({ success: true, message: `Offer marked as ${status}.`, offer });
    }
  } catch (err) {
    console.error('Error updating offer:', err);
    return res.status(500).json({ success: false, message: 'Failed to update offer.' });
  }
};

