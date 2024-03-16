// index.js

const express = require("express");
const cookieParser = require("cookie-parser");
const authController = require("./controllers/authController");
const registerController = require("./controllers/registerController");
const dashboardController = require("./controllers/dashboardController");
require('./initializeDatabase');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/login", authController);
app.use("/register", registerController);
app.use("/dashboard", dashboardController);

app.listen(3001, () => {
  console.log("App is running on port 3001!");
});
