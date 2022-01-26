const axios = require("axios");
const express = require("express");
const router = express.Router();
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

module.exports = () => {
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
          // {
          //   copyright: 'All data copyright Toronto Transit Commission 2022.',
          //   vehicle: {
          //     routeTag: '51',
          //     predictable: 'true',
          //     heading: '349',
          //     speedKmHr: '5',
          //     lon: '-79.4001007',
          //     id: '3261',
          //     dirTag: '51_1_51',
          //     lat: '43.7061004',
          //     secsSinceReport: '24'
          //   }
          // }
          // {
          //   bus: VehicleDescriptor { id: '2419', label: '4399' },
          //   position: Position {
          //     latitude: 53.57033157348633,
          //     longitude: -113.45353698730469,
          //     bearing: 90,
          //     speed: 4.470399856567383
          //   },
          //   time: Long { low: 1643157623, high: 0, unsigned: true }
          // }
        })
        .then(() => res.json(data));
    }
  });

  return router;
};
