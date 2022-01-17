// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const tripsRoutes = require("./routes/trips");

// Mount all resource routes
app.use("/api/users", usersRoutes());
app.use("/api/trips", tripsRoutes());

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.send("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
