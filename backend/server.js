import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';


// after setting up the routes we import them here in the server
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

// call connectDB
connectDB();

const app = express();

// for body parsing in controllers
app.use(express.json())


// middleware example
// app.use((req, res, next) => {
//   console.log(req.originalUrl); // api/product
//   next()
// })


app.get('/', (req, res) => {
  res.send('API IS RUNNING....')
})

// mount the routes we get from routes with controller logic inside
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


// anything thats not an actual route
app.use(notFound)

// error middleware

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
