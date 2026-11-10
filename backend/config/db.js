import mongoose from 'mongoose';
import Listing from '../models/Listing.js';
import User from '../models/User.js';
import { runSeed } from './seed.js';

let isDbConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resalehub';
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout to fallback if no local mongod
    });

    isDbConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);

    // Initialize 2dsphere spatial index on listings
    try {
      await Listing.collection.createIndex({ territory: '2dsphere' });
      console.log('[MongoDB] 2dsphere spatial index initialized on Listing.territory');
    } catch (idxErr) {
      console.warn('[MongoDB] Notice initializing spatial index:', idxErr.message);
    }

    // Auto-seed if database has 0 listings
    const count = await Listing.countDocuments();
    if (count === 0) {
      console.log('[MongoDB] Empty listings collection detected. Running auto-seed...');
      await runSeed(mongoose);
    }
  } catch (error) {
    isDbConnected = false;
    console.warn(`[MongoDB] Notice: Could not connect to MongoDB at "${mongoUri}" (${error.message}).`);
    console.log('[MongoDB] ResaleHub API will operate with robust in-memory mock persistence mode.');
  }
};

export const checkDbStatus = () => isDbConnected;

