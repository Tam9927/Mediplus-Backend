import { 
    Controller, 
    Get, 
    Post, 
    Param, 
    Body, 
    Patch, 
    Delete, 
  } from '@nestjs/common';
  import { DoctorService } from './doctor.service';
  import { CreateDoctorDto } from './dto/create-doctor.dto';
  import { UpdateDoctorDto } from './dto/update-doctor.dto';
  import {
    DoctorNotFoundException,
    DoctorUpdateFailedException,
    DoctorCreateFailedException,
    DoctorDeleteFailedException,
  } from '../exception/doctor.exception';
  import { ValidationPipe } from '@nestjs/common';
  
  @Controller('doctors')
  export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}
  
    @Post()
    async createDoctor(@Body(new ValidationPipe()) data: CreateDoctorDto) {
      try{
        const doctor = await this.doctorService.createDoctor(data);
      if (!doctor) {
        throw new DoctorCreateFailedException('Duplicate entry/ not more than 2 doctors in one specialization');                            //will work on the error handling ehre
      }
      return {
        success: true,
        message: 'Doctor created successfully',
        data: doctor,
      };
     } catch(error){
           throw new DoctorCreateFailedException(error.message);
     }
    }
  
    @Get(':id')
    async getDoctor(@Param('id') id: number) {
      try{
           const doctor = await this.doctorService.getDoctorById(id);
       if (!doctor) {
        throw new DoctorNotFoundException(id);
      }
      return {
        success: true,
        data: doctor,
      };
    } catch(error){
        throw new DoctorNotFoundException(id);
    }
    }
  
    @Get()
    async getAllDoctors() {
        
        const doctors = await this.doctorService.getAllDoctors();
      return {
        success: true,
        data: doctors,
      };
    }
  
    @Get(':id/patients')
    async getPatientsByDoctorId(@Param('id') doctorId: number) {
      try{
        
        const patients = await this.doctorService.getPatientsByDoctorId(doctorId);
      if (!patients) {
        throw new DoctorNotFoundException(doctorId);
      }
      return {
        success: true,
        data: patients,
      };
    } catch(error)
    {
       throw new DoctorNotFoundException(doctorId);
    }
    }
  
    @Patch(':id')
    async updateDoctor(
      @Param('id') id: number,
      @Body(new ValidationPipe()) data: UpdateDoctorDto,
    ) {
    
    try{
        const updatedDoctor = await this.doctorService.updateDoctor(id, data);
      if (!updatedDoctor) {
        throw new DoctorUpdateFailedException(id);
      }
      return {
        success: true,
        message: 'Doctor updated successfully',
        data: updatedDoctor,
      };
    } catch(error)
    {
        throw new DoctorUpdateFailedException(id);
    }
    }

  
    @Delete(':id')
    async deleteDoctor(@Param('id') id: number) {
      try{
        
        const deleted = await this.doctorService.deleteDoctor(id);
      if (!deleted) {
        throw new DoctorDeleteFailedException(id,'Doctor Not Found');
      }
      return {
        success: true,
        message: 'Doctor deleted successfully',
      };
    }catch(error)
    {
        throw new DoctorDeleteFailedException(id,error.message);;
    }
    }
  }
  


