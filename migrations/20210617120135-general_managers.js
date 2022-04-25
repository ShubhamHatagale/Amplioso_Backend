'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('general_managers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Manager",
        //   key: 'id',
        // }
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    down: async (queryInterface, Sequelize) => {
      return queryInterface.dropTable('general_managers');
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
    }
  }
};
