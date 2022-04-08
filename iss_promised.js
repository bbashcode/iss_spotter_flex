const request = require("request-promise-native");

const fetchMyIP = function(){
  return request("https://api64.ipify.org?format=json");
}

const fetchCoordsByIP = function(body){
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
}

const nextISSTimesForMyLocation = function(body){
  const url = `https://iss-pass.herokuapp.com/json/?lat=${body.lat}&lon=${body.lon}`;
  return request(url);
}

module.exports = { fetchMyIP, fetchCoordsByIP };