

// import {Test,TestRequestTest,TestRequest} from '../model';

// class TestRequestRepository {
//   async create(data: any) {
//     const { doctorId, patientId, tests, status, remarks } = data;

//     const testRequest = await TestRequest.create(
//       { doctorId, patientId, status, remarks },
//       { include: { all: true } }
//     );

//     if (tests && Array.isArray(tests)) {
//       const testAssociations = tests.map(testId => ({ testRequestId: testRequest.dataValues.id, testId }));
//       await TestRequestTest.bulkCreate(testAssociations);
//     }

//     return testRequest;  
//   }

//   async findById(id: number) {
//     return await TestRequest.findByPk(id, {
//       include: [{ model: Test, as: 'tests' }],
//     });
//   }

//   async findAll() {
//     return await TestRequest.findAll({
//       include: [{ model: Test, as: 'tests' }],
//     });
//   }
// }

// export default new TestRequestRepository();


import { Test, TestRequest, TestRequestTest } from '../model';

class TestRequestRepository {
 
  async createTestRequest(data: { 
    doctorId: number; 
    patientId: number; 
    paymentStatus: string; 
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

  async findAll() {
    return await TestRequest.findAll({  
      include: [{ model: Test, as: 'tests' }],
    });
  }
}

export default new TestRequestRepository();
  