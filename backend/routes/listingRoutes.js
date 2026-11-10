import express from 'express';
import {
  getPublicTeasers,
  getListingById,
  createListing,
} from '../controllers/listingController.js';
import { protect, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPublicTeasers);
router.get('/:id', getListingById);
router.post('/', protect, requireRole('seller', 'admin', 'consultant'), createListing);

export default router;

