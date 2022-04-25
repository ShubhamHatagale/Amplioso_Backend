const { INTEGER, ENUM } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/users.model');
const Package = sequelize.define('packages', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    package_name: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    no_of_employees: {
        type: Sequelize.STRING,
        allowNull: false
    },
    actual_price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // start_date: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    // },
    // end_date: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    // },
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
Package.belongsTo(User, { foreignKey: 'created_by', as: 'PackageCreated' });
Package.belongsTo(User, { foreignKey: 'updated_by', as: 'PackageUpdated' });

module.exports = Package;


