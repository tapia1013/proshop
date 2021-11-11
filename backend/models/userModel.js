import mongoose from 'mongoose';


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


// mongoose.model cause we want to create a model from schema above
const User = mongoose.model('User', userSchema)


export default User;