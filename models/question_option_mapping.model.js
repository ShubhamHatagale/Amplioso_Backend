const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model')

const question_option_mapping = sequelize.define('question_option_mapping', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  question_id: {
    type: Sequelize.INTEGER
  },
  option_id: {
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
  },

}, {
    freezeTableName: true
});
module.exports = question_option_mapping;


