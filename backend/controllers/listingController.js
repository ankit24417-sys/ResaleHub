import Listing from '../models/Listing.js';
import NdaAgreement from '../models/NdaAgreement.js';
import { checkDbStatus } from '../config/db.js';
import { seedListings } from '../config/seed.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middlewares/authMiddleware.js';

// In-memory listings fallback store
let inMemoryListings = JSON.parse(JSON.stringify(seedListings));

// Helper to check user from auth header if present
const getUserFromRequest = (req) => {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export const getPublicTeasers = async (req, res) => {
  try {
    const { category, state, minPrice, maxPrice, search, brand } = req.query;
    const currentUser = getUserFromRequest(req);
    const isAuthenticated = !!currentUser;

    let listings = [];

    if (checkDbStatus()) {
      const filter = { status: 'active' };

      if (category && category !== 'All Categories') {
        filter.category = category;
      }
      if (brand && brand !== 'All Brands') {
        filter.$or = [
          { 'privateData.brandName': { $regex: brand, $options: 'i' } },
          { publicTitle: { $regex: brand, $options: 'i' } },
        ];
      }
      if (state && state !== 'All States') {
        filter.state = state.toUpperCase();
      }
      if (minPrice || maxPrice) {
        filter.askingPrice = {};
        if (minPrice) filter.askingPrice.$gte = Number(minPrice);
        if (maxPrice) filter.askingPrice.$lte = Number(maxPrice);
      }
      if (search) {
        filter.$or = [
          { publicTitle: { $regex: search, $options: 'i' } },
          { region: { $regex: search, $options: 'i' } },
          { teaserSummary: { $regex: search, $options: 'i' } },
        ];
      }

      listings = await Listing.find(filter)
        .select('-privateData')
        .sort({ createdAt: -1 });
    } else {
      // In-memory filtering
      listings = inMemoryListings.filter((item) => {
        if (item.status !== 'active') return false;
        if (category && category !== 'All Categories' && item.category !== category) return false;
        if (brand && brand !== 'All Brands') {
          const bMatch =
            (item.privateData?.brandName || '').toLowerCase().includes(brand.toLowerCase()) ||
            item.publicTitle.toLowerCase().includes(brand.toLowerCase());
          if (!bMatch) return false;
        }
        if (state && state !== 'All States' && item.state !== state.toUpperCase()) return false;
        if (minPrice && item.askingPrice < Number(minPrice)) return false;
        if (maxPrice && item.askingPrice > Number(maxPrice)) return false;
        if (search) {
          const q = search.toLowerCase();
          const matches =
            item.publicTitle.toLowerCase().includes(q) ||
            item.region.toLowerCase().includes(q) ||
            item.teaserSummary.toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      });
    }

    // Format teasers based on authentication tier
    const formattedTeasers = listings.map((l) => {
      const listingObj = l.toObject ? l.toObject() : { ...l };
      delete listingObj.privateData;

      if (!isAuthenticated) {
        // Gated public teaser: hide specific financials behind lock
        return {
          _id: listingObj._id,
          publicTitle: listingObj.publicTitle,
          category: listingObj.category,
          region: listingObj.region,
          state: listingObj.state,
          establishedYear: listingObj.establishedYear,
          employeeCount: listingObj.employeeCount,
          teaserSummary: listingObj.teaserSummary,
          imageUrl: listingObj.imageUrl,
          highlights: listingObj.highlights,
          isGated: true,
          // Financials masked for public guests
          askingPrice: null,
          cashFlow: null,
          grossRevenue: null,
        };
      }

      // Authenticated user: show verified financial figures
      return {
        ...listingObj,
        isGated: false,
      };
    });

    return res.json({
      success: true,
      isAuthenticated,
      count: formattedTeasers.length,
      listings: formattedTeasers,
    });
  } catch (error) {
    console.error('Error fetching teasers:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve listings.',
    });
  }
};

export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user || getUserFromRequest(req);
    const isAuthenticated = !!currentUser;

    let listing = null;

    if (checkDbStatus()) {
      listing = await Listing.findById(id).populate('seller', 'name email company');
    } else {
      listing = inMemoryListings.find((l) => l._id.toString() === id.toString());
    }

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Franchise listing not found.',
      });
    }

    const listingObj = listing.toObject ? listing.toObject() : { ...listing };

    // Check if user has executed NDA
    let ndaSigned = false;
    let ndaAgreement = null;

    if (currentUser) {
      if (currentUser.role === 'admin') {
        ndaSigned = true;
      } else if (
        listingObj.seller &&
        (listingObj.seller._id?.toString() === currentUser.id?.toString() ||
          listingObj.seller.toString() === currentUser.id?.toString())
      ) {
        ndaSigned = true;
      } else if (checkDbStatus()) {
        ndaAgreement = await NdaAgreement.findOne({
          buyer: currentUser.id || currentUser._id,
          listing: id,
          status: 'active',
        });
        ndaSigned = !!ndaAgreement;
      } else {
        // In-memory NDA check from global registry
        if (global.__mockNdas) {
          const match = global.__mockNdas.find(
            (n) =>
              n.listing.toString() === id.toString() &&
              n.buyer.toString() === (currentUser.id || currentUser._id).toString()
          );
          ndaSigned = !!match;
          if (match) ndaAgreement = match;
        }
      }
    }

    // 30% Liquid Capital Financial Vetting Rule (FR-BUY-01)
    const askingPrice = listingObj.askingPrice || 0;
    const requiredLiquidCapital = Math.round(0.3 * askingPrice);
    const userLiquidCapital = currentUser?.liquidCapital || 0;
    const isQualifiedBuyer = userLiquidCapital >= requiredLiquidCapital;
    const qualification = {
      requiredLiquidCapital,
      userLiquidCapital,
      isQualifiedBuyer,
      thresholdPercentage: 30,
    };

    if (!ndaSigned) {
      // Return public and financial metrics, but protect confidential privateData
      delete listingObj.privateData;

      return res.json({
        success: true,
        isAuthenticated,
        ndaSigned: false,
        qualification,
        listing: {
          ...listingObj,
          askingPrice: isAuthenticated ? listingObj.askingPrice : null,
          cashFlow: isAuthenticated ? listingObj.cashFlow : null,
          grossRevenue: isAuthenticated ? listingObj.grossRevenue : null,
          isGated: !isAuthenticated,
        },
      });
    }

    // NDA is executed: return complete listing with Private Data Room & P&L
    return res.json({
      success: true,
      isAuthenticated: true,
      ndaSigned: true,
      qualification,
      ndaAgreement: ndaAgreement
        ? {
            signedAt: ndaAgreement.signedAt,
            accessToken: ndaAgreement.accessToken,
            termsVersion: ndaAgreement.termsVersion,
          }
        : null,
      listing: listingObj,
    });
  } catch (error) {
    console.error('Error fetching listing details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve listing details.',
    });
  }
};

