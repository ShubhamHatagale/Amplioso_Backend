const { INTEGER, ENUM } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/users.model');
const Country = require('../models/countries.model');
const Role = require('../models/roles.model')
const Averageemployee = sequelize.define('average_employees', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    average_employees: {
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
        // references: {
        //     model: User,
        //     key: 'id',
        // }
    },
    created_on: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: User,
        //     key: 'id',
        // }
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
Averageemployee.belongsTo(User, { foreignKey: 'created_by', as: 'UserCreatedBy' });
Averageemployee.belongsTo(User, { foreignKey: 'updated_by', as: 'UpdatedBy' });
Country.belongsTo(User, { foreignKey: 'created_by', as: 'CountryCreated' });
Country.belongsTo(User, { foreignKey: 'updated_by', as: 'CountryUpdated' });

module.exports = Averageemployee;


