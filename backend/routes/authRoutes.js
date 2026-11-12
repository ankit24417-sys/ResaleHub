import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateLiquidity,
  logoutUser,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.patch('/liquidity', protect, updateLiquidity);
router.post('/logout', logoutUser);

export default router;

