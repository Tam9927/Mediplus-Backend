import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';
import Doctor from './doctor.model';
import Patient from './patient.model';
import Test from './test.model';

class TestRequest extends Model {}

TestRequest.init({ 
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
      primaryKey: true,
    }, 
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
  
  paymentStatus: {
    type: DataTypes.ENUM('requested', 'Paid', 'Due'),
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
  