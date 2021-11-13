import express from 'express';
const router = express.Router()
import {
  authUser,
  getUserProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


// authUser has all the logic and is the controllers folder
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);



export default router;