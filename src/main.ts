

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import sequelize = require("./database/sequelize")
const sequelize = require('./database/sequelize'); 

async function bootstrap() { 
  // Create the NestJS app
  const app = await NestFactory.create(AppModule);

  // try {
  //   // Try to authenticate the connection
  //   await sequelize.authenticate();
  //   console.log('Database connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // 

  
  try {
    await sequelize.sync({ force: false });  // If you use { force: true }, it drops the tables each time
    console.log('Tables synced successfully');
  } catch (error) {
    console.error('Error syncing tables:', error);
  }
  
  // Start the app
  await app.listen(process.env.PORT ?? 3000); 


}

bootstrap(); 

