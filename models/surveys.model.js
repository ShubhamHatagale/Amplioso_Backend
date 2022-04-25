const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model')

const surveys = sequelize.define('surveys', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  survey_code: {
    type: Sequelize.STRING
  },
  survey_start_date: {
    type: Sequelize.DATE
  },
  survey_end_date: {
    type: Sequelize.DATE
  },
  created_by: {
    type: Sequelize.INTEGER
  },
  updated_by: {
    type: Sequelize.INTEGER
  },
  is_deleted: {
    type: Sequelize.BOOLEAN
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
module.exports = surveys;




