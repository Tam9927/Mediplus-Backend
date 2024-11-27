import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';
import Patient from './patient.model'; 

class Agent extends Model {
  public id!: number;
  public name!: string;
  public contact!: string;
  public affiliation!: string;
  public patients?: Patient[];
}

Agent.init(
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
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Agent',
    timestamps: true,
  }
);

export default Agent;
