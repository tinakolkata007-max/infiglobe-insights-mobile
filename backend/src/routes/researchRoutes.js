const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const ResearchItem = require('../models/ResearchItem');
const UserSubscription = require('../models/UserSubscription');
const AuditLog = require('../models/AuditLog');

const router = express.Router();

router.get('/intraday', authMiddleware, async (req, res) => {
  try {
    const hasAccess = await UserSubscription.findOne({
      where: { user_id: req.user.id, status: 'active' },
    });

    if (!hasAccess) {
      return res.status(403).json({ message: 'No active subscription' });
    }

    const research = await ResearchItem.findAll({
      where: {
        service_type: 'intraday',
        status: 'published',
      },
      limit: 10,
      order: [['createdAt', 'DESC']],
    });

    res.json({ research });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch intraday research', error: error.message });
  }
});

router.get('/swing', authMiddleware, async (req, res) => {
  try {
    const hasAccess = await UserSubscription.findOne({
      where: { user_id: req.user.id, status: 'active' },
    });

    if (!hasAccess) {
      return res.status(403).json({ message: 'No active subscription' });
    }

    const research = await ResearchItem.findAll({
      where: {
        service_type: 'swing',
        status: 'published',
      },
      limit: 10,
      order: [['createdAt', 'DESC']],
    });

    res.json({ research });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch swing research', error: error.message });
  }
});

router.get('/investment', authMiddleware, async (req, res) => {
  try {
    const hasAccess = await UserSubscription.findOne({
      where: { user_id: req.user.id, status: 'active' },
    });

    if (!hasAccess) {
      return res.status(403).json({ message: 'No active subscription' });
    }

    const research = await ResearchItem.findAll({
      where: {
        service_type: 'investment',
        status: 'published',
      },
      limit: 10,
      order: [['createdAt', 'DESC']],
    });

    res.json({ research });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch investment research', error: error.message });
  }
});

router.post('/create', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'researcher') {
      return res.status(403).json({ message: 'Only researchers can create content' });
    }

    const { title, service_type, content } = req.body;

    const research = await ResearchItem.create({
      title,
      service_type,
      content,
      status: 'draft',
      created_by: req.user.id,
    });

    await AuditLog.create({
      user_id: req.user.id,
      action: 'RESEARCH_CREATED',
      entity_type: 'Research',
      entity_id: research.id,
      new_value: research.toJSON(),
    });

    res.json({
      message: 'Research created successfully',
      research,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create research', error: error.message });
  }
});

router.post('/submit-approval/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'researcher') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const research = await ResearchItem.findByPk(req.params.id);
    if (!research) {
      return res.status(404).json({ message: 'Research not found' });
    }

    await research.update({ status: 'submitted' });

    await AuditLog.create({
      user_id: req.user.id,
      action: 'RESEARCH_SUBMITTED_FOR_APPROVAL',
      entity_type: 'Research',
      entity_id: research.id,
    });

    res.json({ message: 'Research submitted for approval', research });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit for approval', error: error.message });
  }
});

router.post('/approve/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'approver') {
      return res.status(403).json({ message: 'Only approvers can approve' });
    }

    const { approval_notes } = req.body;
    const research = await ResearchItem.findByPk(req.params.id);
    if (!research) {
      return res.status(404).json({ message: 'Research not found' });
    }

    await research.update({
      status: 'approved',
      approved_by: req.user.id,
      approval_notes,
    });

    await AuditLog.create({
      user_id: req.user.id,
      action: 'RESEARCH_APPROVED',
      entity_type: 'Research',
      entity_id: research.id,
    });

    res.json({ message: 'Research approved', research });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve research', error: error.message });
  }
});

router.post('/publish/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'approver') {
      return res.status(403).json({ message: 'Only approvers can publish' });
    }

    const research = await ResearchItem.findByPk(req.params.id);
    if (!research) {
      return res.status(404).json({ message: 'Research not found' });
    }

    if (research.status !== 'approved') {
      return res.status(400).json({ message: 'Only approved research can be published' });
    }

    await research.update({ status: 'published' });

    await AuditLog.create({
      user_id: req.user.id,
      action: 'RESEARCH_PUBLISHED',
      entity_type: 'Research',
      entity_id: research.id,
    });

    res.json({ message: 'Research published', research });
  } catch (error) {
    res.status(500).json({ message: 'Failed to publish research', error: error.message });
  }
});

module.exports = router;
