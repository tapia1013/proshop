import express from 'express';
// import asyncHandler from 'express-async-handler';
//  // bring model
// import Product from '../models/productModel.js';

const router = express.Router();
// import controllers
import { getProducts, getProductById } from '../controllers/productControllers.js';




// WE ARE NOW GETTING THESE ROUTES FROM THE CONTROLLER

// @desc           Fetch all products
// @routes         GET /api/products
// @access         Public
// router.rout for '/' we get request and call getPorducts
router.route('/').get(getProducts)

// // @desc           Fetch single product
// // @routes         GET /api/products/:id
// // @access         Public
router.route('/:id').get(getProductById)




export default router;
