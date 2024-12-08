


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
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/patient/dto/update-patient.dto';

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
      if (!patient) {
        throw new PatientNotFoundException(id);
      }
      return patient;
    } catch (error) {
      throw new PatientNotFoundException(id);
    }
  }


  @Get()
  async getAllPatients() {
    try {
      const patients=await this.patientService.getAllPatients();
      if (!patients) {
        return {message:'No patients exist'};
      }

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
      if (!updatedPatient) {
        throw new PatientUpdateFailedException(id);
      }
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
      const deletedPatient =await this.patientService.deletePatient(id);
      if (!deletedPatient) {
        throw new PatientDeleteFailedException(id);
      }
      return {
        message: 'Patient deleted successfully',
      };
    } catch (error) {
      throw new PatientDeleteFailedException(id);
    }
  }
}
