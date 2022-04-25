const Sequelize = require('sequelize').Sequelize;

require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_DATA, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  
});


module.exports = sequelize;
