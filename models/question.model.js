const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./companies.model');
const Question = sequelize.define('questions', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id',
        }
    },
    question_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    question: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: '0',
        allowNull: false
    },
}, {
    freezeTableName: true
});
Question.belongsTo(Company, { foreignKey: 'company_id', as: 'QuestionCreated' });
module.exports = Question;


