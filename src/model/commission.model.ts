import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';
import {Doctor,Agent} from './index'

class Commission extends Model {
  public id!: number;
  public targetType!: 'Doctor' | 'Agent';
  public doctorId!: number | null;
  public agentId!: number | null;
  //public targetId!: number; 
  public percentage!: number; // Commission percentage
  public duration!: 'Daily' | 'Monthly';
}

Commission.init(
  {
    id: {  
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    targetType: {
      type: DataTypes.ENUM('Doctor', 'Agent'),
      allowNull: false,
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Doctor,
          key: 'id',
        },
      },
      agentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Agent,
          key: 'id',
        },
      },

    duration: {
      type: DataTypes.ENUM('Daily', 'Monthly'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Commission',
    timestamps: true,
  }
);

export default Commission;

