import agentRepository from './agent.repository';
import { CreateAgentDto } from 'src/agent/dto/create-agent.dto';
import { UpdateAgentDto } from 'src/agent/dto/update-agent.dto';

export class AgentService {
  async createAgent(data: CreateAgentDto) {
    return await agentRepository.create(data);
  }

  async getAgentById(id: number) {
    return await agentRepository.findById(id);
  }

  async getPatientsByAgentId(agentId: number) {
    const agent = await agentRepository.getAgentWithPatients(agentId);
    return agent ? agent.patients : null;
  }


  async updateAgent(id: number, data: UpdateAgentDto) {
    return await agentRepository.updateById(id, data);
  }

  async deleteAgent(id: number) {
    return await agentRepository.deleteById(id);
  }

  async getAllAgents() {
    return await agentRepository.findAll();
  }
}
