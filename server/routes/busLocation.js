const axios = require("axios");
const express = require("express");
const router = express.Router();
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

module.exports = () => {
  let data = {};

  router.get("/", (req, res) => {
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
        data["position"] = feed.entity[0]["vehicle"]["position"];
        console.log(data);
        // console.log(feed.entity[0]);
      })
      .then(() => res.json(data))
      .catch(function (error) {
        console.log(error);
      });
  });

  return router;
};
