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

export {getRooms, getRoomById}