export const createListing = async (req, res) => {
  try {
    const {
      publicTitle,
      category,
      region,
      state,
      askingPrice,
      cashFlow,
      grossRevenue,
      inventory = 0,
      establishedYear = new Date().getFullYear(),
      employeeCount = 5,
      teaserSummary,
      imageUrl,
      highlights = [],
      territoryCoordinates,
      privateData,
    } = req.body;

    if (!publicTitle || !category || !region || !state || !askingPrice || !cashFlow || !teaserSummary) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required listing fields.',
      });
    }

    const territory = territoryCoordinates
      ? {
          type: 'Polygon',
          coordinates: territoryCoordinates,
        }
      : undefined;

    const listingPayload = {
      publicTitle,
      category,
      region,
      state: state.toUpperCase(),
      askingPrice: Number(askingPrice),
      cashFlow: Number(cashFlow),
      grossRevenue: Number(grossRevenue || askingPrice * 1.5),
      inventory: Number(inventory),
      establishedYear: Number(establishedYear),
      employeeCount: Number(employeeCount),
      status: 'active',
      teaserSummary,
      imageUrl:
        imageUrl ||
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      highlights: highlights.length > 0 ? highlights : ['High-traffic commercial location', 'Turnkey management team'],
      territory,
      privateData: privateData || {
        brandName: publicTitle,
        legalEntity: 'Commercial Operating Co. LLC',
        exactAddress: '100 Business Parkway',
        city: region.split(',')[0] || 'Metro',
        zipCode: '10001',
        pnlBreakdown: {
          annualGrossRevenue: Number(grossRevenue || askingPrice * 1.5),
          costOfGoodsSold: Number(grossRevenue * 0.3 || 200000),
          grossProfit: Number(grossRevenue * 0.7 || 500000),
          operatingExpenses: Number(cashFlow * 0.8 || 150000),
          payroll: Number(cashFlow * 0.9 || 180000),
          royalties: Number(grossRevenue * 0.06 || 45000),
          marketingFund: Number(grossRevenue * 0.02 || 15000),
          rentAndLease: 60000,
          ebitda: Number(cashFlow),
          netDiscretionaryEarnings: Number(cashFlow),
        },
        franchisorApprovalDetails: {
          franchiseFee: 40000,
          transferFee: 10000,
          minimumNetWorthRequirement: 400000,
          minimumLiquidCapitalRequirement: 120000,
          trainingDurationWeeks: 3,
        },
      },
      seller: req.user?._id || req.user?.id,
    };

    if (checkDbStatus()) {
      const newListing = await Listing.create(listingPayload);
      return res.status(201).json({
        success: true,
        message: 'Resale listing published successfully.',
        listing: newListing,
      });
    } else {
      const newListing = {
        _id: `listing_${Date.now()}`,
        id: `listing_${Date.now()}`,
        ...listingPayload,
        createdAt: new Date(),
      };
      inMemoryListings.unshift(newListing);
      return res.status(201).json({
        success: true,
        message: 'Resale listing published successfully.',
        listing: newListing,
      });
    }
  } catch (error) {
    console.error('Error creating listing:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create listing.',
    });
  }
};

