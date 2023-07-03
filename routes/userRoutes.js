import express from 'express';
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Route to get all users
router.get('/users', getAllUsers);

// Route to get a specific user by ID
router.get('/users/:id', getUserById);

// Route to create a new user
router.post('/users', addUser);

// Route to update a user
router.put('/users/:id', updateUser);

// Route to delete a user
router.delete('/users/:id', deleteUser);

export default router;
