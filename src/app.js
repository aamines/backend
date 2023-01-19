import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger/swagger.json" assert { type: "json" };

//importing routes
import authRoutes from "./routes/auth.routes.js"
import postrouter from "./routes/posts.routes";

//setting up server
const app = express();

//configs
dotenv.config();
app.use(cors());
app.set("view engine", "pug");
app.set("views", "./views");

//middlewares
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs Documentation
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {}, { docExpansion: 'none' }))

//endpoints

app.use("api/v1/auth", authRoutes);
app.get("/post",postrouter)

app.use("/api/v1/auth", authRoutes);


//default page
app.get("/", (req, res) => {
  res.render("index");
});


export default app;
