const { INTEGER, ENUM } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/users.model');

const Sector = sequelize.define('sectors', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    sector_name: {
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
Sector.belongsTo(User, { foreignKey: 'created_by', as: 'SectorCreated' });
Sector.belongsTo(User, { foreignKey: 'updated_by', as: 'SectorUpdated' });
module.exports = Sector;


