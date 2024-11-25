import Doctor from '../model/doctor.model';
import Patient from 'src/model/patient.model';


class DoctorRepository {
  // Create a new doctor record
  async create(data: any) {
    console.log('Creating doctor with data in repository:', data); // Log incoming data
    const doctor = await Doctor.create(data);
    console.log('Doctor created in repository:', doctor); // Log the created record
    return doctor;
  }

  // Find a doctor by ID
  async findById(id: number) {
    return await Doctor.findByPk(id, { include: { all: true } }); // Include associations (e.g., patients)
  }

  async findByIdWithPatients(doctorId: number) {
    return Doctor.findOne({
      where: { id: doctorId },
      include: [{ model: Patient, as: 'patients' }],
    });
  }
  

  // Update doctor record by ID
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

  // Get all doctor records
  async findAll() {
    return await Doctor.findAll({ include: { all: true } }); // Include associated patients if any
  }
}

export default new DoctorRepository();
