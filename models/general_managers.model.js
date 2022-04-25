const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Manager = require('./managers.model');


const GeneralManagers = sequelize.define('general_managers', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Manager,
            key: 'id',
        }
    },
    reminder_setting_manager: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    notification_setting_menager: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    extension_survey_period: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: '0',
        allowNull: false
    }
}, {
    freezeTableName: true
});
GeneralManagers.belongsTo(Manager, { foreignKey: 'manager_id' });
module.exports = GeneralManagers;