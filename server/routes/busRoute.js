const axios = require("axios");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/:id", (req, res) => {
    const routeId = req.params.id;
    const key = process.env.TRANSITLAND_KEY;
    const onestopId = "o-c3x-edmontontransitservice";

    axios
      .get(
        `https://transit.land/api/v2/rest/stops?api_key=${key}&served_by_onestop_ids=${onestopId}&route_id=${routeId}`
      )
      .then((feed) => {
        console.log("ROUTE DATA SENT");
        let result = [];
        feed.data.stops.forEach((element) => {
          let stop = {};
          stop["latitude"] = element.geometry.coordinates[1];
          stop["longitude"] = element.geometry.coordinates[0];
          stop["stopId"] = element.stop_id;
          stop["name"] = element.stop_name;
          result.push(stop);
        });
        return result;
      })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  });

  return router;
};
