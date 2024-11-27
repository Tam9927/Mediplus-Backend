import { Agent, Patient } from "../model";

class AgentRepository {
  async create(data: any) {
    return await Agent.create(data);
  }

  async findById(id: number) {
    return await Agent.findByPk(id);
  }


  async getAgentWithPatients(doctorId: number) {
    try {
      const doctor = await Agent.findOne({
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
    const agent = await this.findById(id);
    if (agent) {
      return await agent.update(data);
    }
    return null;
  }

  async deleteById(id: number): Promise<number> {
    return await Agent.destroy({ where: { id } });
  }

  async findAll() {
    return await Agent.findAll();
  }
}

export default new AgentRepository();
