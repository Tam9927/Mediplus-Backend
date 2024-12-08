import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { AgentService } from './agent.service';
  import { CreateAgentDto } from './dto/create-agent.dto';
  import { UpdateAgentDto } from './dto/update-agent.dto';
  import {
    AgentNotFoundException,
    AgentUpdateFailedException,
    AgentCreateFailedException,
    AgentDeleteFailedException,
  } from '../exception/agent.exception';
  import { ValidationPipe } from '@nestjs/common';
  
  @Controller('agents')
  export class AgentController {
    constructor(private readonly agentService: AgentService) {}
  
    @Post()
    async createAgent(@Body(new ValidationPipe()) data: CreateAgentDto) {
      try {
        const agent = await this.agentService.createAgent(data);
        if (!agent) {
          throw new AgentCreateFailedException();
        }
        return {
          success: true,
          message: 'Agent created successfully',
          data: agent,
        };
      } catch (error) {
        throw new AgentCreateFailedException();;
      }
    }
  
    @Get(':id')
    async getAgent(@Param('id') id: number) {
      try {
        const agent = await this.agentService.getAgentById(id);
        if (!agent) {
          throw new AgentNotFoundException(id);
        }
        return {
          success: true,
          data: agent,
        };
      } catch (error) {
        throw new AgentNotFoundException(id);
      }
    }
  
    @Get()
    async getAllAgents() {
      try {
        const agents = await this.agentService.getAllAgents();
        return {
          success: true,
          data: agents,
        };
      } catch (error) {
        throw error;
      }
    }
  
    @Patch(':id')
    async updateAgent(
      @Param('id') id: number,
      @Body(new ValidationPipe()) data: UpdateAgentDto,
    ) {
      try {
        const updatedAgent = await this.agentService.updateAgent(id, data);
        if (!updatedAgent) {
          throw new AgentUpdateFailedException(id);
        }
        return {
          success: true,
          message: 'Agent updated successfully',
          data: updatedAgent,
        };
      } catch (error) {
        throw new AgentUpdateFailedException(id);
      }
    }
  
    @Delete(':id')
    async deleteAgent(@Param('id') id: number) {
      try {
        const deleted = await this.agentService.deleteAgent(id);
        if (!deleted) {
          throw new AgentDeleteFailedException(id);
        }
        return {
          success: true,
          message: 'Agent deleted successfully',
        };
      } catch (error) {
        throw new AgentDeleteFailedException(id);
      }
    }
  }
  