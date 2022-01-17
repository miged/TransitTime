const axios = require("axios");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

let data = {};

const url =
  "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb";

axios({
  method: "GET",
  url: url,
  responseType: "arraybuffer",
})
  .then(function (response) {
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      response.data
    );
    data["position"] = feed.entity[0]["vehicle"]["position"];
    console.log(data);
    // console.log(feed.entity[0]);
  })
  .catch(function (error) {
    console.log(error);
  });

module.exports = () => {
  router.get("/", (req, res) => {
    console.log("Sending bus location....");
    res.json(data);
  });

  return router;
};
