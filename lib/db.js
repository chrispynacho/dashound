var level = require('level');
var config = require('../config').db;

function connect() {
  return level(config.path);
}

module.exports = connect();
