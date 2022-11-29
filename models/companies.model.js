const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model');
const Role = require('./roles.model');
const FeedBack = require('./feedback_frequencies.model');
const Compensation = require('./average_employee.model');
const Sector = require('./sectors.model');
const Package = require('./package.model');
const Countries = require('./countries.model');
const Managers = require('./managers.model');
const EmployeeStrength = require('./employee_strength.model');

const Company = sequelize.define('companies', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    company_logo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    first_name: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    comapany_headquaters: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Countries,
            key: 'id',
        }
    },
    date_of_inception: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    number_of_employee: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: EmployeeStrength,
            key: 'id',
        }
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Role,
            key: 'id',
        }
    },
    business_sector: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Sector,
            key: 'id',
        }
    },
    average_employee_compansation: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Compensation,
            key: 'id',
        }
    },
    feedback_frequency: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: FeedBack,
            key: 'id',
        }
    },
    current_package: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Package,
            key: 'id',
        }
    },
    username: {
        type: Sequelize.CHAR,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
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
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '0',
        allowNull: false
    },
    paymt_sts: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '0',
        allowNull: false
    }
}, {
    freezeTableName: true
});
User.belongsTo(Company, { foreignKey: 'company_id', constraints: false })
Company.belongsTo(Role, { foreignKey: 'role', as: 'CompanyRole' });
Company.belongsTo(User, { foreignKey: 'created_by', as: 'CompanyCreated' });
Company.belongsTo(User, { foreignKey: 'updated_by', as: 'CompanyUpdated' });
Company.belongsTo(EmployeeStrength, { foreignKey: 'number_of_employee', as: 'CompanyStrength' });
Company.belongsTo(Sector, { foreignKey: 'business_sector', as: 'CompanySector' });
Company.belongsTo(FeedBack, { foreignKey: 'feedback_frequency', as: 'CompanyFeedback' });
Company.belongsTo(Compensation, { foreignKey: 'average_employee_compansation', as: 'CompanyCompensation' });
Company.belongsTo(Package, { foreignKey: 'current_package', as: 'CompanyPackage' });

Managers.belongsTo(Company, { foreignKey: 'company_id', as: 'ManagerCompanyId', constraints: false })
Managers.belongsTo(Company, { foreignKey: 'created_by', as: 'ManagerCreated', constraints: false })
Managers.belongsTo(Company, { foreignKey: 'updated_by', as: 'ManagerUpdated', constraints: false })
Role.belongsTo(User, { foreignKey: 'created_by', as: 'RoleCreated', constraints: false });
Role.belongsTo(User, { foreignKey: 'updated_by', as: 'RoleUpdated', constraints: false });
module.exports = Company;



