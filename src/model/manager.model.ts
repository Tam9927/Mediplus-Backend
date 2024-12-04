import { Model,DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';
const bcrypt = require('bcrypt')
    
class Manager extends Model {
  
   id?: number; // Optional because Sequelize will generate it
   username: string;
   password: string;


}



Manager.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {       
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
  },     
  {
    sequelize,  
    modelName: 'Manager',
    tableName: 'managers',
    // hooks: {
    //   beforeCreate: async (manager) => {
    //     manager.password = await bcrypt.hash(manager.password, 10);
    //   },
    //   beforeUpdate: async (manager) => {
    //     if (manager.changed('password')) {
    //       manager.password = await bcrypt.hash(manager.password, 10);
    //     }
    //   },
    // },
  }
);  

export default Manager;
  