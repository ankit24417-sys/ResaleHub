import express from 'express';
import { getTransfers, advanceTransferStage } from '../controllers/transferController.js';
import { protect, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, requireRole('franchisor', 'admin'), getTransfers);
router.patch('/:id/advance', protect, requireRole('franchisor', 'admin'), advanceTransferStage);

export default router;

