import asyncHandler from 'express-async-handler';
import Room from '../models/roomModels.js';

const getRooms = asyncHandler(async(req,res)=> {
    const rooms = await Room.find({})
    res.json(rooms)
})

const getRoomById = asyncHandler(async(req,res)=> {
    const room = await Room.findById(req.params.id)
    if(room) {
        res.json(room)
    } else {
        res.status(404);
        throw new Error('Room not found');
    }
})

const addRoom = asyncHandler(async(req,res)=> {
    try {
        const newRoom = new Room(req.body)
        console.log(newRoom)
        await newRoom.save();
        res.send('Room Add Successfully')
    } catch (error) {
        res.status(400).json("IM getting this error",error)

    }
})

export {getRooms, getRoomById, addRoom}