

import doctorRepository from './doctor.repository';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';

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

  async getAllDoctors() {
    return await doctorRepository.findAll();
  }
}
