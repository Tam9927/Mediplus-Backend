import agentRepository from './agent.repository';
import { CreateAgentDto } from 'src/dto/create-agent.dto';
import { UpdateAgentDto } from 'src/dto/update-agent.dto';

export class AgentService {
  async createAgent(data: CreateAgentDto) {
    return await agentRepository.create(data);
  }

  async getAgentById(id: number) {
    return await agentRepository.findById(id);
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
