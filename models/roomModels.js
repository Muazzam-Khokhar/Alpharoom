import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    maxCount: {
        type: Number,
        require: true,
    },
    phoneNumber: {
        type: Number,
        require: true,
    },
    rentPerDay: {
        type: Number,
        require: true,
    },
    imageUrls: [],
    currentBookings: [],
    type: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    }

}, {
    timeStamps: true,
})

const Room = mongoose.model('rooms', roomSchema)

export default  Room