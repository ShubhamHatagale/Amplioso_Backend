const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./companies.model');
const Role = require('./roles.model');


const Managers = sequelize.define('managers', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: Company,
        //     key: 'id',
        // }
    },
    user_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     model: Company,
        //     key: 'id',
        // }
    },
    role: {
        /**id from role would be referenced here */
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: Role,
        //     key: 'id',
        // }
    },
    created_on: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     model: Company,
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

Managers.belongsTo(Role, { foreignKey: 'role', as: 'ViewRole' });
module.exports = Managers;