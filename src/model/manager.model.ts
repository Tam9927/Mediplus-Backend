import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

class Manager extends Model {
  public id!: number;
  public username!: string;
  public password!: string; // Store the hashed password
}

Manager.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Username must be unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Manager',
    timestamps: true,
  }
);

export default Manager;
