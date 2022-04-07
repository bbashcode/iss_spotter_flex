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
    const data = JSON.parse(body);
    const ipAddress = String(data.ip);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (error) {
      callback(null, error);
      return;
    } else {
      callback(null, ipAddress);
    }
  });

  return callback;
};

module.exports = { fetchMyIP };