import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';


import productRoutes from './routes/productRoutes.js';

dotenv.config();

// call connectDB
connectDB();

const app = express();


app.get('/', (req, res) => {
  res.send('API IS RUNNING....')
})

// mount the productRoutes
app.use('/api/products', productRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
