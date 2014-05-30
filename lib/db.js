var mongojs = require('mongojs');
var config = require('../config').db;

var collections = ['test', 'wallboards', 'datasources', 'datametrics'];

function connect() {
  var host = process.env.MONGO_URL || config.host + config.name || 'mongodb://127.0.0.1/dashound';
  console.log('conencting to mongo database: ' + host);
  var db = mongojs.connect(host, collections);
  db.ObjectId = mongojs.ObjectId;
  return db;
}

module.exports = connect();
