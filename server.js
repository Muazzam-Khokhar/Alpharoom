import express from 'express'
import connectDB from './db.js';
import roomRouters from './routes/roomRoute.js'
import cors from 'cors';
import userRoute from './routes/userRoute.js'
import bookingRoute from './routes/bookingRoute.js'


const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

connectDB();

app.use('/api/rooms',roomRouters)
app.use('/api/users',userRoute)
app.use('/api/bookings', bookingRoute)
app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.