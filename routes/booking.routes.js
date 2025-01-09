import express from 'express';
const router = express.Router();
import {
  BookUtsav,
  BookGuestUtsav,
  ViewBookings
} from '../controllers/booking.controller.js';
import CatchAsync from '../utils/CatchAsync.js';

router.get('/view', CatchAsync(ViewBookings));
router.post('/self', CatchAsync(BookUtsav));
router.post('/guest', CatchAsync(BookGuestUtsav));

export default router;
