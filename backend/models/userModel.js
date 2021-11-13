import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


// create userSchema
const userSchema = mongoose.Schema({
  // all fields we want for the user
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timeStamps: true
})


// we use this method in the userController
// method so we can comppare encrypted password...  func(plaintextpw)
userSchema.methods.matchPassword = async function (enteredPassword) {
  // compare plain text to encrypted pw
  return await bcrypt.compare(enteredPassword, this.password)
}


// Before we save new registered user we encrypt
userSchema.pre('save', async function (next) {
  // if its not been sent or modified do this
  if (!this.isModified('password')) {
    next()
  }

  // ONLY DO THIS IS PASSWORD IS SENTT OR MIDIFIED
  // we need the salt THEN hash the PW asynchronously
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})


// mongoose.model cause we want to create a model from schema above
const User = mongoose.model('User', userSchema)


export default User;