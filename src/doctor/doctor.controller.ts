// import { 
//     Controller, 
//     Get, 
//     Post, 
//     Param, 
//     Body, 
//     Patch, 
//     Delete,
//     Query 
//   } from '@nestjs/common';
//   import { DoctorService } from './doctor.service';
//   import { CreateDoctorDto } from './dto/create-doctor.dto';
//   import { UpdateDoctorDto } from './dto/update-doctor.dto';
//   import {
//     DoctorNotFoundException,
//     DoctorUpdateFailedException,
//     DoctorCreateFailedException,
//     DoctorDeleteFailedException,
//   } from '../exception/doctor.exception';
//   import { ValidationPipe } from '@nestjs/common';
//   import { paginate,PaginationParams } from 'src/utils/paginationUtils';
//   import doctorRepository from './doctor.repository';
  
//   @Controller('doctors')
//   export class DoctorController {
//     constructor(private readonly doctorService: DoctorService) {}
  
//     @Post()
//     async createDoctor(@Body(new ValidationPipe()) data: CreateDoctorDto) {
//       try{
//         const doctor = await this.doctorService.createDoctor(data);
//       if (!doctor) {
//         throw new DoctorCreateFailedException('Duplicate entry/ not more than 2 doctors in one specialization');                            //will work on the error handling ehre
//       }
//       return {
//         success: true,
//         message: 'Doctor created successfully',
//         data: doctor,
//       };
//      } catch(error){
//            throw new DoctorCreateFailedException(error.message);
//      }
//     }
  
//     @Get(':id')
//     async getDoctor(@Param('id') id: number) {
//       try{
//            const doctor = await this.doctorService.getDoctorById(id);
//        if (!doctor) {
//         throw new DoctorNotFoundException(id);
//       }
//       return {
//         success: true,
//         data: doctor,
//       };
//     } catch(error){
//         throw new DoctorNotFoundException(id);
//     }
//     }
  
//     // @Get()
//     // async getAllDoctors() {
        
//     //     const doctors = await this.doctorService.getAllDoctors();
//     //   return {
//     //     success: true,
//     //     data: doctors,
//     //   };
//     // }

//     @Get()
//   async getAllDoctors(@Query() query: PaginationParams) {  
//     const doctors = await this.doctorService.getAllDoctors(query);
//     return {
//       success: true,
//       data: doctors.data,
//       meta: doctors.meta,
//     };
//   }


  
    
  
  
//     @Get(':id/patients')
//     async getPatientsByDoctorId(@Param('id') doctorId: number) {
//       try{
        
//         const patients = await this.doctorService.getPatientsByDoctorId(doctorId);
//       if (!patients) {
//         throw new DoctorNotFoundException(doctorId);
//       }
//       return {
//         success: true,
//         data: patients,
//       };
//     } catch(error)
//     {
//        throw new DoctorNotFoundException(doctorId);
//     }
//     }
  
//     @Patch(':id')
//     async updateDoctor(
//       @Param('id') id: number,
//       @Body(new ValidationPipe()) data: UpdateDoctorDto,
//     ) {
    
//     try{
//         const updatedDoctor = await this.doctorService.updateDoctor(id, data);
//       if (!updatedDoctor) {
//         throw new DoctorUpdateFailedException(id);
//       }
//       return {
//         success: true,
//         message: 'Doctor updated successfully',
//         data: updatedDoctor,
//       };
//     } catch(error)
//     {
//         throw new DoctorUpdateFailedException(id);
//     }
//     }

  
//     @Delete(':id')
//     async deleteDoctor(@Param('id') id: number) {
//       try{
        
//         const deleted = await this.doctorService.deleteDoctor(id);
//       if (!deleted) {
//         throw new DoctorDeleteFailedException(id,'Doctor Not Found');
//       }
//       return {
//         success: true,
//         message: 'Doctor deleted successfully',
//       };
//     }catch(error)
//     {
//         throw new DoctorDeleteFailedException(id,error.message);;
//     }
//     }
//   }
  


import { 
  Controller, 
  Get, 
  Post, 
  Param, 
  Body, 
  Patch, 
  Delete, 
  Query 
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { 
  DoctorNotFoundException, 
  DoctorUpdateFailedException, 
  DoctorCreateFailedException, 
  DoctorDeleteFailedException 
} from '../exception/doctor.exception';
import { ValidationPipe } from '@nestjs/common';
import { paginate, PaginationParams } from 'src/utils/paginationUtils';
import doctorRepository from './doctor.repository';

@ApiTags('Doctors') // Grouping all doctor-related API routes
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiBody({ type: CreateDoctorDto })  // Body content type
  @ApiResponse({ status: 201, description: 'Doctor created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request / Validation errors' })
  async createDoctor(@Body(new ValidationPipe()) data: CreateDoctorDto) {
    try {
      const doctor = await this.doctorService.createDoctor(data);
      if (!doctor) {
        throw new DoctorCreateFailedException('Duplicate entry or not more than 2 doctors in one specialization');
      }
      return {
        success: true,
        message: 'Doctor created successfully',
        data: doctor,
      };
    } catch (error) {
      throw new DoctorCreateFailedException(error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a doctor by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Doctor ID' })  // Parameter description
  @ApiResponse({ status: 200, description: 'Successfully retrieved doctor.' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async getDoctor(@Param('id') id: number) {
    try {
      const doctor = await this.doctorService.getDoctorById(id);
      if (!doctor) {
        throw new DoctorNotFoundException(id);
      }
      return {
        success: true,
        data: doctor,
      };
    } catch (error) {
      throw new DoctorNotFoundException(id);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors with pagination' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all doctors.' })
  async getAllDoctors(@Query() query: PaginationParams) {
    const doctors = await this.doctorService.getAllDoctors(query);
    return {
      success: true,
      data: doctors.data,
      meta: doctors.meta,
    };
  }

  @Get(':id/patients')
  @ApiOperation({ summary: 'Get patients by doctor ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Doctor ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved patients for the doctor.' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async getPatientsByDoctorId(@Param('id') doctorId: number) {
    try {
      const patients = await this.doctorService.getPatientsByDoctorId(doctorId);
      if (!patients) {
        throw new DoctorNotFoundException(doctorId);
      }
      return {
        success: true,
        data: patients,
      };
    } catch (error) {
      throw new DoctorNotFoundException(doctorId);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update doctor by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Doctor ID' })
  @ApiBody({ type: UpdateDoctorDto })  // Request body for updates
  @ApiResponse({ status: 200, description: 'Successfully updated doctor.' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiResponse({ status: 400, description: 'Update failed' })
  async updateDoctor(
    @Param('id') id: number,
    @Body(new ValidationPipe()) data: UpdateDoctorDto,
  ) {
    try {
      const updatedDoctor = await this.doctorService.updateDoctor(id, data);
      if (!updatedDoctor) {
        throw new DoctorUpdateFailedException(id);
      }
      return {
        success: true,
        message: 'Doctor updated successfully',
        data: updatedDoctor,
      };
    } catch (error) {
      throw new DoctorUpdateFailedException(id);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a doctor by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Doctor ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted doctor.' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async deleteDoctor(@Param('id') id: number) {
    try {
      const deleted = await this.doctorService.deleteDoctor(id);
      if (!deleted) {
        throw new DoctorDeleteFailedException(id, 'Doctor not found');
      }
      return {
        success: true,
        message: 'Doctor deleted successfully',
      };
    } catch (error) {
      throw new DoctorDeleteFailedException(id, error.message);
    }
  }
}
