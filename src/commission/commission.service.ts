import commissionRepository from './commission.repository';
import { CreateCommissionDto } from '../dto/create-commission.dto';
import { UpdateCommissionDto } from 'src/dto/update-commission.dto';
import {CommissionDeleteFailedException,CommissionUpdateFailedException,CommissionCreateFailedException } from 'src/exception/commission.exception';

export class CommissionService {
//   async createCommission(data: CreateCommissionDto) {
//     return await commissionRepository.create(data); 
//   }

// async createCommission(data: CreateCommissionDto) {
//     // Ensure only one of doctorId or agentId is provided
//     if (data.doctorId && data.agentId) {
//       throw new Error('Only one of doctorId or agentId must be provided.');
//     }
  
//     // Validate targetType with the corresponding ID
//     if (data.targetType === 'Doctor' && !data.doctorId) {
//       throw new Error('targetType "Doctor" requires a valid doctorId.');
//     }
  
//     if (data.targetType === 'Agent' && !data.agentId) {
//       throw new Error('targetType "Agent" requires a valid agentId.');
//     }
  
//     // Create the commission
//     return await commissionRepository.create(data);
//   }
  
async createCommission(data: CreateCommissionDto) {
    if (data.doctorId && data.agentId) {
      throw new CommissionCreateFailedException('Only one of doctorId or agentId must be provided.');
    }
  
    if (data.targetType === 'Doctor' && !data.doctorId) {
      throw new CommissionCreateFailedException('targetType "Doctor" requires a valid doctorId.');
    }
  
    if (data.targetType === 'Agent' && !data.agentId) {
      throw new CommissionCreateFailedException('targetType "Agent" requires a valid agentId.');
    }
  
    try {
      return await commissionRepository.create(data);
    } catch (error) {
      throw new CommissionCreateFailedException('Doctor / Agent does not exist');
    }
  }
  

  async getCommissionsByDoctor(doctorId: number) {
    return await commissionRepository.findByDoctor(doctorId);
  }

  async getCommissionsByAgent(agentId: number) {
    return await commissionRepository.findByAgent(agentId);
  }

  async updateCommission(id: number, data: UpdateCommissionDto) {
    const updated = await commissionRepository.updateById(id, data);
    if (!updated) {
      throw new CommissionUpdateFailedException(id,'Could not update commission/ Commission does not exist');   
    }
    return updated;
  }

  async deleteCommission(id: number) {
    const deleted = await commissionRepository.deleteById(id);
    if (!deleted) {
      throw new CommissionDeleteFailedException(id);
    }
    return true;
    }

    async getAllCommissions() {
        return await commissionRepository.findAll();
      }
}

