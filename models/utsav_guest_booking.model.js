import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import {
  STATUS_CONFIRMED,
  STATUS_CANCELLED,
  TRAVEL_MODE_OTHER,
  TRAVEL_MODE_SELF_CAR,
  TRAVEL_MODE_RAJ_PRAVAS,
  STATUS_PAYMENT_PENDING
} from '../config/constants.js';

const UtsavGuestBooking = sequelize.define(
  'UtsavGuestBooking',
  {
    bookingid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    mobno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    packageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utsav_packages_db',
        key: 'id'
      }
    },
    guest_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guest_mobno: {
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
      allowNull: false,
      values: [STATUS_CONFIRMED, STATUS_CANCELLED, STATUS_PAYMENT_PENDING]
    }
  },
  {
    tableName: 'utsav_guest_booking',
    timestamps: true
  }
);

export default UtsavGuestBooking;
