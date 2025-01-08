import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import {
  STATUS_PAYMENT_PENDING,
  STATUS_PAYMENT_COMPLETED,
  STATUS_CASH_PENDING,
  STATUS_CASH_COMPLETED,
  STATUS_CANCELLED,
  STATUS_ADMIN_CANCELLED,
  STATUS_CREDITED
} from '../config/constants.js';

const Transactions = sequelize.define(
  'Transactions',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    mobno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookingid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    upi_ref: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NA'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        STATUS_PAYMENT_PENDING,
        STATUS_PAYMENT_COMPLETED,
        STATUS_CASH_PENDING,
        STATUS_CASH_COMPLETED,
        STATUS_CANCELLED,
        STATUS_ADMIN_CANCELLED,
        STATUS_CREDITED
      ]
    }
  },
  {
    tableName: 'transactions',
    timestamps: true
  }
);

export default Transactions;
