const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger.json");

//routes
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const postRoutes = require("./routes/posts.routes.js");
const storyRoutes = require("../src/routes/story.routes");
const accountRoutes = require("./routes/account.routes.js");
const communityRoutes = require("./routes/community.routes.js");

//setting up server
const app = express();

//configs
dotenv.config();
app.use(cors());
app.set("view engine", "pug");
app.use(express.static("assets"));
app.set("views", __dirname + "/views");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs Documentation
app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {}, { docExpansion: "none" })
);

//endpoints
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/story", storyRoutes);
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/community", communityRoutes);

//default page
app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
