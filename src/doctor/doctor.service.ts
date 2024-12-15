

import doctorRepository from './doctor.repository';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/doctor/dto/update-doctor.dto';
import { paginate,PaginationParams} from 'src/utils/paginationUtils';

export class DoctorService {
  async createDoctor(data: CreateDoctorDto) {
    const doctorCount = await doctorRepository.countBySpecialization(data.specialization);
    if (doctorCount >= 2) {
      return null; // Indicating the operation is invalid
    }   
    return await doctorRepository.create(data);
  }

  async getDoctorById(id: number) {
    return await doctorRepository.findById(id);
  }

  async getPatientsByDoctorId(doctorId: number) {
    const doctor = await doctorRepository.getDoctorWithPatients(doctorId);
    return doctor ? doctor.patients : null;
  }

  async updateDoctor(id: number, data: UpdateDoctorDto) {
    return await doctorRepository.updateById(id, data);
  }

  async deleteDoctor(id: number) {
    return await doctorRepository.deleteById(id);
  }

  // async getAllDoctors() {
  //   return await doctorRepository.findAll();
  // }

  async getAllDoctors(query: PaginationParams) {
    return await paginate(() => doctorRepository.findAndPaginate({}), query);
  }
  
  


// async getAllDoctors(query: PaginationParams) {
//     return await paginate(doctorRepository, query, {
//       include: { all: true }, // Include associated models (e.g., patients)
//     });
//   }
}  
