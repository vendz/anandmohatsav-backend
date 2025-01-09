import database from '../config/database.js';
import Sequelize from 'sequelize';
import ApiError from '../utils/ApiError.js';
import { v4 as uuidv4 } from 'uuid';
import {
  UtsavPackagesDb,
  UtsavBooking,
  transactions,
  UtsavGuestBooking
} from '../models/associations.js';
import {
  STATUS_CONFIRMED,
  STATUS_PAYMENT_PENDING,
  TYPE_GUEST_UTSAV,
  TYPE_UTSAV
} from '../config/constants.js';

export const ViewBookings = async (req, res) => {
  const { mobno } = req.query;

  const utsav_bookings = await database.query(
    `
    SELECT 
t1.bookingid,
t3.name AS package,
t3.start_date,
t3.end_date,
'Self' AS guest_name,
t1.mobno,
t1.travel_mode,
t1.car_number_plate,
t1.status AS booking_status,
t2.amount,
t2.status AS transaction_status
from utsav_booking t1
JOIN transactions t2 ON t1.bookingid = t2.bookingid
JOIN utsav_packages_db t3 ON t1.packageid = t3.id
WHERE t1.mobno = :mobno

UNION

SELECT 
t1.bookingid,
t3.name AS package,
t3.start_date,
t3.end_date,
t1.guest_name AS guest_name,
t1.guest_mobno AS mobno,
t1.travel_mode,
t1.car_number_plate,
t1.status AS booking_status,
t2.amount,
t2.status AS transaction_status
from utsav_guest_booking t1
JOIN transactions t2 ON t1.bookingid = t2.bookingid
JOIN utsav_packages_db t3 ON t1.packageid = t3.id
WHERE t1.mobno = :mobno;
    `,
    {
      replacements: { mobno: mobno },
      type: database.QueryTypes.SELECT,
      raw: true
    }
  );

  return res.status(200).send({
    message: 'Bookings fetched successfully',
    data: utsav_bookings
  });
};

export const BookUtsav = async (req, res) => {
  const { mobno, packageid, travel_mode, car_number_plate } = req.body;

  const t = await database.transaction();
  req.transaction = t;

  const utsav_package = await UtsavPackagesDb.findOne({
    where: {
      id: packageid
    }
  });

  if (utsav_package == undefined) {
    throw new ApiError(500, 'Utsav or package not found');
  }

  const isBooked = await UtsavBooking.findOne({
    where: {
      mobno: mobno,
      status: { [Sequelize.Op.in]: [STATUS_PAYMENT_PENDING, STATUS_CONFIRMED] }
    }
  });
  if (isBooked) {
    throw new ApiError(400, 'Already booked');
  }

  const utsav_booking = await UtsavBooking.create(
    {
      bookingid: uuidv4(),
      mobno: mobno,
      packageid: packageid,
      travel_mode: travel_mode,
      car_number_plate: car_number_plate,
      status: STATUS_PAYMENT_PENDING
    },
    { transaction: t }
  );

  const transactionID = uuidv4();
  const utsav_transaction = await transactions.create(
    {
      id: transactionID,
      mobno: mobno,
      bookingid: utsav_booking.dataValues.bookingid,
      category: TYPE_UTSAV,
      amount: utsav_package.dataValues.amount,
      status: STATUS_PAYMENT_PENDING
    },
    { transaction: t }
  );

  if (utsav_booking == undefined || utsav_transaction == undefined) {
    throw new ApiError(500, 'Failed to book utsav');
  }

  await t.commit();

  return res.status(200).send({
    message: 'Booking successful',
    data: { transaction_id: transactionID }
  });
};

export const BookGuestUtsav = async (req, res) => {
  const {
    mobno,
    packageid,
    guest_name,
    guest_mobno,
    travel_mode,
    car_number_plate
  } = req.body;

  const t = await database.transaction();
  req.transaction = t;

  const utsav_package = await UtsavPackagesDb.findOne({
    where: {
      id: packageid
    }
  });

  if (utsav_package == undefined) {
    throw new ApiError(500, 'Utsav or package not found');
  }

  const isBooked = await UtsavGuestBooking.findOne({
    where: {
      mobno: mobno,
      guest_name: guest_name,
      guest_mobno: guest_mobno,
      status: { [Sequelize.Op.in]: [STATUS_PAYMENT_PENDING, STATUS_CONFIRMED] }
    }
  });
  if (isBooked) {
    throw new ApiError(400, 'Already booked');
  }

  const utsav_booking = await UtsavGuestBooking.create(
    {
      bookingid: uuidv4(),
      mobno: mobno,
      packageid: packageid,
      guest_name: guest_name,
      guest_mobno: guest_mobno,
      travel_mode: travel_mode,
      car_number_plate: car_number_plate,
      status: STATUS_PAYMENT_PENDING
    },
    { transaction: t }
  );

  const transactionID = uuidv4();
  const utsav_transaction = await transactions.create(
    {
      id: transactionID,
      mobno: mobno,
      bookingid: utsav_booking.dataValues.bookingid,
      category: TYPE_GUEST_UTSAV,
      amount: utsav_package.dataValues.amount,
      status: STATUS_PAYMENT_PENDING
    },
    { transaction: t }
  );

  if (utsav_booking == undefined || utsav_transaction == undefined) {
    throw new ApiError(500, 'Failed to book utsav');
  }

  await t.commit();

  return res.status(200).send({
    message: 'Booking successful',
    data: { transaction_id: transactionID }
  });
};
