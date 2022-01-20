const axios = require("axios");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/:id", (req, res) => {
    let result = {};
    let stopId = req.params.id;

    axios
      .get("https://data.edmonton.ca/resource/4vt2-8zrq.json")
      .then((feed) => {
        // console.log(feed.data);
        let stops = feed.data;
        for (let stop of stops) {
          if (stop.stop_id === stopId) {
            result = stop;
            break;
          }
        }
        console.log(result);
      })
      .then(() => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  });

  return router;
};
