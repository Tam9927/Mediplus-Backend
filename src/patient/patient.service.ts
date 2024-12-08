//export default new PatientService()

// import patientRepository from './patient.repository';
// import { CreatePatientDto } from 'src/dto/create-patient.dto';
// import { UpdatePatientDto } from 'src/dto/update-patient.dto';
// import { PatientNotFoundException, PatientUpdateFailedException, PatientCreateFailedException, PatientDeleteFailedException } from '../exception/patient.exception';

// export class PatientService {
  

//   async createPatient(data: CreatePatientDto) {
//     try {
//       const patient = await patientRepository.create(data);
//       if (!patient) {
//         throw new PatientCreateFailedException();
//       }
//       return patient;
//     } catch (error) {
//       throw new PatientCreateFailedException();
//     }
//    }

//   async getPatientById(id: number) {
//     const patient = await patientRepository.findById(id);
//     if (!patient) {
//       throw new PatientNotFoundException(id); // Use the custom exception here
//     }
//     return patient;
//   }

//   async updatePatient(id: number, data: UpdatePatientDto) {
//     const updatedPatient = await patientRepository.updateById(id, data);
//     if (!updatedPatient) {
//       throw new PatientUpdateFailedException(id); // Use the custom exception here
//     }
//     return updatedPatient;
//   }

//   async deletePatient(id: number) {
//     const deleted = await patientRepository.deleteById(id);
//     if (!deleted) {
//       throw new PatientDeleteFailedException(id); // Use the custom exception here
//     }
//     return { message: 'Patient deleted successfully' };
//   }

//   async getAllPatients() {
//     return await patientRepository.findAll();
//   }
// }

import patientRepository from './patient.repository';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/patient/dto/update-patient.dto';

export class PatientService {
  async createPatient(data: CreatePatientDto) {
    return await patientRepository.create(data);
  }

  async getPatientById(id: number) {
    return await patientRepository.findById(id);
  }

  async updatePatient(id: number, data: UpdatePatientDto) {
    return await patientRepository.updateById(id, data);
  }

  async deletePatient(id: number) {
    return await patientRepository.deleteById(id);
  }

  async getAllPatients() {
    return await patientRepository.findAll();
  }
}


