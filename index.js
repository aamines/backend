import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import logger from "morgan";

//database
import "./services/db.js";

//importing routes
import userRoutes from "./routes/user.routes.js";

//configs
dotenv.config();

//setting up server
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(
  session({
    secret: `${process.env.S_SECRET}`,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//endpoints
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});

export default app;
