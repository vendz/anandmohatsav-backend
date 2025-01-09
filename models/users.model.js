import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserDb = sequelize.define(
  'UserDb',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cardno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    issuedto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['M', 'F']
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    mobno: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    centre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'users'
  }
);

export default UserDb;
