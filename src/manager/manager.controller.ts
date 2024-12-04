import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import {ManagerService} from './manager.service';
import { ValidationPipe } from '@nestjs/common';
import { ManagerAlreadyExistsException,ManagerAuthenticationFailedException } from 'src/exception/manager.exception';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService:ManagerService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) data) {
    const manager = await this.managerService.register(data);
    if (!manager) {
      throw new ManagerAlreadyExistsException(data.username);
    }
    return { success: true, message: 'Manager registered successfully', data: manager };
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) { username, password }) {
    const manager = await this.managerService.login(username, password);
    if (!manager) {   
      throw new ManagerAuthenticationFailedException(username);
    }
    return { success: true, message: 'Login successful', data: manager };
  }

  @Patch(':id/password')
  async changePassword(@Param('id') id, @Body('newPassword') newPassword) {
    const updatedManager = await this.managerService.changePassword(id, newPassword);
    if (updatedManager==null) {
      throw new Error(`Failed to update password for Manager ID: ${id}`);
    }
    return { success: true, message: 'Password updated successfully' };
  }
}

