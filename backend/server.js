import './config/env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import ndaRoutes from './routes/ndaRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import transferRoutes from './routes/transferRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(
  cors({
    origin: (origin, callback) => {
      const envOrigins = (process.env.FRONTEND_URL || '')
        .split(',')
        .map((u) => u.trim().replace(/\/+$/, ''))
        .filter(Boolean);

      const allowedOrigins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        ...envOrigins,
      ];

      // Allow non-browser requests (curl, server-to-server) or explicitly allowed origins / Vercel previews
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root status route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ResaleHub Franchise M&A API',
    endpoints: [
      '/api/health',
      '/api/listings',
      '/api/auth/login',
      '/api/auth/register',
      '/api/nda/sign',
      '/api/offers',
      '/api/transfers',
    ],
  });
});

// Health check endpoint (reports DB connectivity cleanly)
app.get('/api/health', async (req, res) => {
  let dbConnected = mongoose.connection.readyState === 1;
  let dbError = null;
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = mongoose.connection.readyState === 1;
    } catch (err) {
      dbError = err.message;
    }
  }

  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? 'ok' : 'degraded',
    service: 'ResaleHub Franchise M&A API',
    database: dbConnected ? 'connected' : 'disconnected',
    ...(dbError ? { dbError } : {}),
    timestamp: new Date().toISOString(),
  });
});

// Ensure MongoDB is connected prior to handling API routes (essential for Vercel Serverless)
const ensureDbMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection middleware error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Database connection failed. Verify MONGO_URI and Atlas Network Access (0.0.0.0/0).',
      error: err.message,
    });
  }
};

// Mount modular API routes
app.use('/api/auth', ensureDbMiddleware, authRoutes);
app.use('/api/listings', ensureDbMiddleware, listingRoutes);
app.use('/api/nda', ensureDbMiddleware, ndaRoutes);
app.use('/api/offers', ensureDbMiddleware, offerRoutes);
app.use('/api/transfers', ensureDbMiddleware, transferRoutes);

// Global 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error occurred.',
  });
});

// Start local HTTP listener only when NOT running in Vercel Serverless environment
if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`=======================================================`);
        console.log(` ResaleHub M&A Brokerage Backend running on port ${PORT}`);
        console.log(` REST API Base: http://localhost:${PORT}/api`);
        console.log(`=======================================================`);
      });
    })
    .catch((err) => {
      console.error('Failed to initialize local server:', err.message);
      process.exit(1);
    });
}

export default app;
