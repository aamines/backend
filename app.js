import express from "express";
import dotenv from "dotenv";
import logger from "morgan";

//importing routes
import userRoutes from "./routes/user.routes.js";

//configs
dotenv.config();

//setting up server
const app = express();

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints
app.use("/api/v1/users", userRoutes);

export default app;
