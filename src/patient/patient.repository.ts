import Patient from '../model/patient.model';

export class PatientRepository {
//   async create(data: any) {
//     const patient= Patient.create(data);
//     return await patient;
//   }

async create(data: any) {
    console.log('Creating patient with data in repository:', data);  // Log the incoming data
    const patient = await Patient.create(data);
    console.log('Patient created in repository:', patient);  // Log the result
    return patient;
  }

  async findById(id: number) {
    return await Patient.findByPk(id);
  }

  async updateById(id: number, data: any) {
    const patient = await this.findById(id);
    if (patient) {
      return await patient.update(data);
    }
    return null;
  }

async deleteById(id: number): Promise<number> {
    return await Patient.destroy({ where: { id } });
  }
  
  

  async findAll() {
    return await Patient.findAll();
  }
}

export default new PatientRepository();
