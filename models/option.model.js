const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Question = require('./question.model');
const Options = sequelize.define('options', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Question,
            key: 'id',
        }
    },
    option: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    unfavourable: {
        type: Sequelize.BOOLEAN,
        defaultValue: '0',
        allowNull: false
    },
    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: '0',
        allowNull: false
    },
}, {
    freezeTableName: true
});
Options.belongsTo(Question, { foreignKey: 'question_id', as: 'Question' });
module.exports = Options;


