
import "./model/index"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Doctor from './model/doctor.model';
import Patient from './model/patient.model';
//import sequelize = require("./database/sequelize")
//const sequelize = require('./database/sequelize'); 
import sequelize from "./database/sequelize";

async function bootstrap() { 
  // Create the NestJS app
  const app = await NestFactory.create(AppModule);

  

  await app.listen(process.env.PORT ?? 3000); 
  
  
  
  console.log(Doctor.associations);
  console.log(Patient.associations);
  

}

bootstrap(); 

