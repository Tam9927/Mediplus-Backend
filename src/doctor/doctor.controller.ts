import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { ValidationPipe } from '@nestjs/common';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async createDoctor(@Body(new ValidationPipe()) data: CreateDoctorDto) {
    try {
      const doctor = await this.doctorService.createDoctor(data);
      return doctor;
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get(':id')
  async getDoctor(@Param('id') id: number) {
    return await this.doctorService.getDoctorById(id);
  }

  @Get()
  async getAllDoctors() {
    return await this.doctorService.getAllDoctors();
  }

  @Get(':id/patients')
async getPatientsByDoctorId(@Param('id') doctorId: number) {
  try {
    const patients = await this.doctorService.getPatientsByDoctorId(doctorId);
    return patients;
  } catch (error) {
    return { message: error.message };
  }
}


  @Patch(':id')
  async updateDoctor(@Param('id') id: number, @Body(new ValidationPipe()) data: UpdateDoctorDto) {
    return await this.doctorService.updateDoctor(id, data);
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: number) {
    return await this.doctorService.deleteDoctor(id);
  }
}


