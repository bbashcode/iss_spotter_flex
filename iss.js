/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api64.ipify.org?format=json", (error, response, body) => {

    if (error) return callback(null, error);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });

};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) return callback(null, error);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geocode by the IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const {lat, lon} = JSON.parse(body);
    
    callback(null, {lat, lon});
  });
};

const fetchISSFlyOverTimes = function(geoCode, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${geoCode.latitude}&lon=${geoCode.longitude}`;

  request(url, (error, response, body) => {
    if (error) return callback(null, error);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOverTime = JSON.parse(body);
    
    callback(null, flyOverTime);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };