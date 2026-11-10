import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'resalehub_super_secret_jwt_key_2026';

export const protect = async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Access token missing. Please sign in.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attempt lookup in DB if mongoose is connected
    let user = null;
    try {
      user = await User.findById(decoded.id).select('-password');
    } catch {
      // In-memory or fallback mode
      user = null;
    }

    // Fallback user object from token payload if DB is in fallback mode
    if (!user) {
      user = {
        _id: decoded.id,
        id: decoded.id,
        name: decoded.name || 'Verified Member',
        email: decoded.email,
        role: decoded.role || 'buyer',
        company: decoded.company || '',
        isVerified: true,
      };
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication session. Please sign in again.',
    });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access requires one of [${roles.join(', ')}] permissions. Current role: ${req.user?.role || 'Guest'}`,
      });
    }
    next();
  };
};

export { JWT_SECRET };

