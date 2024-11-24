import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
//import {PatientService} from './patient.service';
import {PatientService} from "./patient.service"
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { ValidationPipe } from '@nestjs/common';
import { UpdatePatientDto } from 'src/dto/update-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}  //as it is class now, no typeof needed



// In the controller
@Post()
async createPatient(@Body(new ValidationPipe()) data: CreatePatientDto) {
      
    try {
      const patient = await this.patientService.createPatient(data);
      // Log the created patient
      return patient;
    } catch (error) {
      return { message: error.message };
    }
  }
  

  @Get(':id')
  async getPatient(@Param('id') id: number) {
    return await this.patientService.getPatientById(id);
  }

  @Get()
  async getAllPatients() {
    return await this.patientService.getAllPatients();
  }

  @Patch(':id')
  async updatePatient(@Param('id') id: number, @Body(new ValidationPipe()) data: UpdatePatientDto) {
    return await this.patientService.updatePatient(id, data);
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: number) {
    return await this.patientService.deletePatient(id);
  }
}
