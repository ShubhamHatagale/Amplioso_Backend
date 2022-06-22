const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./employee.model');
const Company = require('./companies.model');
const Manager = require('./managers.model');
const Role = require('./roles.model');

const Collect_feedback = sequelize.define('collect_feedback', {
    id: {
        type: Sequelize.BIGINT,
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
    user_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    recipient_role: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    period_start: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    period_end: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {         // id from Manager would be referenced here
        //     model: Employee,
        //     key: 'id'
        // }
    },
    manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {         // id from Manager would be referenced here
        //     model: Manager,
        //     key: 'id'
        // }
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Company,
            key: 'id',
        }
    },
    role: {
        /**id from role would be referenced here */
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Role,
            key: 'id',
        }
    },
    token: {
        type: Sequelize.CHAR,
        allowNull: true
    },
    status: {
        type: Sequelize.CHAR,
        allowNull: true
    },
    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: '0',
        allowNull: false
    },
}, {
    freezeTableName: true
});
// Collect_feedback.belongsTo(Company, { foreignKey: 'company_id', as: 'CFCompanyId' });
// Collect_feedback.belongsTo(Employee, { foreignKey: 'employee_id', as: 'CFEmployeeId' });
// Collect_feedback.belongsTo(Manager, { foreignKey: 'manager_id', as: 'CFManagerId' });
// Collect_feedback.belongsTo(Role, { foreignKey: 'role', as: 'ViewRole' });
module.exports = Collect_feedback;




