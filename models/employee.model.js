const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./companies.model');
const Manager = require('./managers.model');
const Countries = require('./countries.model');
const FeedBack = require('./feedback_frequencies.model');
const Role = require('./roles.model');

const Employee = sequelize.define('employee', {
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
    gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: true
    },
    status: {
        type: Sequelize.CHAR,
        allowNull: true
    },
    period_start: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    period_end: {
        type: Sequelize.DATE,
        allowNull: true,
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
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // id from user would be referenced here
            model: Company,
            key: 'id'
        }
    },
    manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // id from Manager would be referenced here
            model: Manager,
            key: 'id'
        }
    },
    feedback_frequency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: FeedBack,
            key: 'id',
        }
    },
    feedback_year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    feedback_month: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    best_classified: {
        type: Sequelize.ENUM('individual_contributer', 'team_or_business_leader'),
        allowNull: true
    },
    service_external_client: {
        type: Sequelize.ENUM('Yes', 'No'),
        allowNull: true
    },
    location: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // id from Countries would be referenced here
            model: Countries,
            key: 'id'
        }
    },
    working_presence: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    year_of_experience: {
        type: Sequelize.INTEGER,
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
Employee.belongsTo(Company, { foreignKey: 'company_id', as: 'CompanyId' });
Employee.belongsTo(Countries, { foreignKey: 'location', as: 'CountryId' });
Employee.belongsTo(Manager, { foreignKey: 'manager_id', as: 'ManagerId' });
Employee.belongsTo(FeedBack, { foreignKey: 'feedback_frequency', as: 'EmployeeFeedback' });
Employee.belongsTo(Role, { foreignKey: 'role', as: 'ViewRole' });
module.exports = Employee;




