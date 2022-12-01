import express from "express";
import dotenv from "dotenv";
import logger from "morgan";

//importing routes
import userRoutes from "./routes/user.routes.js";

//setting up server
const app = express();

//configs
dotenv.config();
app.set("view engine", "pug");
app.set("views", "./views");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints
app.use("/api/v1/users", userRoutes);

//default page
app.get("/", (req, res) => {
  res.render("index");
});

export default app;
