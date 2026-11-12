import TransferApplication from '../models/TransferApplication.js';

export const getTransfers = async (req, res) => {
  try {
    const transfers = await TransferApplication.find({}).sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: transfers.length,
      transfers,
    });
  } catch (error) {
    console.error('Error fetching franchisor transfers:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to load franchisor transfer pipeline from database.',
    });
  }
};

export const advanceTransferStage = async (req, res) => {
  try {
    const { id } = req.params;
    const transfer = await TransferApplication.findById(id);

    if (!transfer) {
      return res.status(404).json({
        success: false,
        message: 'Transfer application not found.',
      });
    }

    const nextStage = Math.min(transfer.stage + 1, 4);
    transfer.stage = nextStage;
    transfer.status = nextStage === 4 ? 'Approved' : 'In Review';
    await transfer.save();

    return res.json({
      success: true,
      message: `Candidate advanced to Stage ${nextStage}.`,
      transfer,
    });
  } catch (error) {
    console.error('Error advancing transfer stage:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update transfer application stage.',
    });
  }
};

