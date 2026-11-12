import express from 'express';
import {
  createOffer,
  getOffersByListing,
  getSellerOffers,
  getMyOffers,
  updateOfferStatus,
} from '../controllers/offerController.js';
import { protect, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOffer);
router.get('/my', protect, getMyOffers);
router.get('/seller', protect, requireRole('seller', 'admin'), getSellerOffers);
router.get('/listing/:listingId', protect, getOffersByListing);
router.patch('/:id/status', protect, requireRole('seller', 'admin'), updateOfferStatus);

export default router;

