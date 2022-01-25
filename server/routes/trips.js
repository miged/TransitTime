const axios = require('axios')
const express = require('express');
const router = express.Router();
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

module.exports = () => {

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  router.get('/', (req, res) => {

    const etsGet = () => {
      let url = 'http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb'
      let timezone = 'America/Edmonton'
      const array = []

      axios({
        method: "GET",
        url: url,
        responseType: "arraybuffer",
      })
      .then((res) => {
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(res.data);
        const currentDate = new Date(feed.header.timestamp.low *1000)
        const modifiedDate = currentDate.toLocaleTimeString('en-GB', { timeZone: timezone, hour12: false })
        const b = modifiedDate.split(":");
        const currentMinutes = (+b[0]) * 60 + (+b[1]);
        const stopData = feed.entity.forEach((e) => {
          e.tripUpdate.stopTimeUpdate.forEach((s) => {
            if (s.stopId === req.query.stop_id && e.tripUpdate.trip.routeId === req.query.route_id) {
              let myDate;
              if (s.arrival === null) {
                myDate = new Date(s.departure.time.low *1000);
              } else if (s.departure === null) {
                myDate = new Date(s.arrival.time.low *1000);
              };
              const busHMS = myDate.toLocaleTimeString('en-GB', { timeZone: timezone, hour12: false })
              const a = busHMS.split(':');
              const busMinutes = (+a[0]) * 60 + (+a[1]);
              const minutesUntilBus = busMinutes - currentMinutes
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
      })
      .then(() => {
        const modifiedArray = array.filter((arr) => {
          return arr.time > 0
        })
        modifiedArray.sort((a,b) => a.time - b.time)
        res.json(JSON.stringify(modifiedArray))
      })
      .catch(error => {
        console.log(error.response)
      })
    };

    const ttcGet = () => {
      const url = `https://retro.umoiq.com/service/publicJSONFeed?command=predictions&a=ttc&r=${req.params.route_id}&s=${req.params.stop_id}`
      const array = [];

      axios({
        method: "GET",
        url: url,
        responseType: "arraybuffer",
      })
      .then((res) => {
        const feed = res.data
        const stringFeed = feed.toString();
        const parsedFeed = JSON.parse(stringFeed)
        parsedFeed.predictions.direction.prediction.forEach(element => {
          array.push({
            stopId: parsedFeed.predictions.stopTag,
            tripId: element.tripTag,
            routeId: parsedFeed.predictions.routeTag,
            time: element.minutes,
            vehicleID: element.vehicle,
            direction: parsedFeed.predictions.direction.title
          });
        });
      })
      .then(() => {
        res.json(JSON.stringify(array))
      })
      .catch(error => {
        console.log(error.response)
      })
    }

    // Get rid of this. If (req.params.agency) when it works.
    const agency = "o-c3x-edmontontransitservice"

    if (agency === "o-dpz8-ttc") {
      ttcGet();
    } else if (agency === "o-c3x-edmontontransitservice") {
      etsGet();
    }

  });

  return router;

};
