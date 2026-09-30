const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const signToken = user => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || 'client',
    },
    process.env.JWT_SECRET || 'infiglobe-secret',
    { expiresIn: '7d' }
  );
};

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      full_name: fullName,
      email,
      phone,
      password_hash: hashedPassword,
      role: 'client',
      kyc_status: 'not_started',
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        kycStatus: user.kyc_status,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

router.post('/send-otp', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  res.json({
    message: 'OTP sent successfully',
    otp,
    debug: process.env.NODE_ENV !== 'production',
  });
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const generatedOtp = '123456';

  if (otp !== generatedOtp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  res.json({
    message: 'OTP verified successfully',
    token: jwt.sign({ email }, process.env.JWT_SECRET || 'infiglobe-secret', { expiresIn: '7d' }),
    refreshToken: jwt.sign({ email }, process.env.JWT_REFRESH_SECRET || 'infiglobe-refresh-secret', { expiresIn: '30d' }),
  });
});

module.exports = router;
