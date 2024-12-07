


import { Injectable } from '@nestjs/common';
import testRequestRepository from './test-request.repository';
import { TestRequestDTO } from 'src/dto/test-request.dto';

@Injectable()
export class TestRequestService {
  /**
   * Handles the creation of a TestRequest along with its associated Tests.
   */
  async createRequest(data: TestRequestDTO) {
    const { doctorId, patientId, tests, paymentStatus} = data;
  
    // Step 1: Create the TestRequest
    const testRequest = await testRequestRepository.createTestRequest({
      doctorId,
      patientId,  
      paymentStatus,
    });
        
    // Step 2: Create Test associations
    if (tests && Array.isArray(tests)) {
      const testAssociations = tests.map(testId => ({
        testRequestId: testRequest.dataValues.id, // Use `testRequest.id` instead of `dataValues`
        testId,
      }));
      await testRequestRepository.createTestAssociations(testAssociations);
    }

    return testRequest;
  }


//   async processPayment(testRequestId: number) {
//     const testRequest = await testRequestRepository.findByIdWithTests(testRequestId);
//     if (!testRequest) throw new Error('TestRequest not found.');

//     // Calculate total payment
//     const totalCost = testRequest.dataValues.tests.reduce((sum, test) => sum + test.payment, 0);
  
//     // Update payment status to 'Paid'
//     testRequest.dataValues.paymentStatus = 'Paid';
//     await testRequest.save();

//     // Update doctor's total income
//     await testRequestRepository.updateDoctorIncome(testRequest.dataValues.doctorId, totalCost);

//     return { message: 'Payment processed successfully', totalCost };
//   }

  /**
   * Fetches a TestRequest by its ID along with associated Tests.
   */
  async getRequestById(id: number) {
    return await testRequestRepository.findById(id);
  }

  /**
   * Fetches all TestRequests along with associated Tests.
   */
  async getAllRequests() {
    return await testRequestRepository.findAll();
  }
}

