

// import patientRepository from './patient.repository';
// import { CreatePatientDto } from 'src/dto/create-patient.dto';
// import { UpdatePatientDto } from 'src/dto/update-patient.dto';

// export class PatientService {

// async createPatient(data: CreatePatientDto) {
//     console.log('Creating patient with data in service:', data);  // Log the incoming data
//     const patient = await patientRepository.create(data);
//     console.log('Patient created in service:', patient);  // Log the created patient
//     return patient;
//   }

//   async getPatientById(id: number) {
//     const patient = await patientRepository.findById(id);
//     if (!patient) {
//       throw new Error('Patient not found');
//     }
//     return patient;
//   }

//   async updatePatient(id: number, data: UpdatePatientDto) {
//     const updatedPatient = await patientRepository.updateById(id, data);
//     if (!updatedPatient) {
//       throw new Error('Patient not found or update failed');
//     }
//     return updatedPatient;
//   }

// //   async deletePatient(id: number) {
// //     const deleted = await patientRepository.deleteById(id);
// //     if (!deleted) {
// //       throw new Error('Patient not found or delete failed');
// //     }
// //     return deleted;
// //   }


// async deletePatient(id: number) {

//     const deleted = await patientRepository.deleteById(id);
//         if (deleted===null) {
//           throw new Error('Patient not found or delete failed');
//         }
//         return deleted;
//   }



//   async getAllPatients() {
//     return await patientRepository.findAll();
//   }
// }

// //export default new PatientService();  //singleton eexport

import patientRepository from './patient.repository';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/dto/update-patient.dto';
import { PatientNotFoundException, PatientUpdateFailedException, PatientCreateFailedException, PatientDeleteFailedException } from '../exception/patient.exception';

export class PatientService {
  

  async createPatient(data: CreatePatientDto) {
    try {
      const patient = await patientRepository.create(data);
      if (!patient) {
        throw new PatientCreateFailedException();
      }
      return patient;
    } catch (error) {
      throw new PatientCreateFailedException();
    }
   }

  async getPatientById(id: number) {
    const patient = await patientRepository.findById(id);
    if (!patient) {
      throw new PatientNotFoundException(id); // Use the custom exception here
    }
    return patient;
  }

  async updatePatient(id: number, data: UpdatePatientDto) {
    const updatedPatient = await patientRepository.updateById(id, data);
    if (!updatedPatient) {
      throw new PatientUpdateFailedException(id); // Use the custom exception here
    }
    return updatedPatient;
  }

  async deletePatient(id: number) {
    const deleted = await patientRepository.deleteById(id);
    if (!deleted) {
      throw new PatientDeleteFailedException(id); // Use the custom exception here
    }
    return { message: 'Patient deleted successfully' };
  }

  async getAllPatients() {
    return await patientRepository.findAll();
  }
}
