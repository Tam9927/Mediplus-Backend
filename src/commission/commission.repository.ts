import { Commission } from "../model";

class CommissionRepository {

   async create(data: any) {
    return await Commission.create(data);
  }

   async findByDoctor(doctorId: number) {
    return await Commission.findAll({
      where: { doctorId },
    });
  }

   async findByAgent(agentId: number) {
    return await Commission.findAll({
      where: { agentId },
    });
  }

  async updateById(id: number, data: any) {
    const commission = await Commission.findByPk(id);
    if (!commission) return null;
    return await commission.update(data);
  }

  async deleteById(id: number) {
    return await Commission.destroy({ where: { id } });
  }

   async findAll() {
    return await Commission.findAll();
  }
}

export default new CommissionRepository();
