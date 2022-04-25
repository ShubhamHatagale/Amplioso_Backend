'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Role', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      role: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'User',
        //   key: 'id',
        // }
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'User',
        //   key: 'id',
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Role');

  }
};
