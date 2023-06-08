import express, { Router } from 'express'
import { 
    getRooms,
    getRoomById 
} from '../controllers/roomsController.js';

const router =express.Router()



router.route('/').get(getRooms)
router.route('/:id').get(getRoomById)

export default router


