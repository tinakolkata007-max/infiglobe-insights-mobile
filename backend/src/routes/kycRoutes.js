const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const KYCRecord = require('../models/KYCRecord');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

const router = express.Router();

router.get('/status', authMiddleware, async (req, res) => {
  try {
    const kycRecord = await KYCRecord.findOne({
      where: { user_id: req.user.id },
    });

    res.json({
      status: kycRecord?.status || 'not_started',
      document_type: kycRecord?.document_type,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch KYC status', error: error.message });
  }
});

router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { pan_number, aadhar_number, document_type, bank_account } = req.body;

    let kycRecord = await KYCRecord.findOne({
      where: { user_id: req.user.id },
    });

    if (!kycRecord) {
      kycRecord = await KYCRecord.create({
        user_id: req.user.id,
        status: 'in_progress',
        pan_number,
        aadhar_number,
        document_type,
        bank_account,
      });
    } else {
      await kycRecord.update({
        status: 'in_progress',
        pan_number,
        aadhar_number,
        document_type,
        bank_account,
      });
    }

    await AuditLog.create({
      user_id: req.user.id,
      action: 'KYC_SUBMITTED',
      entity_type: 'KYC',
      entity_id: kycRecord.id,
      new_value: kycRecord.toJSON(),
    });

    res.json({
      message: 'KYC submitted for verification',
      kycRecord,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit KYC', error: error.message });
  }
});

router.post('/approve/:kycId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'super_user') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const kycRecord = await KYCRecord.findByPk(req.params.kycId);
    if (!kycRecord) {
      return res.status(404).json({ message: 'KYC record not found' });
    }

    const oldValue = kycRecord.toJSON();

    await kycRecord.update({ status: 'verified', verified_by: req.user.email });

    await User.update(
      { kyc_status: 'verified' },
      { where: { id: kycRecord.user_id } }
    );

    await AuditLog.create({
      user_id: req.user.id,
      action: 'KYC_APPROVED',
      entity_type: 'KYC',
      entity_id: kycRecord.id,
      old_value: oldValue,
      new_value: kycRecord.toJSON(),
    });

    res.json({ message: 'KYC approved', kycRecord });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve KYC', error: error.message });
  }
});

module.exports = router;
