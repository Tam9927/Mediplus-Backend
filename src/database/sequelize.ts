import { Sequelize } from 'sequelize';



 const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1', // Your MySQL server address
  port: 3306,        // Your MySQL port (default is 3306)
  username: 'root',  // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'mediplus', // Replace with your database name
  logging: console.log,
});

try {
  // Try to authenticate the connection
  sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//module.exports = {sequelize};
export = sequelize;