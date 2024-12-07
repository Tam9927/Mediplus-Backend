import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';
import TestRequest from './testRequest.model';
import Test from './test.model';

class TestRequestTest extends Model {}

TestRequestTest.init(
  {
    testRequestId: {
      type: DataTypes.INTEGER,
      references: {
        model: TestRequest,
        key: 'id',
      },
    },
    testId: {
      type: DataTypes.INTEGER,
      references: {
        model: Test,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'TestRequestTest',
    tableName: 'test_request_tests',
  }

);

export default TestRequestTest;  