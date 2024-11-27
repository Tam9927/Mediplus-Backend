// doctor.model.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize'; // Import sequelize instance first
import Doctor from './doctor.model';  // Import the Patient model after sequelize instance

class Patient extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public contact!: string;
  public doctor_id?: number;
  public agent_id?: number;
  public due_amount!: number;
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 120,
      },
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    due_amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Patient',
    timestamps: true,
  }
);


export default Patient;
