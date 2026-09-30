const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserSubscription = sequelize.define('UserSubscription', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'cancelled'),
    defaultValue: 'active',
  },
  started_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  expires_at: {
    type: DataTypes.DATE,
  },
  payment_id: {
    type: DataTypes.STRING,
  },
});

module.exports = UserSubscription;
