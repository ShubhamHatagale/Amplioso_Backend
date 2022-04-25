const { INTEGER, ENUM } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/users.model');

const Feedbackfreq = sequelize.define('feedback_frequencies', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    feedback_frequencies: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    feedback_rounds: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: ENUM('Active', 'Inactive'),
        allowNull: false
    },
    created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    created_on: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        }
    },
    updated_on: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: '0',
        allowNull: false
    },
}, {
    freezeTableName: true
});
Feedbackfreq.belongsTo(User, { foreignKey: 'created_by', as: 'FeedbackfreqCreated' });
Feedbackfreq.belongsTo(User, { foreignKey: 'updated_by', as: 'FeedbackfreqUpdated' });

module.exports = Feedbackfreq;


