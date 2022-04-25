const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./companies.model');
const Role = require('./roles.model');

// module.exports = (sequelize, Sequelize) => {

const User = sequelize.define('users', {
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
    date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    date_of_joining: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: true
    },
    designation: {
        type: Sequelize.CHAR,
        allowNull: true
    },
    role: {/**id from role would be referenced here */
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: Role,
        //     key: 'id',
        // }
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //     model: Company,
        //     key: 'id',
        // }
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    mobile_no: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.CHAR,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // resetpasswordtoken: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
    // tokendate: {
    //     type: Sequelize.DATE,
    //     allowNull: true
    // },    
    created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_on: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
User.belongsTo(Role, { foreignKey: 'role', as: 'UserRole' })

module.exports = User;




