var mongojs = require('mongojs');
var config = require('../config').db;

var collections = ['test', 'wallboards', 'datasources'];

function connect() {
  var db = mongojs.connect(config.host + config.name, collections);
  db.ObjectId = mongojs.ObjectId;
  return db;
}

module.exports = connect();
