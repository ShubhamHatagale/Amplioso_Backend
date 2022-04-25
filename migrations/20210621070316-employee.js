'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('employee', {
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
        // references: {
        //   model: 'Role',
        //   key: 'id',
        // }
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {         // id from user would be referenced here
        //   model: 'Company',
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
      feedback_frequency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'FeedBack',
        //   key: 'id',
        // }
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
        // references: {         // id from Countries would be referenced here
        //   model: 'Countries',
        //   key: 'id'
        // }
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
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('employee');

  }
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
};
