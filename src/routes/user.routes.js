import express from 'express';
import { updateUser } from '../controllers/user/user.controller';
import { updateUserValidation } from '../middlewares/authValidation';
import { protect } from '../middlewares/protect';
const router = express.Router();

// update user info
router.put("/update-user", protect, updateUserValidation, updateUser);

export default router;