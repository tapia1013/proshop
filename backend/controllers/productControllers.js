import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';






// @desc           Fetch all products
// @routes         GET /api/products
// @access         Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // res.status(401)
  // throw new Error('Not Authorized')
  res.json(products)
})






// @desc           Fetch single product
// @routes         GET /api/products/:id
// @access         Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // Make sure theres a product
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById
}



