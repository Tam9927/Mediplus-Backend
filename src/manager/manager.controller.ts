import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ValidationPipe } from '@nestjs/common';
import { ManagerAlreadyExistsException, ManagerAuthenticationFailedException } from 'src/exception/manager.exception';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('register')  
  async register(@Body(new ValidationPipe()) data) {
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
  async login(@Body(new ValidationPipe()) { username, password }) {
    try {
      const manager = await this.managerService.login(username, password);
      return { success: true, message: 'Login successful', data: manager };
    } catch (error) {
      throw new ManagerAuthenticationFailedException(username);
    }
  }

  @Patch(':id/password')
  async changePassword(@Param('id') id, @Body('newPassword') newPassword) {
    try {
      const updatedManager = await this.managerService.changePassword(id, newPassword);
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
