const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

axios
  .get(
    "https://data.edmonton.ca/api/views/4vt2-8zrq/rows.json?accessType=DOWNLOAD"
  )
  .then((res) => {
    let stops = [];
    for (val of res.data.data) {
      stops.push({
        stop_id: val[8],
        name: val[10],
        lat: Number(val[12]),
        lon: Number(val[13]),
      });
    }
    return stops;
  })
  .then((stops) => {
    async function main() {
      for (let stop of stops) {
        await prisma.stop.create({
          data: stop,
        });
      }
    }

    main()
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  });
