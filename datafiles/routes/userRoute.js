import express from 'express'
import { authUser , getAllUsers, registerUser } from "../controllers/usersController.js";


const router= express.Router();

router.post('/register',registerUser);
router.post('/login',authUser);
router.get('/getallusers', getAllUsers)

export default router