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
        let currentDate = new Date(feed.header.timestamp.low *1000)
        let modifiedDate = currentDate.toLocaleTimeString('en-GB', { timeZone: 'America/Edmonton', hour12: false })
        let b = modifiedDate.split(":");
        let currentMinutes = (+b[0]) * 60 + (+b[1]);
        console.log("Current Time:")
        console.log(currentMinutes)
        console.log("Bus Arrival Times:")
        const array = []
        let stopData = feed.entity.forEach((e) => {
          e.tripUpdate.stopTimeUpdate.forEach((s) => {
            if (s.stopId === "5359") {
              let myDate = new Date(s.departure.time.low *1000)
              let busHMS = myDate.toLocaleTimeString('en-GB', { timeZone: 'America/Edmonton', hour12: false })
              let a = busHMS.split(':');
              let busMinutes = (+a[0]) * 60 + (+a[1]);
              let minutesUntilBus = busMinutes - currentMinutes
              array.push({
                route: e.tripUpdate.trip.routeId,
                time: minutesUntilBus
              });
            }
          })
        })
        let modifiedArray = array.filter((arr) => {
          return arr.time > 0
        })
        modifiedArray.sort((a,b) => a.time - b.time)
        console.log(modifiedArray)
        return res.json(JSON.stringify(modifiedArray))
        //let arrival = feed.entity[0]["tripUpdate"]["stopTimeUpdate"][0]["departure"]["time"]["low"]
        //const myDate = new Date( arrival *1000);
        //console.log(myDate.toLocaleString())
      }
    });
  });

  return router;

};


