import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize'; // Ensure the sequelize instance is exported from this file

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
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
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
