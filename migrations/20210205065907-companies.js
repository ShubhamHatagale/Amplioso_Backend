'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
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
        allowNull: false,
        // references: {
        //   model: 'Countries',
        //   key: 'id'
        // }
      },
      date_of_inception: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      number_of_employee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'EmployeeStrength',
        //   key: 'id',
        // }
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'Role',
        //   key: 'id',
        // }
      },
      business_sector: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {         // id from sector would be referenced here
        //   model: 'Sector',
        //   key: 'id'
        // }
      },
      average_employee_compansation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Compensation',
        //   key: 'id',
        // }
      },
      feedback_frequency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {         // id from Feedback frequncy would be referenced here
        //   model: 'feedback_frequencies',
        //   key: 'id'
        // }
      },
      current_package: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Package',
        //   key: 'id',
        // }
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
        // references: {         // id from user would be referenced here
        //   model: 'User',
        //   key: 'id'
        // }
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {         // id from user would be referenced here
        //   model: 'User',
        //   key: 'id'
        // }
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Companies');
  }
};
