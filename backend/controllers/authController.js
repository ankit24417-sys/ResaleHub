import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../middlewares/authMiddleware.js';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  company: user.company,
  phone: user.phone,
  netWorth: user.netWorth,
  liquidCapital: user.liquidCapital,
  isVerified: user.isVerified,
});

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = 'buyer',
      company = '',
      phone = '',
      netWorth = 0,
      liquidCapital = 0,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role,
      company,
      phone,
      netWorth: Number(netWorth) || 0,
      liquidCapital: Number(liquidCapital) || 0,
      isVerified: true,
    });

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during user registration.',
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your email and password.',
      });
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login.',
    });
  }
};

export const getMe = async (req, res) => {
  return res.json({
    success: true,
    user: formatUserResponse(req.user),
  });
};

export const updateLiquidity = async (req, res) => {
  try {
    const { liquidCapital } = req.body;
    const numericVal = Number(liquidCapital);

    if (Number.isNaN(numericVal) || numericVal < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid liquid capital amount is required.',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { liquidCapital: numericVal },
      { new: true }
    ).select('-password');

    return res.json({
      success: true,
      message: 'Verified liquid capital updated in database.',
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error('Error updating liquidity:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update liquid capital.',
    });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie('token');
  return res.json({
    success: true,
    message: 'Signed out successfully.',
  });
};
