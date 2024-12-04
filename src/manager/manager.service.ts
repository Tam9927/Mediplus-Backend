import { Injectable } from '@nestjs/common';
import managerRepository from './manager.repository';
import { PasswordUtils } from '../utils/passwordUtils';

@Injectable()
export class ManagerService {
  async register(data: any) {
    const { username, password } = data;

    // Check for duplicate username
    const existingManager = await managerRepository.findByUsername(username);
    if (existingManager) {
      throw new Error('Username already taken.');
    }

    // Check for duplicate password
    const existingPasswords = await managerRepository.findAllPasswords();
    const isDuplicate = await PasswordUtils.isDuplicate(password, existingPasswords);
    if (isDuplicate) {
      throw new Error('Password already used by another manager.');
    }

    // Hash the password and save the manager
    const hashedPassword = await PasswordUtils.hashPassword(password);
    return await managerRepository.create({ ...data, password: hashedPassword });
  }

  async login(username: string, password: string) {
    const manager = await managerRepository.findByUsername(username);
    console.log(manager)
    if (!manager) throw new Error('Invalid username or password.');

    const isValidPassword = await PasswordUtils.verifyPassword(manager.password, password);
    console.log(isValidPassword)
    if (!isValidPassword) throw new Error('Invalid username or password.');

    return manager;
  }

  async changePassword(id: number, newPassword: string) {
    const existingPasswords = await managerRepository.findAllPasswords();

    // Ensure password is unique
    const isDuplicate = await PasswordUtils.isDuplicate(newPassword, existingPasswords);
    if (isDuplicate) {
      throw new Error('Password already used by another manager.');
    }

    // Hash and update the password
    const hashedPassword = await PasswordUtils.hashPassword(newPassword);
    return await managerRepository.updatePassword(id, hashedPassword);
  }
}

  
