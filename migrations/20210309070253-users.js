'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {

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
            date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            date_of_joining: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            gender: {
                type: Sequelize.ENUM('Male', 'Female'),
                allowNull: true
            },
            designation: {
                type: Sequelize.CHAR,
                allowNull: false
            },
            role: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {       /**id from role would be referenced here */
                    model: 'Role',
                    key: 'id'
                }
            },
            company_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {         // id from user would be referenced here
                //     model: 'Companies',
                //     key: 'id'
                // }
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            mobile_no: {
                type: Sequelize.STRING,
                allowNull: false
            },
            user_email: {
                type: Sequelize.STRING,
                allowNull: false
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
            },
            created_on: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            updated_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        return queryInterface.dropTable('users');

    }
};
