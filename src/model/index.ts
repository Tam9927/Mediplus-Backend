import Doctor from "./doctor.model";
import Patient from "./patient.model";
import Agent from "./agent.model";
import Manager from "./manager.model";
import Commission from "./commission.model";


Doctor.hasMany(Patient, { foreignKey: 'doctor_id', as: 'patients',onDelete: 'SET NULL' });
Patient.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' ,onDelete: 'SET NULL'});

Agent.hasMany(Patient, { foreignKey: 'agent_id', as: 'patients' });
Patient.belongsTo(Agent, { foreignKey: 'agent_id', as: 'agent' });


Doctor.hasMany(Commission, { foreignKey: 'doctorId', scope: { targetType: 'Doctor' } });
Agent.hasMany(Commission, { foreignKey: 'agentId',  scope: { targetType: 'Agent' } });

Commission.belongsTo(Doctor, { foreignKey: 'doctorId',targetKey: 'id' });
Commission.belongsTo(Agent, { foreignKey: 'agentId',targetKey: 'id'});   




export { Doctor, Patient, Agent, Manager, Commission };                                         //database migrations in the fututre

