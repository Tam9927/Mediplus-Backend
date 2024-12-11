import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

class CenterBalanceSheet extends Model {}

CenterBalanceSheet.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  totalIncome: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  totalExpenses: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
}, {
  sequelize,
  modelName: 'CenterBalanceSheet',
  tableName: 'center_balance_sheets',
  hooks: {
    /**
     * Automatically update the balance whenever totalIncome or totalExpenses changes.
     */
    beforeSave: (instance) => {
      instance.dataValues.balance = instance.dataValues.totalIncome - instance.dataValues.totalExpenses;
    },
  },
});

export default CenterBalanceSheet;  
