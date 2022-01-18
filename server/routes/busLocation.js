const axios = require("axios");
const express = require("express");
const router = express.Router();
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

module.exports = () => {
  router.get("/", (req, res) => {
    let data = {};

    const url =
      "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb";

    axios({
      method: "GET",
      url: url,
      responseType: "arraybuffer",
    })
      .then((res) => {
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
          res.data
        );
        data["position"] = feed.entity[4]["vehicle"]["position"];
        console.log(data);
      })
      .then(() => res.json(data))
      .catch(function (error) {
        console.log(error);
      });
  });

  return router;
};
