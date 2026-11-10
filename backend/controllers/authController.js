import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { checkDbStatus } from '../config/db.js';
import { seedUsers } from '../config/seed.js';
import { JWT_SECRET } from '../middlewares/authMiddleware.js';

// In-memory user store fallback if MongoDB is not running locally
const inMemoryUsers = [...seedUsers].map((u, i) => ({
  _id: `mock_user_${i + 1}`,
  id: `mock_user_${i + 1}`,
  ...u,
  isVerified: true,
}));

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'buyer', company = '', phone = '', netWorth = 0, liquidCapital = 0 } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (checkDbStatus()) {
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
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          phone: user.phone,
          isVerified: user.isVerified,
        },
      });
    } else {
      // In-memory fallback
      const existing = inMemoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.',
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: `user_${Date.now()}`,
        id: `user_${Date.now()}`,
        name,
        email: normalizedEmail,
        password: hashedPassword,
        rawPassword: password,
        role,
        company,
        phone,
        netWorth: Number(netWorth) || 0,
        liquidCapital: Number(liquidCapital) || 0,
        isVerified: true,
      };
      inMemoryUsers.push(newUser);

      const token = generateToken(newUser);

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
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          company: newUser.company,
          phone: newUser.phone,
          isVerified: newUser.isVerified,
        },
      });
    }
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

    if (checkDbStatus()) {
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
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          phone: user.phone,
          isVerified: user.isVerified,
        },
      });
    } else {
      // In-memory fallback
      const user = inMemoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your email and password.',
        });
      }

      let passwordValid = false;
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
        passwordValid = await bcrypt.compare(password, user.password);
      } else {
        passwordValid = user.password === password;
      }

      if (!passwordValid) {
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
        user: {
          id: user._id || user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          phone: user.phone,
          isVerified: user.isVerified,
        },
      });
    }
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
    user: req.user,
  });
};

export const logoutUser = async (req, res) => {
  res.clearCookie('token');
  return res.json({
    success: true,
    message: 'Signed out successfully.',
  });
};

