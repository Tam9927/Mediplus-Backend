import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';
import Doctor from './doctor.model';
import Patient from './patient.model';
import Test from './test.model';

class TestRequest extends Model {}

TestRequest.init({
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id',
    },
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id',
    },
  },
  testId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Test,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('requested', 'approved', 'completed'),
    defaultValue: 'requested',
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'TestRequest',
  tableName: 'test_requests',
});



export default TestRequest;  
  