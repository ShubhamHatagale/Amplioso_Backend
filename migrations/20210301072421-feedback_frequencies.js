'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('feedback_frequencies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      feedback_frequencies: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      feedback_rounds: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {         // id from User would be referenced here
        //   model: 'User',
        //   key: 'id'
        // }
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {         // id from User would be referenced here
        //   model: 'User',
        //   key: 'id'
        // }
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

    });

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('feedback_frequencies');

  }
};
