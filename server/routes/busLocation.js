const axios = require("axios");
const express = require("express");
const router = express.Router();
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

module.exports = () => {
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  router.get("/:agency/:id", (req, res) => {
    let data = {
      position: {},
    };

    const id = req.params.id;
    const agency = req.params.agency;

    if (agency == "ets") {
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
          for (let val of feed.entity) {
            if (val.vehicle.vehicle.id === `${id}`) {
              data["bus"] = val.vehicle.vehicle;
              data["position"] = val.vehicle.position;
              data["time"] = val.vehicle.timestamp;
            }
          }
        })
        .then(() => {
          res.json(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (agency == "ttc") {
      const url = `https://retro.umoiq.com/service/publicJSONFeed?command=vehicleLocation&a=ttc&v=${id}`;
      axios
        .get(url)
        .then((res) => {
          data["position"]["latitude"] = Number(res.data.vehicle.lat);
          data["position"]["longitude"] = Number(res.data.vehicle.lon);
          data["secsSinceReport"] = Number(res.data.vehicle.secsSinceReport);
        })
        .then(() => res.json(data));
    }
  });

  return router;
};
