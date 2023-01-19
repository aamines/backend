import express from 'express';
import { updateUser } from '../controllers/user/user.controller';

const router = express.Router();

// update user info
router.put("/update-user", updateUser);


export default router;