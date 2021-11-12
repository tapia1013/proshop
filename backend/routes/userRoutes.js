import express from 'express';
const router = express.Router()
import {
  authUser,
} from '../controllers/userController.js';


// authUser has all the logic and is the controllers folder
router.post('/login', authUser);


export default router;