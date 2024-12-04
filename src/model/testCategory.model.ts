import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

class TestCategory extends Model {}

TestCategory.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'TestCategory',
  tableName: 'test_categories',
});

export default TestCategory;   
