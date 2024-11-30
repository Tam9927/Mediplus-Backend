import Doctor from "./doctor.model";
import Patient from "./patient.model";
import Agent from "./agent.model";
import Commission from "./commission.model";    


Doctor.hasMany(Patient, { foreignKey: 'doctor_id', as: 'patients',onDelete: 'SET NULL' });
Patient.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' ,onDelete: 'SET NULL'});

Agent.hasMany(Patient, { foreignKey: 'agent_id', as: 'patients' });
Patient.belongsTo(Agent, { foreignKey: 'agent_id', as: 'agent' });


Doctor.hasMany(Commission, { foreignKey: 'doctorId', scope: { targetType: 'Doctor' } });
Agent.hasMany(Commission, { foreignKey: 'agentId',  scope: { targetType: 'Agent' } });

Commission.belongsTo(Doctor, { foreignKey: 'doctorId',targetKey: 'id' });
Commission.belongsTo(Agent, { foreignKey: 'agentId',targetKey: 'id'});     


// Patient.hasMany(Payment, { foreignKey: 'patientId', as: 'payments' });
// Payment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

// Doctor.hasMany(Payment, { foreignKey: 'doctorId', as: 'doctorPayments' });
// Payment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
  
// Agent.hasMany(Payment, { foreignKey: 'agentId', as: 'agentPayments' });
// Payment.belongsTo(Agent, { foreignKey: 'agentId', as: 'agent' });




export { Doctor, Patient, Agent, Commission };                                           //database migrations in the fututre

