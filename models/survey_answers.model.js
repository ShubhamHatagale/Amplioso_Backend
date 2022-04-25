const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model')

const survey_answers = sequelize.define('survey_answers', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  survey_id: {
    type: Sequelize.INTEGER
  },
  survey_user_mapping_id: {
    type: Sequelize.INTEGER
  },
  surveyor_id: {
    type: Sequelize.INTEGER
  },
  question_id: {
    type: Sequelize.INTEGER
  },
  option_id: {
    type: Sequelize.INTEGER
  },
  answer: {
    type: Sequelize.STRING
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
module.exports = survey_answers;




