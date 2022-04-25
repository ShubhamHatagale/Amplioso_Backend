const { INTEGER, ENUM } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/users.model');

const Year_of_experience = sequelize.define('year_of_experience', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    year_of_experience: {
        type: Sequelize.CHAR,
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
        allowNull: true,
    },
    updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
Year_of_experience.belongsTo(User, { foreignKey: 'created_by', as: 'YOECreated' });
Year_of_experience.belongsTo(User, { foreignKey: 'updated_by', as: 'YOEUpdated' });


module.exports = Year_of_experience;


