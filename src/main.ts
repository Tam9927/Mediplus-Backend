
import "./model/index"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 import Doctor from './model/doctor.model';
import Patient from './model/patient.model';
import Agent from './model/agent.model';
import { Commission } from "./model/index";
//const sequelize = require('./database/sequelize'); 

async function bootstrap() { 
  // Create the NestJS app
  const app = await NestFactory.create(AppModule);

  

  await app.listen(process.env.PORT ?? 3000); 
  
  
  
  console.log(Doctor.associations);
  console.log(Patient.associations); 
  console.log(Agent.associations);
  console.log(Commission.associations)
  

}

bootstrap(); 

