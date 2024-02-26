// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_server', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
