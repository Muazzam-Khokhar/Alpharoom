import asyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';
import moment from 'moment'
import Room from '../models/roomModels.js';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe('sk_test_51NFv7oDOUReDh0bmjETpnSkw3tBO2KEAHVSeIJhKV9Fp9dd7HNVgnAEWzXgyGDDWVbYD0ggDZSBJa6gleLN2qnIq00qB9Y7rbU')

const addBookingRoom = asyncHandler(async (req, res) => {
    const {
        room,
        userId,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        token,
    } = req.body;


    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        })

        const payment = await stripe.charges.create(
            {
                amount: totalAmount * 100,
                customer: customer.id,
                currency: 'USD',
                receipt_email: token.email,
            }, {
            idempotencyKey: uuidv4()
        }

        )
        res.send('Payment Successfull, Your room is booked')
        if (payment) {

                const newBooking = new Booking({
                    room: room.name,
                    roomId: room._id,
                    userId,
                    fromDate: moment(fromDate).format('MM-DD-YYYY'),
                    toDate: moment(toDate).format('MM-DD-YYYY'),
                    totalAmount,
                    totalDays,
                    transactionId: '123456',
                })
                const booking = await newBooking.save()

                const tempRoom = await Room.findOne({ _id: room._id })

                tempRoom.currentBookings.push({
                    bookingId: booking._id,
                    fromDate: moment(fromDate).format('MM-DD-YYYY'),
                    toDate: moment(toDate).format('MM-DD-YYYY'),
                    userId: userId,
                    status: booking.status,
                })
                await tempRoom.save();
                res.send('Room Added Successfully')
        }
    } catch (error) {
        res.status(error)
    }


})

const getBookingByUserId = asyncHandler(async(req,res)=> {
    const userId = req.body.userId

    try {
        const booking = await Booking.find({userId : userId})
        res.send(booking)
    } catch (error) {
        res.status(400).json({error})
    }
})

const cancelBooking = asyncHandler(async(req,res)=> {
    const { bookingId, roomId } = req.body
    try {
        const bookingitem = await Booking.findOne({_id: bookingId})
        
        bookingitem.status = 'cancelled'
        await bookingitem.save()
        const room = await Room.findOne({_id: roomId})
        
        const bookings = room.currentBookings
        
        const temp = bookings.filter(booking => booking.bookingId.toString() !== bookingId);
        room.currentBookings = temp
        await room.save();
        console.log("This is temp", temp)

        res.send("Your booking cancelled successfully")
    } catch (error) {
        res.send("this error occuring")
    }
})

export { addBookingRoom, getBookingByUserId, cancelBooking }