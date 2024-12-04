
import "./model/index"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 import Doctor from './model/doctor.model';
import Patient from './model/patient.model';
import Agent from './model/agent.model';
import { Commission, Test, TestCategory } from "./model/index";
import TestRequest from "./model/testRequest.model";
//const sequelize = require('./database/sequelize'); 

async function bootstrap() { 
  // Create the NestJS app
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000); 
  
    
  
  // console.log(Doctor.associations);    
  // console.log(Patient.associations); 
  // console.log(Agent.associations);
  // console.log(Commission.associations)
  console.log(Test.associations);
  console.log(TestCategory.associations)
  console.log(TestRequest.associations)
  

}

bootstrap(); 

