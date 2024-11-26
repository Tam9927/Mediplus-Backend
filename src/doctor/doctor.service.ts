import doctorRepository from './doctor.repository';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';

import {
  DoctorNotFoundException,
  DoctorUpdateFailedException,
  DoctorCreateFailedException,
  DoctorDeleteFailedException,
} from '../exception/doctor.exception';  


export class DoctorService {                           //private readonly new doctorRepo:DoctorRepository if exported as a class, not an instance or singleton
  async createDoctor(data: CreateDoctorDto) {
    try {
      const doctor = await doctorRepository.create(data);
      if (!doctor) {
        throw new DoctorCreateFailedException();
      }
      return doctor;
    } catch (error) {
      throw new DoctorCreateFailedException();
    }
  }

  async getDoctorById(id: number) {
    const doctor = await doctorRepository.findById(id);
    if (!doctor) {
      throw new DoctorNotFoundException(id); // Use the custom exception here
    }
    return doctor;
  }

  async getPatientsByDoctorId(doctorId: number) {
    const doctor = await doctorRepository.getDoctorWithPatients(doctorId);
    if (doctor===null) {
      throw new DoctorNotFoundException(doctorId);
    }
    return doctor.patients;
  }
  

  async updateDoctor(id: number, data: UpdateDoctorDto) {
    const updatedDoctor = await doctorRepository.updateById(id, data);
    if (!updatedDoctor) {
      throw new DoctorUpdateFailedException(id); // Use the custom exception here
    }
    return updatedDoctor;
  }

  async deleteDoctor(id: number) {
    const deleted = await doctorRepository.deleteById(id);
    if (!deleted) {
      throw new DoctorDeleteFailedException(id); // Use the custom exception here
    }
    return { message: 'Doctor deleted successfully' };
  }

  async getAllDoctors() {
    return await doctorRepository.findAll();
  }
}
