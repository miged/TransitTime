const axios = require("axios");
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

module.exports = () => {
  router.get("/:id", (req, res) => {
    const routeId = req.params.id;
    const key = process.env.TRANSITLAND_KEY;
    const onestopId = "o-c3x-edmontontransitservice";
    const prisma = new PrismaClient();

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
  });

  return router;
};
