const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: '127.0.0.1',
  dialect: 'mysql', // Or 'postgres', 'sqlite', 'mssql' depending on your setup
  logging: false,   // Disable query logging
});

module.exports = sequelize;

