const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model')

const survey_analysis = sequelize.define('survey_analysis', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  survey_id: {
    type: Sequelize.INTEGER
  },
  survey_mapping_id: {
    type: Sequelize.INTEGER
  },
  benchmark_name: {
    type: Sequelize.STRING
  },
  result: {
    type: Sequelize.STRING
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
module.exports = survey_analysis;




