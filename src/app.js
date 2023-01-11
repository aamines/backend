import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

//importing routes
import userRoutes from "./routes/user.routes.js";
import accountRoutes from "./routes/account.routes.js";
import swaggerDocs from "./swagger/swagger.json" assert { type: "json" };
//setting up server
const app = express();

//configs
dotenv.config();
app.use(cors());
app.set("view engine", "pug");
app.set("views", "./views");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs Documentation
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {}, { docExpansion: 'none' }))

//endpoints
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/accounts", accountRoutes);

//default page
app.get("/", (req, res) => {
  res.render("index");
});

export default app;
