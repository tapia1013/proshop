// script to run to import data
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/userModel.js';
// ability to destroy user orders
import connectDB from './config/db.js';




dotenv.config();

connectDB();

const importData = async () => {
  try {
    // clear all 3 collection completlely so we wont import
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // import the users and assign users to const
    const createdUsers = await User.insertMany(users);

    // [0] cause its the first index of the users we created
    const adminUser = createdUsers[0]._id;

    // product with the addition of admin users
    const sampleProducts = products.map(product => {
      // return object with all the things in the products
      return { ...product, user: adminUser }
    })

    // take sample product to database
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse);
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1)
  }
}




const destroyData = async () => {
  try {
    // clear all 3 collection completlely so we wont import
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data DESTROYED!'.red.inverse);
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1)
  }
}

// foor -d to destroy
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
