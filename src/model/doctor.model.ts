


// @Entity('doctors')

//  Doctor {


import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize'; // Import sequelize instance first
import Patient from './patient.model';  // Import the Patient model after sequelize instance

class Doctor extends Model {
  public id!: number;
  public name!: string;
  public contact!: string;
  public specialization: string;
  public patients?: Patient[];

}

Doctor.init(
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
      unique: true
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    
  },
  {
    sequelize,
    modelName: 'Doctor',
    timestamps: true,
  }
);


export default Doctor;
