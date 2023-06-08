import express from 'express'
import { addBookingRoom, cancelBooking, getBookingByUserId } from '../controllers/bookingController.js'

const router = express.Router();

router.post('/bookroom',addBookingRoom)
router.post('/getbookingbyuserid', getBookingByUserId)
router.post('/cancelbooking', cancelBooking)

export default router