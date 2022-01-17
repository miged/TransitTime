const express = require('express');
const router = express.Router();
const request = require('request');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

const app = express();

module.exports = () => {

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  router.get('/', (req, res) => {

    const requestSettings = {
      method: 'GET',
      url: 'http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb',
      encoding: null
    };

    request(requestSettings, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
        const currentDate = new Date(feed.header.timestamp.low *1000)
        const modifiedDate = currentDate.toLocaleTimeString('en-GB', { timeZone: 'America/Edmonton', hour12: false })
        const b = modifiedDate.split(":");
        const currentMinutes = (+b[0]) * 60 + (+b[1]);
        const array = []
        const stopData = feed.entity.forEach((e) => {
          e.tripUpdate.stopTimeUpdate.forEach((s) => {
            if (s.stopId === "5359" && e.tripUpdate.trip.routeId === "004") {
              const myDate = new Date(s.departure.time.low *1000)
              const busHMS = myDate.toLocaleTimeString('en-GB', { timeZone: 'America/Edmonton', hour12: false })
              const a = busHMS.split(':');
              const busMinutes = (+a[0]) * 60 + (+a[1]);
              const minutesUntilBus = busMinutes - currentMinutes
              array.stopId = s.stopId
              array.push({
                stopId: s.stopId,
                tripId: e.tripUpdate.trip.tripId,
                routeId: e.tripUpdate.trip.routeId,
                time: minutesUntilBus,
                vehicleID: e.tripUpdate.vehicle.id
              });
            }
          })
        })
        const modifiedArray = array.filter((arr) => {
          return arr.time > 0
        })
        modifiedArray.sort((a,b) => a.time - b.time)
        //console.log(modifiedArray)
        return res.json(JSON.stringify(modifiedArray))
      }
    });
  });
  return router;
};
