const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger.json");

//consting routes
const authRoutes = require("./routes/auth.routes.js");
const postRoutes = require("./routes/posts.routes.js");
const storyRoutes = require("./routes/story.routes.js")
const community=require("./routes/community.routes.js")


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

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes)
app.use("/api/v1/story", storyRoutes)
app.use("api/v1/community", community)


//default page
app.get("/", (req, res) => {
  res.send("<p>Welcome to Projectia Backend APIs </p>")
});

module.exports = app;