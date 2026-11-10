import NdaAgreement from '../models/NdaAgreement.js';
import Listing from '../models/Listing.js';

export const dataRoomGatekeeper = async (req, res, next) => {
  try {
    const listingId = req.params.id || req.params.listingId || req.body.listingId;
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        requiresAuth: true,
        message: 'Authentication required to access confidential data room.',
      });
    }

    // Role-based bypass: Sellers can inspect their own listings, admins can inspect all
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if the user is the listing owner
    try {
      const listing = await Listing.findById(listingId);
      if (listing && listing.seller && listing.seller.toString() === userId.toString()) {
        return next();
      }
    } catch {
      // Continue to NDA check
    }

    // Check NDA agreement
    let agreement = null;
    try {
      agreement = await NdaAgreement.findOne({
        buyer: userId,
        listing: listingId,
        status: 'active',
      });
    } catch {
      agreement = null;
    }

    // Also check header token if provided
    const ndaAccessToken = req.headers['x-nda-access-token'];
    if (ndaAccessToken && (!agreement || agreement.accessToken !== ndaAccessToken)) {
      try {
        agreement = await NdaAgreement.findOne({
          listing: listingId,
          accessToken: ndaAccessToken,
          status: 'active',
        });
      } catch {
        // ignore
      }
    }

    if (!agreement) {
      return res.status(403).json({
        success: false,
        requiresNda: true,
        message: 'A digitally executed Non-Disclosure Agreement (NDA) is required before accessing the Virtual Data Room.',
        listingId,
      });
    }

    req.ndaAgreement = agreement;
    next();
  } catch (error) {
    console.error('Data Room Gatekeeper error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify NDA credentials.',
    });
  }
};

