'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      coupon_name: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      coupon_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      package: {
        type: Sequelize.ENUM('Single', 'Multiple'),
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
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
    return queryInterface.dropTable('coupons');

  }
};
