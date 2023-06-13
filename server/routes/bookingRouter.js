import express from 'express';
import bookingController from '../controllers/bookingController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',authMiddleware, bookingController.getAllBookings);
router.get('/:id',authMiddleware, bookingController.getBookingById);
router.post('/',authMiddleware, bookingController.createBooking);
router.put('/:id',authMiddleware, bookingController.updateBooking);
router.delete('/:id',authMiddleware, bookingController.deleteBooking);
router.get('/user/:userId',authMiddleware, bookingController.getBookingsByUserId);
router.post('/check',authMiddleware,bookingController.checkBooking);

export default router;
