const axios = require("axios");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

const url =
  "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb";

axios({
  method: "GET",
  url: url,
  responseType: "arraybuffer",
})
  .then(function (response) {
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      response.data
    );
    console.log(feed.entity[0]);
  })
  .catch(function (error) {
    console.log(error);
  });
