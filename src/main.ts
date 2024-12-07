
import "./model/index"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Commission, Test, TestCategory,TestRequest,TestRequestTest } from "./model/index";
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
  console.log(TestRequestTest.associations)    
  

}

bootstrap(); 

