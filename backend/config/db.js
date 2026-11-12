import mongoose from 'mongoose';
import Listing from '../models/Listing.js';

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('[MongoDB] Fatal Error: MONGO_URI is not defined in root .env');
    process.exit(1);
  }

  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);

    // Initialize 2dsphere spatial index on listings
    try {
      await Listing.collection.createIndex({ territory: '2dsphere' });
      console.log('[MongoDB] 2dsphere spatial index initialized on Listing.territory');
    } catch (idxErr) {
      console.warn('[MongoDB] Notice initializing spatial index:', idxErr.message);
    }
  } catch (error) {
    console.error(`[MongoDB] Fatal connection error at "${mongoUri}": ${error.message}`);
    process.exit(1);
  }
};
