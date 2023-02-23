const express = required('express');
const { updateUser } = required('../controllers/user/user.controller');
const { updateUserValidation } = required('../middlewares/authValidation');
const { protect } = required('../middlewares/protect');
const router = express.Router();

// update user info
router.put("/update-user", protect, updateUserValidation, updateUser);

export default router;