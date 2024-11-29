import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { CommissionService } from './commission.service';
  import { CreateCommissionDto } from '../dto/create-commission.dto';
  import { UpdateCommissionDto } from '../dto/update-commission.dto';
  import {
    CommissionCreateFailedException,
    CommissionUpdateFailedException,
    CommissionNotFoundException,
    CommissionDeleteFailedException,
  } from '../exception/commission.exception';
  import { ValidationPipe } from '@nestjs/common';
  
  @Controller('commissions')
  export class CommissionController {
    constructor(private readonly commissionService: CommissionService) {}
  
    @Post()
    async createCommission(@Body(new ValidationPipe()) data: CreateCommissionDto) {
      try {
        const commission = await this.commissionService.createCommission(data);
        // if (!commission) {
        //   throw new CommissionCreateFailedException();
        // }
        return {
          success: true, 
          message: 'Commission created successfully',
          data: commission,
        };
      } catch (error) {
        throw error
      }
    }
  
    @Get('doctor/:doctorId')
    async getDoctorCommissions(@Param('doctorId') doctorId: number) {
      try {
        const commissions = await this.commissionService.getCommissionsByDoctor(doctorId);
        if (!commissions) {
          throw new CommissionNotFoundException(doctorId);
        }
        return {
          success: true,
          data: commissions,
        };
      } catch (error) {
        throw new CommissionNotFoundException(doctorId);
      }
    }
  
    @Get('agent/:agentId')
    async getAgentCommissions(@Param('agentId') agentId: number) {
      try {
        const commissions = await this.commissionService.getCommissionsByAgent(agentId);
        if (!commissions) {
          throw new CommissionNotFoundException(agentId);
        }
        return {
          success: true,
          data: commissions,
        };
      } catch (error) {
        throw new CommissionNotFoundException(agentId);
      }
    }
  
    @Patch(':id')
    async updateCommission(
      @Param('id') id: number,
      @Body(new ValidationPipe()) data: UpdateCommissionDto,
    ) {
      try {
        const updatedCommission = await this.commissionService.updateCommission(id, data);
        if (!updatedCommission) {
          throw new CommissionUpdateFailedException(id);
        }
        return {
          success: true,
          message: 'Commission updated successfully',
          data: updatedCommission,
        };
      } catch (error) {
        throw new CommissionUpdateFailedException(id);
      }
    }
  
    @Delete(':id')
    async deleteCommission(@Param('id') id: number) {
      try {
        const deleted = await this.commissionService.deleteCommission(id);
        if (!deleted) {
          throw new CommissionDeleteFailedException(id);
        }
        return {
          success: true,
          message: 'Commission deleted successfully',
        };
      } catch (error) {
        throw new CommissionDeleteFailedException(id);
      }
    }
  
    @Get()
    async getAllCommissions() {
      const commissions = await this.commissionService.getAllCommissions();
      return {
        success: true,
        data: commissions,
      };
    }
  }
  