const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const KYCRecord = sequelize.define('KYCRecord', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'verified', 'rejected', 're_verification'),
    defaultValue: 'not_started',
  },
  document_type: {
    type: DataTypes.STRING,
  },
  document_url: {
    type: DataTypes.STRING,
  },
  verified_by: {
    type: DataTypes.STRING,
  },
  pan_number: {
    type: DataTypes.STRING,
  },
  aadhar_number: {
    type: DataTypes.STRING,
  },
  bank_account: {
    type: DataTypes.STRING,
  },
});

module.exports = KYCRecord;
