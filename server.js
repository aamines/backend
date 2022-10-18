import express from "express";
import dotenv from "dotenv";
import db from "./services/db.js";

//importing routes
import userRoutes from "./routes/user.routes.js";

//configs
dotenv.config();

//setting up server
const app = express();

//routes
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});

export default app;
