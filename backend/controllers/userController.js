import asyncHandler from 'express-async-handler';
// import JWT
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';





// @desc       Auth user & get token
// @route      POST /api/users/login
// @access     Public
const authUser = asyncHandler(async (req, res) => {
  // we need to bodyparse with express.json in server.js
  // So we need to pullout email and password from the request body
  const { email, password } = req.body;


  // has to be in an object{} only for debugging
  // res.send({ email, password })



  // EMAIL
  // find one user by emial
  const user = await User.findOne({ email })


  // PASSWORD
  // we compare req.body.password to the encrypted pw method func we created inthe userModel
  // check if the user exists and match passwords to encryptedPW
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }


})











// @desc       Auth user & get token
// @route      GET /api/users/profile
// @access     Private
const getUserProfile = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id)

  // get the user
  const user = await User.findById(req.user._id)

  // check for the user
  if (user) {
    // if user is found return all this
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })

  } else {
    // user not found
    res.status(404);
    throw new Error('User not found')
  }

})










export {
  authUser,
  getUserProfile
}