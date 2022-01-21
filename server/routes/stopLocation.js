const axios = require("axios");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/:id", (req, res) => {
    const stopId = req.params.id;
    const key = process.env.TRANSITLAND_KEY;
    const onestopId = "o-c3x-edmontontransitservice";

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
