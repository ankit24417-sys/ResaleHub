import crypto from 'crypto';
import PDFDocument from 'pdfkit';
import NdaAgreement from '../models/NdaAgreement.js';
import Listing from '../models/Listing.js';
import { checkDbStatus } from '../config/db.js';
import { seedListings } from '../config/seed.js';

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
        downloadUrl: `/api/nda/download/${listingId}`,
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
        downloadUrl: `/api/nda/download/${listingId}`,
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
              downloadUrl: `/api/nda/download/${listingId}`,
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
              downloadUrl: `/api/nda/download/${listingId}`,
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

export const downloadNdaPdf = async (req, res) => {
  try {
    const { listingId } = req.params;
    const userId = req.user?._id || req.user?.id;

    // Check agreement
    let agreement = null;
    if (checkDbStatus()) {
      agreement = await NdaAgreement.findOne({
        buyer: userId,
        listing: listingId,
        status: 'active',
      });
    } else {
      agreement = (global.__mockNdas || []).find(
        (n) => n.listing.toString() === listingId.toString() && n.buyer.toString() === userId.toString()
      );
    }

    if (!agreement && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No active NDA found for this listing. Please sign the agreement first.',
      });
    }

    // Retrieve listing info for document header
    let listing = null;
    if (checkDbStatus()) {
      listing = await Listing.findById(listingId);
    } else {
      listing = seedListings.find((l) => l._id.toString() === listingId.toString());
    }

    const title = listing ? listing.publicTitle : 'Confidential Franchise Resale';
    const signerName = agreement ? agreement.buyerName : req.user.name;
    const signerEmail = agreement ? agreement.buyerEmail : req.user.email;
    const signerCompany = agreement ? (agreement.company || 'Private Investor') : 'Private Investor';
    const signedDate = agreement ? new Date(agreement.signedAt).toUTCString() : new Date().toUTCString();
    const token = agreement ? agreement.accessToken : 'AUDIT_TOKEN_VERIFIED';
    const ip = agreement ? agreement.ipAddress : '127.0.0.1';

    // Create PDF document
    const doc = new PDFDocument({ margin: 45, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ResaleHub-Executed-NDA-${listingId.slice(-6)}.pdf`
    );

    doc.pipe(res);

    // Header Badge
    doc
      .fillColor('#064e3b')
      .fontSize(16)
      .font('Helvetica-Bold')
      .text('RESALEHUB', 45, 45)
      .fontSize(9)
      .fillColor('#059669')
      .text('INSTITUTIONAL FRANCHISE M&A BROKERAGE • TRANSACTION INTEGRITY PROTOCOL', 45, 65);

    doc.moveTo(45, 80).lineTo(550, 80).strokeColor('#e2e8f0').stroke();

    // Document Title
    doc
      .moveDown(1.5)
      .fillColor('#0f172a')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('CONFIDENTIAL DIGITAL NON-DISCLOSURE & NON-CIRCUMVENTION AGREEMENT', { align: 'center' })
      .moveDown(0.4)
      .fontSize(9)
      .font('Helvetica')
      .fillColor('#64748b')
      .text('Governed under Form NDA-2026-FRANCHISE • Standard Brokerage Terms v2.4', { align: 'center' });

    // Meta box
    doc.moveDown(1.2);
    const boxTop = doc.y;
    doc
      .rect(45, boxTop, 505, 75)
      .fillAndStroke('#f8fafc', '#cbd5e1');

    doc
      .fontSize(9)
      .font('Helvetica-Bold')
      .fillColor('#0f172a')
      .text(`Listing Ref:`, 55, boxTop + 10)
      .font('Helvetica')
      .text(`${title} (ID: #${listingId.slice(-8).toUpperCase()})`, 130, boxTop + 10)
      .font('Helvetica-Bold')
      .text(`Authorized Signer:`, 55, boxTop + 25)
      .font('Helvetica')
      .text(`${signerName} (${signerEmail}) • ${signerCompany}`, 130, boxTop + 25)
      .font('Helvetica-Bold')
      .text(`Execution Date:`, 55, boxTop + 40)
      .font('Helvetica')
      .text(`${signedDate}`, 130, boxTop + 40)
      .font('Helvetica-Bold')
      .text(`Digital Fingerprint:`, 55, boxTop + 55)
      .font('Helvetica')
      .text(`IP: ${ip} | Token: ${token.slice(0, 24)}...`, 130, boxTop + 55);

    doc.y = boxTop + 90;

    // Legal Terms
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#0f172a')
      .text('1. Confidential Material & Scope')
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor('#334155')
      .text(
        'The recipient ("Buyer") understands and agrees that all operational data, profit & loss (P&L) statements, equipment asset schedules, store lease agreements, and franchisor brand disclosure documents provided via the ResaleHub Virtual Data Room are strictly proprietary and trade-secret protected.'
      )
      .moveDown(0.7);

    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#0f172a')
      .text('2. Absolute Non-Disclosure & Staff Protection')
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor('#334155')
      .text(
        'Buyer explicitly covenants not to contact, visit unannounced, or communicate with store general managers, shift staff, commercial landlords, or corporate brand personnel without prior written authorization from ResaleHub advisory intermediary.'
      )
      .moveDown(0.7);

    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#0f172a')
      .text('3. 24-Month Non-Circumvention Covenant')
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor('#334155')
      .text(
        'For a period of twenty-four (24) months from the date of execution, Buyer agrees not to consummate any direct purchase, lease assignment, or corporate asset acquisition of the subject franchise unit outside of the designated brokerage escrow channel.'
      )
      .moveDown(0.7);

    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#0f172a')
      .text('4. Liquidated Damages & Enforcement')
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor('#334155')
      .text(
        'In the event of an unauthorized disclosure or intentional circumvention that compromises the franchise business operations, the violating party shall be liable for liquidated damages of up to $100,000 USD plus reasonable attorney fees and transaction broker commissions.'
      )
      .moveDown(1.2);

    // Signature Block
    const sigBoxTop = doc.y;
    doc
      .rect(45, sigBoxTop, 505, 60)
      .fillAndStroke('#ecfdf5', '#10b981');

    doc
      .fontSize(9)
      .font('Helvetica-Bold')
      .fillColor('#064e3b')
      .text('ELECTRONIC SIGNATURE CERTIFICATION', 55, sigBoxTop + 10)
      .font('Times-Italic')
      .fontSize(14)
      .fillColor('#0f172a')
      .text(`/s/ ${agreement ? agreement.signature : signerName}`, 55, sigBoxTop + 26)
      .font('Helvetica')
      .fontSize(8)
      .fillColor('#059669')
      .text(`Digitally stamped & verified by ResaleHub Security Engine on ${signedDate}`, 55, sigBoxTop + 45);

    doc.end();
  } catch (err) {
    console.error('Error generating NDA PDF:', err);
    res.status(500).json({ success: false, message: 'Failed to generate PDF document.' });
  }
};
