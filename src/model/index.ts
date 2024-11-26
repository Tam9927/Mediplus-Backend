import Doctor from "./doctor.model";
import Patient from "./patient.model";


Doctor.hasMany(Patient, { foreignKey: 'doctor_id', as: 'patients' });
Patient.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

export { Doctor, Patient }; 