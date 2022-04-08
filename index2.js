//index2.js

const {fetchMyIP, fetchCoordsByIP, nextISSTimesForMyLocation} = require("./iss_promised");

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(nextISSTimesForMyLocation)
  .then(body => {
    const data = JSON.parse(body);
    const {lat, lon} = data;
    console.log("The geo coords are, latitude: ", lat," , longitutde: ", lon);
  });