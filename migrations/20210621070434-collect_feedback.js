'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('collect_feedback', {
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
        //   model: 'Employee',
        //   key: 'id'
        // }
      },
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {         // id from Manager would be referenced here
        //   model: 'Manager',
        //   key: 'id'
        // }
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'Company',
        //   key: 'id',
        // }
      },
      role: {
        /**id from role would be referenced here */
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'Role',
        //   key: 'id',
        // }
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
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('collect_feedback');

  }
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
};
