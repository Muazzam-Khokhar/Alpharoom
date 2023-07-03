import express, { Router } from 'express'
import { 
    getRooms,
    getRoomById, 
    addRoom
} from '../controllers/roomsController.js';

const router =express.Router()



router.route('/').get(getRooms)
router.route('/:id').get(getRoomById)
router.route('/addroom').post(addRoom)

export default router


