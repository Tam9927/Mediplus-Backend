
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { CommissionService } from './commission.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import {
  CommissionCreateFailedException,
  CommissionUpdateFailedException,
  CommissionNotFoundException,
  CommissionDeleteFailedException,
} from '../exception/commission.exception';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('commissions') // Swagger Tag
@Controller('commissions')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new commission' })
  @ApiBody({ type: CreateCommissionDto, description: 'Commission creation payload' })
  @ApiResponse({ status: 201, description: 'Commission created successfully' })
  @ApiResponse({ status: 400, description: 'Commission creation failed' })
  async createCommission(@Body(new ValidationPipe()) data: CreateCommissionDto) {
    try {
      const commission = await this.commissionService.createCommission(data);
      return {
        success: true,
        message: 'Commission created successfully',
        data: commission,
      };
    } catch (error) {
      if (error instanceof CommissionCreateFailedException) {
        throw new CommissionCreateFailedException(error.message);
      }
      throw error;
    }
  }

  @Get('doctor/:doctorId')
  @ApiOperation({ summary: 'Get commissions for a specific doctor' })
  @ApiParam({ name: 'doctorId', description: 'ID of the doctor', type: Number })
  @ApiResponse({ status: 200, description: 'Commissions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Commissions not found for the doctor' })
  async getDoctorCommissions(@Param('doctorId') doctorId: number) {
    try {
      const commissions = await this.commissionService.getCommissionsByDoctor(doctorId);
      if (commissions.length === 0) {
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
  @ApiOperation({ summary: 'Get commissions for a specific agent' })
  @ApiParam({ name: 'agentId', description: 'ID of the agent', type: Number })
  @ApiResponse({ status: 200, description: 'Commissions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Commissions not found for the agent' })
  async getAgentCommissions(@Param('agentId') agentId: number) {
    try {
      const commissions = await this.commissionService.getCommissionsByAgent(agentId);
      if (commissions.length === 0) {
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
  @ApiOperation({ summary: 'Update a commission' })
  @ApiParam({ name: 'id', description: 'ID of the commission to update', type: Number })
  @ApiBody({ type: UpdateCommissionDto, description: 'Commission update payload' })
  @ApiResponse({ status: 200, description: 'Commission updated successfully' })
  @ApiResponse({ status: 400, description: 'Commission update failed' })
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
  @ApiOperation({ summary: 'Delete a commission' })
  @ApiParam({ name: 'id', description: 'ID of the commission to delete', type: Number })
  @ApiResponse({ status: 200, description: 'Commission deleted successfully' })
  @ApiResponse({ status: 400, description: 'Commission deletion failed' })
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
  @ApiOperation({ summary: 'Retrieve all commissions' })
  @ApiResponse({ status: 200, description: 'All commissions retrieved successfully' })
  async getAllCommissions() {
    const commissions = await this.commissionService.getAllCommissions();
    return {
      success: true,
      data: commissions,
    };
  }
}
   