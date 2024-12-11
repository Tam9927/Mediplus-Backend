

import { Test, TestRequest, TestRequestTest,Doctor,CenterBalanceSheet } from '../model';
  
class TestRequestRepository {
 
  async createTestRequest(data: { 
    doctorId: number; 
    patientId: number; 
    Status: string; 
    remarks?: string; 
  }) {        
    return await TestRequest.create(data);
  }

  /**
   * Bulk creates TestRequestTest entries to link TestRequests with Tests.
   * @param testAssociations - The array of associations (testRequestId and testId).
   */
  async createTestAssociations(testAssociations: { testRequestId: number; testId: number }[]) {
    return await TestRequestTest.bulkCreate(testAssociations);
  }


  

  async findById(id: number) {
    return await TestRequest.findByPk(id, {
      include: [{ model: Test, as: 'tests' }],
    });
  }

  async findByIdWithTests(id: number) {
    return await TestRequest.findByPk(id, {
      include: [{ model: Test, as: 'tests' }],
    });  
  }

  async updateDoctorIncome(doctorId: number, income: number) {
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) throw new Error('Doctor not found.');
  
    doctor.dataValues.totalIncome = (doctor.dataValues.totalIncome || 0) + income;
    await doctor.save();
  }

  async updateCenterIncome(amount: number) {
    const center = await CenterBalanceSheet.findOne();
    if (!center) throw new Error('Center balance sheet not found.');
  
    center.dataValues.totalIncome = (center.dataValues.totalIncome || 0) + amount;
    await center.save();
  }
     
  

  async findAll() {
    return await TestRequest.findAll({  
      include: [{ model: Test, as: 'tests' }],
    });
  }
}

export default new TestRequestRepository();
  