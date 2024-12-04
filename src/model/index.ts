import Doctor from "./doctor.model";
import Patient from "./patient.model";
import Agent from "./agent.model";
import Commission from "./commission.model";
import Manager from "./manager.model"; 
import Test from "./test.model";   
import TestCategory from "./testCategory.model";
import TestRequest from "./testRequest.model";        
          

Doctor.hasMany(Patient, { foreignKey: 'doctor_id', as: 'patients',onDelete: 'SET NULL' });
Patient.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' ,onDelete: 'SET NULL'});

Agent.hasMany(Patient, { foreignKey: 'agent_id', as: 'patients' });
Patient.belongsTo(Agent, { foreignKey: 'agent_id', as: 'agent' });


Doctor.hasMany(Commission, { foreignKey: 'doctorId', scope: { targetType: 'Doctor' } });
Agent.hasMany(Commission, { foreignKey: 'agentId',  scope: { targetType: 'Agent' } });

Commission.belongsTo(Doctor, { foreignKey: 'doctorId',targetKey: 'id' });
Commission.belongsTo(Agent, { foreignKey: 'agentId',targetKey: 'id'});   

Test.belongsTo(TestCategory, { foreignKey: 'testCategoryId', as: 'testCategory' });
TestCategory.hasMany(Test, { foreignKey: 'testCategoryId', as: 'tests' });

Doctor.hasMany(TestRequest, { foreignKey: 'doctorId', as: 'testRequests' });
Patient.hasMany(TestRequest, { foreignKey: 'patientId', as: 'testRequests' });
Test.hasMany(TestRequest, { foreignKey: 'testId', as: 'testRequests' });

TestRequest.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
TestRequest.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
TestRequest.belongsTo(Test, { foreignKey: 'testId', as: 'test' });




export { Doctor, Patient, Agent, Commission, Manager, Test, TestCategory };                                           //database migrations in the fututre

