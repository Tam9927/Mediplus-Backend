const sequelize = require('./sequelize');

(async () => {
  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  } finally {
    try {
      await sequelize.close();
      console.log('Connection closed successfully.');
    } catch (closeError) {
      console.error('Error closing the connection:', closeError.message);
    }
  }
})();

