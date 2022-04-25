const { INTEGER, ENUM } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/users.model');

const Coupon = sequelize.define('coupons', {
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
        type: ENUM('Single', 'Multiple'),
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
        references: {
            model: User,
            key: 'id',
        }
    },
    created_on: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
        type: Sequelize.BOOLEAN,
        defaultValue: '0',
        allowNull: false
    },
}, {
    freezeTableName: true
});
Coupon.belongsTo(User, { foreignKey: 'created_by', as: 'CouponCreated' });
Coupon.belongsTo(User, { foreignKey: 'updated_by', as: 'CouponUpdated' });

module.exports = Coupon;


