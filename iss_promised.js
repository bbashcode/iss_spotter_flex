const request = require("request-promise-native");

const fetchMyIP = function(){
  return request("https://api64.ipify.org?format=json");
}

module.exports = { fetchMyIP };