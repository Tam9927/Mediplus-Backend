import { Doctor, Patient } from '../model'; // Always use central index

//import Patient from '../model/patient.model';

class DoctorRepository {
  // Create a new doctor record
  async create(data: any) {
    
    const doctor = await Doctor.create(data);
    console.log('Doctor created in repository:', doctor); // Log the created record
    return doctor;
  }

  // Find a doctor by ID
  async findById(id: number) {
    return await Doctor.findByPk(id, { include: { all: true } }); // Include associations (e.g., patients)
  }
  

async getDoctorWithPatients(doctorId: number) {
    try {
      const doctor = await Doctor.findOne({    
        where: { id: doctorId },
        include: [{
          model: Patient,
          as: 'patients', // Alias used in the association
        }],
      });
  
      return doctor; // Either a Doctor instance or null
  
    } catch (error) {
      console.error('Error fetching doctor with patients:', error);
      return null; // Return null if there is an error
    }
  }
  

  async updateById(id: number, data: any) {
    const doctor = await this.findById(id);
    if (doctor) {
      return await doctor.update(data);
    }
    return null; // Return null if doctor is not found
  }

  // Delete a doctor record by ID
  async deleteById(id: number): Promise<number> {
    return await Doctor.destroy({ where: { id } });
  }

  // //Get all doctor records
  // async findAll() {
  //   return await Doctor.findAndCountAll({ include: { all: true } }); // Include associated patients if any
  // }

  async findAndPaginate(queryOptions: any) {
    console.log(queryOptions)
    return await Doctor.findAndCountAll({
      ...queryOptions,
      include: { all: true },  
    });
  }
    




  
  async countBySpecialization(specialization: string) {
    return await Doctor.count({ where: { specialization } });
  }
}

export default new DoctorRepository();
