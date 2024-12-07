import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';
import TestCategory from './testCategory.model';

class Test extends Model {}

Test.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  testCategoryId: {
    type: DataTypes.INTEGER,  
    allowNull: false,
    references: {
      model: TestCategory,
      key: 'id',
    },
  },

  payment: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Test',
  tableName: 'tests',
});


export default Test;  
