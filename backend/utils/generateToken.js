import jwt from 'jsonwebtoken';


const generateToken = (id) => {
  // ({payload inside an object}, SECRET, {options})
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '360d'
  })
}



export default generateToken;