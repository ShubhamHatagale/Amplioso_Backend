const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model')

const survey_user_mapping = sequelize.define('survey_user_mapping', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  survey_id: {
    type: Sequelize.INTEGER
  },
  survey_id: {
    type: Sequelize.INTEGER
  },
  surveyee_id: {
    type: Sequelize.INTEGER
  },
  surveyor_id: {
    type: Sequelize.INTEGER
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
module.exports = survey_user_mapping;




