const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EducationCourse = sequelize.define('EducationCourse', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  duration_weeks: {
    type: DataTypes.INTEGER,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = EducationCourse;
