// import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
// import { PatientCreateFailedException,PatientDeleteFailedException,PatientNotFoundException,PatientUpdateFailedException } from 'src/exception/patient.exception';
// //import {PatientService} from './patient.service';
// import {PatientService} from "./patient.service"
// import { CreatePatientDto } from 'src/dto/create-patient.dto';
// import { ValidationPipe } from '@nestjs/common';
// import { UpdatePatientDto } from 'src/dto/update-patient.dto';

// @Controller('patients')
// export class PatientController {
//   constructor(private readonly patientService: PatientService) {}  //as it is class now, no typeof needed



// @Post()
// async createPatient(@Body(new ValidationPipe()) data: CreatePatientDto) {
      
//     try {
//       const patient = await this.patientService.createPatient(data);
//       // Log the created patient
//       return {
//         message: 'Patient created successfully',
//         patient,
//       };
//     } catch (error) {
      
//       throw new PatientCreateFailedException()
      
//     }
//   }
  

//   @Get(':id')
//   async getPatient(@Param('id') id: number) {
//     return await this.patientService.getPatientById(id);
//   }

//   @Get()
//   async getAllPatients() {
//     return await this.patientService.getAllPatients();
//   }

//   @Patch(':id')
//   async updatePatient(@Param('id') id: number, @Body(new ValidationPipe()) data: UpdatePatientDto) {
//     return await this.patientService.updatePatient(id, data);
//   }

//   @Delete(':id')
//   async deletePatient(@Param('id') id: number) {
//     return await this.patientService.deletePatient(id);
//   }
// }


import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import {
  PatientCreateFailedException,
  PatientNotFoundException,
  PatientUpdateFailedException,
  PatientDeleteFailedException,
} from 'src/exception/patient.exception';
import { PatientService } from './patient.service';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/dto/update-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(@Body(new ValidationPipe()) data: CreatePatientDto) {
    try {
      const patient = await this.patientService.createPatient(data);
      if (!patient) {
        throw new PatientCreateFailedException();
      }
      return {
        message: 'Patient created successfully',
        patient,
      };
    } catch (error) {
      throw new PatientCreateFailedException();
    } ;
    }

  @Get(':id')
  async getPatient(@Param('id') id: number) {
    try {
      const patient = await this.patientService.getPatientById(id);
      return patient;
    } catch (error) {
      throw new PatientNotFoundException(id);
    }
  }


  @Get()
  async getAllPatients() {
    try {
      return await this.patientService.getAllPatients();
    } catch (error) {
      throw new PatientCreateFailedException();
    }
  }

  @Patch(':id')
  async updatePatient(
    @Param('id') id: number,
    @Body(new ValidationPipe()) data: UpdatePatientDto,
  ) {
    try {
      const updatedPatient = await this.patientService.updatePatient(id, data);
      return {
        message: 'Patient updated successfully',
        updatedPatient,
      };
    } catch (error) {
      throw new PatientUpdateFailedException(id);
    }
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: number) {
    try {
      await this.patientService.deletePatient(id);
      return {
        message: 'Patient deleted successfully',
      };
    } catch (error) {
      throw new PatientDeleteFailedException(id);
    }
  }
}
