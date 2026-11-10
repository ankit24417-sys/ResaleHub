import express from 'express';
import { signNda, checkNdaStatus } from '../controllers/ndaController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/sign', protect, signNda);
router.get('/status/:listingId', protect, checkNdaStatus);

export default router;

