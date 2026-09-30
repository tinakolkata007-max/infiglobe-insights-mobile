const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ResearchItem = sequelize.define('ResearchItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service_type: {
    type: DataTypes.ENUM('intraday', 'swing', 'investment', 'model_portfolio'),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('draft', 'submitted', 'approved', 'published', 'rejected'),
    defaultValue: 'draft',
  },
  version_number: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  created_by: {
    type: DataTypes.INTEGER,
  },
  approved_by: {
    type: DataTypes.INTEGER,
  },
  approval_notes: {
    type: DataTypes.TEXT,
  },
});

module.exports = ResearchItem;
