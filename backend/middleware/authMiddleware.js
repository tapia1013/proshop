// FOR PROTECTING ROUTES TO PROFILES AND VALIDATING JWT
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';



// FOR VALIDATING JWT
const protect = asyncHandler(async (req, res, next) => {
  let token

  // check for the token && check if it starts with Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get the token but not bearer
      token = req.headers.authorization.split(' ')[1]
      // decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // fetch the user
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      // token didnt work steps
      console.error(error);
      res.status(401)
      throw new Error('Not Authorized,Token Failed')

    }
  }

  // if no token
  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }


})


export { protect }




