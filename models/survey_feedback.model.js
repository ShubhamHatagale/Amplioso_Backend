const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model')

const survey_feedback = sequelize.define('survey_feedback', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  question_id: {
    type: Sequelize.INTEGER
  },
  feature: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  feature1: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  feature2: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  feature3: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  feature4: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  feature5: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  feature6: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  feature7: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  feature8: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  surveyor_id: {
    type: Sequelize.INTEGER
  },
  employee_id: {
    type: Sequelize.INTEGER
  },
  manager_id: {
    type: Sequelize.INTEGER
  },
  company_id: {
    type: Sequelize.INTEGER
  },
  created_by: {
    type: Sequelize.INTEGER
  },
  updated_by: {
    type: Sequelize.INTEGER
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: '0',
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
module.exports = survey_feedback;




