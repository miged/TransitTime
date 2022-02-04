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
const busLocationRoutes = require("./routes/busLocation");
const tripsRoutes = require("./routes/trips");
const stopLocationRoutes = require("./routes/stopLocation");
const busRouteRoutes = require("./routes/busRoute");

app.use("/api/users", usersRoutes());
app.use("/api/busLocation", busLocationRoutes());
app.use("/api/trips", tripsRoutes());
app.use("/api/stopLocation", stopLocationRoutes());
app.use("/api/busRoute", busRouteRoutes());

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.send("index");
});

app.listen(PORT, () => {
  console.log(`TransitTime API listening on port ${PORT}`);
});
