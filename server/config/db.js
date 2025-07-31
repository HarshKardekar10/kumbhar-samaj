const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('kumbhar_community', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
