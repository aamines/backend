import express from "express";

//importing the user controller
import { signup } from "../controllers/user.controllers.js";

const router = express.Router();

//implementing user routes
router.post("/signup", signup);

export default router;
