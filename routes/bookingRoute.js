import express from 'express'
import { addBookingRoom, cancelBooking, getAllBookings, getBookingByUserId } from '../controllers/bookingController.js'

const router = express.Router();

router.post('/bookroom',addBookingRoom)
router.post('/getbookingbyuserid', getBookingByUserId)
router.post('/cancelbooking', cancelBooking)
router.get('/getallbookings', getAllBookings)

export default router