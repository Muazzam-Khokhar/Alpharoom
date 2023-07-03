import express from 'express';
import {
  getAllTrucks,
  getTruckById,
  addTruck,
  updateTruck,
  deleteTruck
} from '../controllers/truckController.js';

const router = express.Router();

// Route to get all trucks
router.get('/trucks', getAllTrucks);

// Route to get a specific truck by ID
router.get('/trucks/:id', getTruckById);

// Route to add a new truck
router.post('/trucks', addTruck);

// Route to update a truck
router.put('/trucks/:id', updateTruck);

// Route to delete a truck
router.delete('/trucks/:id', deleteTruck);

export default router;
