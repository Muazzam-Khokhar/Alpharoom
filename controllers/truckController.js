// Import the truck data
import trucks from '../data/trucks.js';

// Get all trucks
const getAllTrucks = (req, res) => {
  res.json(trucks);
};

// Get a specific truck by ID
const getTruckById = (req, res) => {
  const truckId = parseInt(req.params.id);
  const truck = trucks.find(truck => truck.id === truckId);

  if (truck) {
    res.json(truck);
  } else {
    res.status(404).json({ error: 'Truck not found' });
  }
};

// Add a new truck
const addTruck = (req, res) => {
  const { name, licensePlate, driver } = req.body;
  const newTruck = { id: trucks.length + 1, name, licensePlate, driver };
  trucks.push(newTruck);
  res.status(201).json(newTruck);
};

// Update a truck
const updateTruck = (req, res) => {
  const truckId = parseInt(req.params.id);
  const { name, licensePlate, driver } = req.body;
  const truck = trucks.find(truck => truck.id === truckId);

  if (truck) {
    truck.name = name;
    truck.licensePlate = licensePlate;
    truck.driver = driver;
    res.json(truck);
  } else {
    res.status(404).json({ error: 'Truck not found' });
  }
};

// Delete a truck
const deleteTruck = (req, res) => {
  const truckId = parseInt(req.params.id);
  const truckIndex = trucks.findIndex(truck => truck.id === truckId);

  if (truckIndex !== -1) {
    trucks.splice(truckIndex, 1);
    res.json({ message: 'Truck deleted' });
  } else {
    res.status(404).json({ error: 'Truck not found' });
  }
};

// Export the truck controller functions
export { getAllTrucks, getTruckById, addTruck, updateTruck, deleteTruck };
