import express from "express";

//importing the user controller
import {
  signup,
  login,
  deleteAccount,
} from "../controllers/user.controllers.js";

const router = express.Router();

//implementing user routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/delete", deleteAccount);

export default router;
