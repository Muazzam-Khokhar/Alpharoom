import express from 'express';


// Create an Express application
const app = express();


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// import truckRoutes from './routes/truckRoutes.js';
// import userRoutes from './routes/userRoutes.js';
  // app.use(express.json());
  // Middleware to parse JSON request bodies
  
  // // Route handlers
  // app.use('/api/trucks', truckRoutes);
  // app.use('/api/users', userRoutes);
  
  // // Error handling middleware
  // app.use((err, req, res, next) => {
  //   console.error(err.stack);
  //   res.status(500).json({ message: 'Internal Server Error' });
  // });