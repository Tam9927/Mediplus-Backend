
import { Controller, Post, Body, Param, Patch, ValidationPipe } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerAlreadyExistsException, ManagerAuthenticationFailedException } from 'src/exception/manager.exception';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateManagerDto } from './dto/create-manager.dto';
import { LoginManagerDto } from './dto/login-manager.dto';

@ApiTags('managers') // Tag for grouping in Swagger
@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new manager' })
  @ApiBody({ type: CreateManagerDto, description: 'Manager registration details' })
  @ApiResponse({ status: 201, description: 'Manager registered successfully', schema: { example: { success: true, message: 'Manager registered successfully', data: { id: 1, username: 'john_doe' } } } })
  @ApiResponse({ status: 400, description: 'Manager already exists' })
  async register(@Body(new ValidationPipe()) data: CreateManagerDto) {
    try {
      const manager = await this.managerService.register(data);
      return { success: true, message: 'Manager registered successfully', data: manager };
    } catch (error) {
      if (error.message.includes('already')) {
        throw new Error(error.message);
      }
      throw new ManagerAlreadyExistsException(data.username);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Manager login' })
  @ApiBody({ type: LoginManagerDto, description: 'Login credentials for the manager' })
  @ApiResponse({ status: 200, description: 'Login successful', schema: { example: { success: true, message: 'Login successful', data: { id: 1, username: 'john_doe', token: 'jwt-token-here' } } } })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  async login(@Body(new ValidationPipe()) data: LoginManagerDto) {
    try {
      const manager = await this.managerService.login(data.username, data.password);
      return { success: true, message: 'Login successful', data: manager };
    } catch (error) {
      throw new ManagerAuthenticationFailedException(data.username);
    }
  }

  @Patch(':id/password')
  @ApiOperation({ summary: 'Change manager password' })
  @ApiParam({ name: 'id', description: 'Manager ID', example: '123' })
  @ApiBody({ schema: { example: { newPassword: 'newPassword123' } }, description: 'New password for the manager' })
  @ApiResponse({ status: 200, description: 'Password updated successfully', schema: { example: { success: true, message: 'Password updated successfully' } } })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  async changePassword(@Param('id') id, @Body('newPassword') newPassword: string) {
    try {
      await this.managerService.changePassword(id, newPassword);
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
  