import mongoose from 'mongoose';
import Listing from '../models/Listing.js';

// Global cache to reuse MongoDB connection across Vercel Serverless invocations
let cached = global.__mongooseCache;
if (!cached) {
  cached = global.__mongooseCache = { conn: null, promise: null, indexReady: false };
}

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in environment variables.');
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', false);

    // Default to "ReSaleHub" database if the URI omits a database name (e.g. ends with "/")
    const options = {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10,
    };
    try {
      const parsed = new URL(mongoUri);
      if (!parsed.pathname || parsed.pathname === '/') {
        options.dbName = 'ReSaleHub';
      }
    } catch {
      options.dbName = 'ReSaleHub';
    }

    cached.promise = mongoose.connect(mongoUri, options).then(async (mongooseInstance) => {
      console.log(
        `[MongoDB] Connected successfully: ${mongooseInstance.connection.host}/${mongooseInstance.connection.name}`
      );

      if (!cached.indexReady) {
        try {
          await Listing.collection.createIndex({ territory: '2dsphere' });
          cached.indexReady = true;
        } catch (idxErr) {
          console.warn('[MongoDB] Notice initializing spatial index:', idxErr.message);
        }
      }

      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
};
