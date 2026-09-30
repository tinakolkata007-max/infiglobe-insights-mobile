const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const UserSubscription = require('../models/UserSubscription');
const AuditLog = require('../models/AuditLog');

const router = express.Router();

router.get('/plans', async (req, res) => {
  try {
    const plans = await SubscriptionPlan.findAll({
      where: { is_active: true },
    });
    res.json({ plans });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch plans', error: error.message });
  }
});

router.get('/my-subscriptions', authMiddleware, async (req, res) => {
  try {
    const subscriptions = await UserSubscription.findAll({
      where: { user_id: req.user.id },
    });
    res.json({ subscriptions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subscriptions', error: error.message });
  }
});

router.post('/initiate-payment', authMiddleware, async (req, res) => {
  try {
    const { plan_id } = req.body;

    const plan = await SubscriptionPlan.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const razorpayOrderId = `order_${Date.now()}`;

    res.json({
      message: 'Payment initiated',
      orderId: razorpayOrderId,
      amount: plan.price,
      currency: 'INR',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to initiate payment', error: error.message });
  }
});

router.post('/verify-payment', authMiddleware, async (req, res) => {
  try {
    const { plan_id, payment_id } = req.body;

    const plan = await SubscriptionPlan.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan.validity_days);

    const subscription = await UserSubscription.create({
      user_id: req.user.id,
      plan_id,
      status: 'active',
      payment_id,
      expires_at: expiresAt,
    });

    await AuditLog.create({
      user_id: req.user.id,
      action: 'SUBSCRIPTION_PURCHASED',
      entity_type: 'Subscription',
      entity_id: subscription.id,
      new_value: subscription.toJSON(),
    });

    res.json({
      message: 'Subscription activated',
      subscription,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify payment', error: error.message });
  }
});

module.exports = router;
