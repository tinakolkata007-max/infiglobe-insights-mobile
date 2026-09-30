const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SubscriptionPlan = sequelize.define('SubscriptionPlan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  validity_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  services: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = SubscriptionPlan;
