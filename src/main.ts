
import "./model/index"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Commission, Test, TestCategory,TestRequest,TestRequestTest } from "./model/index";
//const sequelize = require('./database/sequelize'); 
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() { 
  // Create the NestJS app
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  
  
  const config = new DocumentBuilder()
    .setTitle('Mediplus API Title')  // Add your API title
    .setDescription('API documentation Mediplus')  // Add a description  
    .setVersion('1.0')  // Set version
    .addBearerAuth()  // Optional, if you're using Bearer token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);  

  // Enable Swagger UI at /api-docs
  SwaggerModule.setup('api-docs', app, document);
  
  
  
  await app.listen(process.env.PORT ?? 3000); 
  
  console.log(Test.associations);
  console.log(TestCategory.associations)
  console.log(TestRequest.associations)
  console.log(TestRequestTest.associations)    
  

}

bootstrap(); 

