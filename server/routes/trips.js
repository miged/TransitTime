const axios = require('axios')
const express = require('express');
const router = express.Router();
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

module.exports = () => {

  // Used so there is no "No 'Access-Control-Allow-Origin' header is present" error.
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  router.get('/', (req, res) => {

    // ETS get Request. Used if a stop in ETS(Edmonton) network is selected.
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
        console.log(modifiedArray)
        res.json(JSON.stringify(modifiedArray))
      })
      .catch(error => {
        console.log(error.response)
      })
    };

    // TTC get Request. Used if a stop in TTC(Toronto) network is selected.
    const ttcGet = () => {

      let url = `https://retro.umoiq.com/service/publicJSONFeed?command=predictions&a=ttc&r=${req.query.route_num}&s=${req.query.stop_id}`
      console.log(url)

      axios({
        method: "GET",
        url: url
      })
      .then((res) => {
        const array = [];
        const feed = res.data
        console.log(feed);
        feed.predictions.direction.prediction.forEach(element => {
          console.log(element)
          array.push({
            stopId: feed.predictions.stopTag,
            tripId: element.tripTag,
            routeId: req.query.route_id,
            time: element.minutes,
            vehicleID: element.vehicle,
          })
        })
        console.log(array)
        return array;
      })
      .then((array) => {
        console.log(array);
        res.json(JSON.stringify(array))
      })
      .catch(error => {
        console.log(error.response)
      })
    }

    // Agency IF statement determines which get request is used. Currenty TTC works with NextBus
    // JSON feeds while ETS uses a protocl buffer for realtime data. Other agencies can be added
    // depending on data method.
    if (req.query.agency === "o-dpz8-ttc") {
      ttcGet();
    } else if (req.query.agency === "o-c3x-edmontontransitservice") {
      etsGet();
    }

  });

  return router;

};
