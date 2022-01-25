const axios = require("axios");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/:agency/:id", (req, res) => {
    const stopId = req.params.id;
    const agency = req.params.agency;
    const key = process.env.TRANSITLAND_KEY;
    const onestopId = "";

    if (agency == "ets") {
      onestopId = "o-c3x-edmontontransitservice";
    } else if (agency == "ttc") {
      onestopId = "o-dpz8-ttc";
    }

    axios
      .get(
        `https://transit.land/api/v2/rest/stops?api_key=${key}&served_by_onestop_ids=${onestopId}&stop_id=${stopId}`
      )
      .then((feed) => {
        return feed.data.stops[0].geometry.coordinates;
      })
      .then((lnglat) => {
        let result = { stop_lat: lnglat[1], stop_lon: lnglat[0] };
        res.json(result);
      })
      .catch((err) => console.log(err));
  });

  return router;
};
