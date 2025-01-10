import express from 'express';
const router = express.Router();
import {
  FetchGreetings,
  BookUtsav,
  BookGuestUtsav,
  ViewBookings,
  GenerateOrderId
} from '../controllers/booking.controller.js';
import CatchAsync from '../utils/CatchAsync.js';

router.get('/greetings', CatchAsync(FetchGreetings));
router.get('/view', CatchAsync(ViewBookings));
router.post('/self', CatchAsync(BookUtsav));
router.post('/guest', CatchAsync(BookGuestUtsav));
router.get('/order', CatchAsync(GenerateOrderId));

export default router;
