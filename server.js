const express = require("express");
const dotenv = require("dotenv");

//configs
dotenv.config();

//setting up server
const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
