const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AuditLog = sequelize.define('AuditLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entity_type: {
    type: DataTypes.STRING,
  },
  entity_id: {
    type: DataTypes.INTEGER,
  },
  old_value: {
    type: DataTypes.JSON,
  },
  new_value: {
    type: DataTypes.JSON,
  },
  ip_address: {
    type: DataTypes.STRING,
  },
  user_agent: {
    type: DataTypes.STRING,
  },
});

module.exports = AuditLog;
