import crypto from 'crypto';
import NdaAgreement from '../models/NdaAgreement.js';
import Listing from '../models/Listing.js';
import { checkDbStatus } from '../config/db.js';

if (!global.__mockNdas) {
  global.__mockNdas = [];
}

export const signNda = async (req, res) => {
  try {
    const { listingId, signature, fullName, company, phone } = req.body;
    const userId = req.user?._id || req.user?.id;

    if (!listingId || !signature || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Listing ID, full legal name, and signature are required to execute the NDA.',
      });
    }

    const ipAddress =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const accessToken = crypto.randomBytes(32).toString('hex');
    const signedAt = new Date();

    if (checkDbStatus()) {
      // Check existing agreement
      let agreement = await NdaAgreement.findOne({
        buyer: userId,
        listing: listingId,
      });

      if (agreement) {
        agreement.status = 'active';
        agreement.signature = signature;
        agreement.signedAt = signedAt;
        agreement.accessToken = accessToken;
        await agreement.save();
      } else {
        agreement = await NdaAgreement.create({
          buyer: userId,
          listing: listingId,
          buyerName: fullName,
          buyerEmail: req.user.email,
          buyerPhone: phone || req.user.phone || '',
          company: company || req.user.company || '',
          signature,
          ipAddress,
          signedAt,
          accessToken,
          status: 'active',
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Non-Disclosure Agreement executed successfully. Virtual Data Room unlocked.',
        accessToken,
        signedAt: agreement.signedAt,
      });
    } else {
      // In-memory fallback
      const existingIdx = global.__mockNdas.findIndex(
        (n) => n.listing.toString() === listingId.toString() && n.buyer.toString() === userId.toString()
      );

      const agreementData = {
        _id: `nda_${Date.now()}`,
        buyer: userId,
        listing: listingId,
        buyerName: fullName,
        buyerEmail: req.user.email,
        buyerPhone: phone || req.user.phone || '',
        company: company || req.user.company || '',
        signature,
        ipAddress,
        signedAt,
        accessToken,
        status: 'active',
        termsVersion: 'v2.4-standard-brokerage',
      };

      if (existingIdx >= 0) {
        global.__mockNdas[existingIdx] = agreementData;
      } else {
        global.__mockNdas.push(agreementData);
      }

      return res.status(201).json({
        success: true,
        message: 'Non-Disclosure Agreement executed successfully. Virtual Data Room unlocked.',
        accessToken,
        signedAt,
      });
    }
  } catch (error) {
    console.error('Error signing NDA:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process NDA execution.',
    });
  }
};

export const checkNdaStatus = async (req, res) => {
  try {
    const { listingId } = req.params;
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.json({ success: true, hasSigned: false });
    }

    if (req.user.role === 'admin') {
      return res.json({ success: true, hasSigned: true, roleBypass: true });
    }

    if (checkDbStatus()) {
      const agreement = await NdaAgreement.findOne({
        buyer: userId,
        listing: listingId,
        status: 'active',
      });

      return res.json({
        success: true,
        hasSigned: !!agreement,
        agreement: agreement
          ? {
              signedAt: agreement.signedAt,
              accessToken: agreement.accessToken,
              termsVersion: agreement.termsVersion,
            }
          : null,
      });
    } else {
      const agreement = (global.__mockNdas || []).find(
        (n) => n.listing.toString() === listingId.toString() && n.buyer.toString() === userId.toString()
      );

      return res.json({
        success: true,
        hasSigned: !!agreement,
        agreement: agreement
          ? {
              signedAt: agreement.signedAt,
              accessToken: agreement.accessToken,
              termsVersion: agreement.termsVersion,
            }
          : null,
      });
    }
  } catch (error) {
    console.error('Error checking NDA status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to check NDA status.',
    });
  }
};

