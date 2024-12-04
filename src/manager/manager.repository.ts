import { Manager } from '../model/index';

class ManagerRepository {
  async create(data: any) {
    return await Manager.create(data);
  }

  async findByUsername(username: string) {
    return await Manager.findOne({ where: { username } });
  }

  async findById(id: number) {
    return await Manager.findByPk(id);
  }

  async updatePassword(id: number, password: string) {
    const manager = await this.findById(id);
    if (manager) {
      manager.password = password;
      return await manager.save();
    }
    return null;
  }

  async findAllPasswords() {
    const managers = await Manager.findAll({ attributes: ['password'] });
    return managers.map((manager) => manager.password);
  }
}

export default new ManagerRepository();
