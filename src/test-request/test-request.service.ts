


import { Injectable } from '@nestjs/common';
import testRequestRepository from './test-request.repository';
import { TestRequestDTO } from 'src/test-request/dto/test-request.dto';
import { Doctor,Test,TestRequest,Patient } from 'src/model';

@Injectable()
export class TestRequestService {
  /**
   * Handles the creation of a TestRequest along with its associated Tests.
   */
  async createRequest(data: TestRequestDTO) {
    const { doctorId, patientId, tests, Status} = data;
  
    // Step 1: Create the TestRequest
    const testRequest = await testRequestRepository.createTestRequest({
      doctorId,  
      patientId,  
      Status,
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

    
async processPayment(testRequestId: number, paymentAmount: number) {
    // Fetch the test request with associated models
    const testRequest = await TestRequest.findByPk(testRequestId, {
      include: [
        { model: Test, as: 'tests' },
        { model: Doctor, as: 'doctor' },
        { model: Patient, as: 'patient' },
      ],
    });
  
    if (!testRequest) {
      throw new Error("Test request not found");
    }
  
    // Calculate the total cost of the tests associated with this test request
    const totalCost = testRequest.dataValues.tests.reduce((sum, test) => sum + test.cost, 0.0);
  
    // Retrieve the associated patient
    const patient = testRequest.dataValues.patient;
    if (!patient) {
      throw new Error("No patient associated with this test request");
    }
  
    // If it's the first payment (patient has no due amount), calculate the due amount
    if (patient.due_amount === 0) {
      // First payment, calculate remaining due from total cost
      let remainingDue = totalCost - paymentAmount;
  
      // Update the patient's due amount
      patient.due_amount = remainingDue > 0 ? remainingDue : 0; // If the remainingDue is negative, set due_amount to 0
    } else {
      let remainingDue = patient.due_amount - paymentAmount;
  
      if (remainingDue > 0) {
        patient.due_amount = remainingDue;
      } else {
        patient.due_amount = 0;
      }
    }
  
    // Save the updated patient data
    await patient.save();
  
    // Update the doctor's income with the payment amount received
    const doctor = testRequest.dataValues.doctor;
    if (doctor) {
      doctor.dailyIncome += paymentAmount;
      await doctor.save();
    }
  
    // Mark the test request as 'Paid' or 'Partially Paid' based on remaining due amount
    const testRequestStatus = patient.due_amount === 0 ? 'Paid' : 'Partially Paid';
    testRequest.dataValues.Status = testRequestStatus;
    await testRequest.save();
  
    // Return the payment status and relevant details
    return {
      message: 'Payment processed successfully',
      totalCost,
      paymentAmount,
      remainingDue: patient.due_amount,
      doctorIncome: doctor ? doctor.dailyIncome : null,
      testRequestStatus: testRequest.dataValues.status,
    };
  }
  

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

