import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
//import {PatientService} from './patient.service';
import {PatientService} from "./patient.service"

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}  //as it is class now, no typeof needed



//   async createPatient(@Body() data: any) {
//     try {
//       const patient = await this.patientService.createPatient(data);
//       return patient;  // Ensure patient is being returned after creation
//     } catch (error) {
//       return { message: error.message };
//     }
// }

// In the controller
@Post()
async createPatient(@Body() data: any) {
    console.log('Received data in controller:', data);  // Log the incoming request data
    try {
      const patient = await this.patientService.createPatient(data);
      console.log('Patient created:', patient);  // Log the created patient
      return patient;
    } catch (error) {
      console.error('Error in creating patient:', error);  // Log the error if it occurs
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
  async updatePatient(@Param('id') id: number, @Body() data: any) {
    return await this.patientService.updatePatient(id, data);
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: number) {
    return await this.patientService.deletePatient(id);
  }
}
