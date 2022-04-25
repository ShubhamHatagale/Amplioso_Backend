'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';    // add .trim()

const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

});
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.survey_answers = require('./survey_answers.model')(sequelize.DataTypes);
db.Options = require('./option.model')(sequelize.DataTypes);

db.survey_answers.hasOne(db.Options);
db.Options.belongsTo(db.survey_answers);

module.exports = db;
// "use strict";
// require('dotenv').config()
// const Sequelize = require("sequelize");
// const allmodel=require('../models');
// const sequelize = new Sequelize(process.env.DB_DATA, process.env.DB_USER, process.env.DB_PASS, {
//   dialect: 'mysql',
//   host: process.env.DB_HOST
// });


// const models = {
//   // Product: sequelize.import("./Product") // kindly import the model created in the same folder in this manner and import more models name been created
//   User:allmodel.users
//     //  User = require('./users.model')



// };

// Object.keys(models).forEach(modelName => {
//   if ("associate" in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;
// module.exports = models;