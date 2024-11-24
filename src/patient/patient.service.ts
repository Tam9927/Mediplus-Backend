

import patientRepository from './patient.reporitory';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
//import { PatientRepository } from './patient.reporitory';

export class PatientService {
//   async createPatient(data: any) {
//     // Add business logic if needed before creating a patient
//     const patient= patientRepository.create(data);
//     console.log(patient);
//     return await patient;
//   }

async createPatient(data: CreatePatientDto) {
    console.log('Creating patient with data in service:', data);  // Log the incoming data
    const patient = await patientRepository.create(data);
    console.log('Patient created in service:', patient);  // Log the created patient
    return patient;
  }

  async getPatientById(id: number) {
    const patient = await patientRepository.findById(id);
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient;
  }

  async updatePatient(id: number, data: any) {
    const updatedPatient = await patientRepository.updateById(id, data);
    if (!updatedPatient) {
      throw new Error('Patient not found or update failed');
    }
    return updatedPatient;
  }

//   async deletePatient(id: number) {
//     const deleted = await patientRepository.deleteById(id);
//     if (!deleted) {
//       throw new Error('Patient not found or delete failed');
//     }
//     return deleted;
//   }


async deletePatient(id: number) {

    const deleted = await patientRepository.deleteById(id);
        if (deleted===null) {
          throw new Error('Patient not found or delete failed');
        }
        return deleted;
  }



  async getAllPatients() {
    return await patientRepository.findAll();
  }
}

//export default new PatientService();  //singleton eexport
