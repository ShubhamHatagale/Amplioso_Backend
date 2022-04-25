const { INTEGER, ENUM } = require('sequelize');
const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const User =require('../models/users.model');

const Employee=sequelize.define('employee_strengths',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    number_of_employee:{
        type:Sequelize.CHAR,
        allowNull:false,
    },
    status:{
        type:ENUM('Active','Inactive'),
        allowNull:false
    },
    created_by:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    created_on:{
        type:Sequelize.DATE,
        allowNull:true,
    },
    updated_by:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    updated_on:{
        type:Sequelize.DATE,
        allowNull:true,
    },
    is_deleted:{
        type:Sequelize.BOOLEAN,
        defaultValue:'0',
        allowNull:false
    },   
},{
    freezeTableName:true
});
Employee.belongsTo(User,{foreignKey:'created_by',as:'EmployeeCreated'});
Employee.belongsTo(User,{foreignKey:'updated_by',as:'EmployeeUpdated'});

module.exports=Employee;


