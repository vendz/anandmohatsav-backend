import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import {
  STATUS_CONFIRMED,
  STATUS_CANCELLED,
  STATUS_PAYMENT_PENDING,
  TRAVEL_MODE_OTHER,
  TRAVEL_MODE_SELF_CAR,
  TRAVEL_MODE_RAJ_PRAVAS
} from '../config/constants.js';

const UtsavBooking = sequelize.define(
  'UtsavBooking',
  {
    bookingid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    packageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utsav_packages_db',
        key: 'id'
      }
    },
    mobno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    travel_mode: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [TRAVEL_MODE_OTHER, TRAVEL_MODE_SELF_CAR, TRAVEL_MODE_RAJ_PRAVAS]
    },
    car_number_plate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: [STATUS_CONFIRMED, STATUS_CANCELLED, STATUS_PAYMENT_PENDING]
    }
  },
  {
    tableName: 'utsav_booking',
    timestamps: true
  }
);

export default UtsavBooking;
