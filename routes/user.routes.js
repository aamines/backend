import express from "express";

//importing the user controller
import { signup, login, deleteUser } from "../controllers/user.controllers.js";

const router = express.Router();

//implementing user routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/delete", deleteUser);

export default router;
