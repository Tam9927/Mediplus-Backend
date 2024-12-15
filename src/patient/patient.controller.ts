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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Patients') // Group your API routes under 'Patients'
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'Patient created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed or bad request' })
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
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiParam({ name: 'id', description: 'ID of the patient', type: Number })
  @ApiResponse({ status: 200, description: 'Patient retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
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
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'Patients retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No patients found' })
  async getAllPatients() {
    try {
      const patients = await this.patientService.getAllPatients();
      if (!patients) {
        return { message: 'No patients exist' };
      }
      return patients;
    } catch (error) {
      throw new PatientCreateFailedException();
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient by ID' })
  @ApiParam({ name: 'id', description: 'ID of the patient', type: Number })
  @ApiResponse({ status: 200, description: 'Patient updated successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
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
  @ApiOperation({ summary: 'Delete a patient by ID' })
  @ApiParam({ name: 'id', description: 'ID of the patient', type: Number })
  @ApiResponse({ status: 200, description: 'Patient deleted successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async deletePatient(@Param('id') id: number) {
    try {
      const deletedPatient = await this.patientService.deletePatient(id);
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
