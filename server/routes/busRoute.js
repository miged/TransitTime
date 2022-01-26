const axios = require("axios");
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

module.exports = () => {
  router.get("/:agency/:id", (req, res) => {
    const prisma = new PrismaClient();
    const routeId = req.params.id;
    const key = process.env.TRANSITLAND_KEY;
    let agency = req.params.agency;
    let onestopId = "";

    if (agency == "ets") {
      onestopId = "o-c3x-edmontontransitservice";

      axios
        .get(
          `https://transit.land/api/v2/rest/routes?api_key=${key}&operator_onestop_id=${onestopId}&route_id=${routeId}`
        )
        .then((feed) => {
          console.log(`ROUTE DATA SENT FOR: ${routeId}`);
          let result = [];
          feed.data.routes[0].route_stops.forEach((element) => {
            result.push(element.stop.stop_id);
          });
          return result;
        })
        .then((stops) => {
          async function main() {
            let dbResult = [];
            for (let stop of stops) {
              const row = await prisma.stop.findUnique({
                where: {
                  stop_id: stop,
                },
              });
              dbResult.push(row);
            }
            return dbResult;
          }

          main()
            .then((stopArr) => {
              res.json(stopArr);
            })
            .catch((e) => {
              throw e;
            })
            .finally(async () => {
              await prisma.$disconnect();
            });
        })
        .catch((err) => console.log(err));
    } else if (agency == "ttc") {
      onestopId = "o-dpz8-ttc";

      axios
        .get(
          `https://retro.umoiq.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${routeId}`
        )
        .then((data) => {
          let stopArr = data.data.route.stop.map((e) => {
            return { stop_id: e.stopId, lat: e.lat, lon: e.lon, name: e.title };
          });
          res.json(stopArr);
        })
        .catch((err) => console.log(err));
    }
  });

  return router;
};
