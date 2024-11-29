// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AgentModule } from './agent/agent.module';
import { ManagerModule } from './manager/manager.module';
import { CommissionModule } from './commission/commission.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql', // or 'postgres', 'mssql', etc.
      host: 'localhost',
      port: 3306,
      username: 'root', // replace with your db username
      password: '', // replace with your db password
      database: 'mediplus', // replace with your db name
      autoLoadModels: true, // Automatically load models into Sequelize
      synchronize: true, // This will automatically sync the models to the database
    }),
    PatientModule,
    DoctorModule,
    AgentModule,
    ManagerModule,
    CommissionModule,
  ],
})
export class AppModule {} 