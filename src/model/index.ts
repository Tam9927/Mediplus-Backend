import Doctor from "./doctor.model";
import Patient from "./patient.model";
import Agent from "./agent.model";


Doctor.hasMany(Patient, { foreignKey: 'doctor_id', as: 'patients',onDelete: 'SET NULL' });
Patient.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' ,onDelete: 'SET NULL'});

Agent.hasMany(Patient, { foreignKey: 'agent_id', as: 'patients' });
Patient.belongsTo(Agent, { foreignKey: 'agent_id', as: 'agent' });

export { Doctor, Patient, Agent }; 