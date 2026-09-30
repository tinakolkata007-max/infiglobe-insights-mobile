const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserProgress = sequelize.define('UserProgress', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  progress_percent: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'completed'),
    defaultValue: 'not_started',
  },
  lessons_completed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  exam_score: {
    type: DataTypes.INTEGER,
  },
});

module.exports = UserProgress;
