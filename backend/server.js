require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const kycRoutes = require('./src/routes/kycRoutes');
const subscriptionRoutes = require('./src/routes/subscriptionRoutes');
const researchRoutes = require('./src/routes/researchRoutes');
const educationRoutes = require('./src/routes/educationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Infiglobe API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/education', educationRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

const startServer = async () => {
  try {
    await db.authenticate();
    console.log('MySQL connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
    process.exit(1);
  }
};

startServer();
