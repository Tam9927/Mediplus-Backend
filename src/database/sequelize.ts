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


async function authenticateAndSync() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync models with the database
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

authenticateAndSync();

sequelize.sync({force:true}).then(() => {
  console.log('Database synced');
});


//module.exports = {sequelize};
export default sequelize;