var dash = require('lodash');
var request = require('superagent');
var db = require('./db');
var metrics = require('./data_metrics');

function list(callback) {
  db.datasources.find({}, callback);
};

function add(dataSource, callback) {
  db.datasources.insert(dataSource, function (err, data) {
    metrics.startPoll(data, callback);
    //callback(err, data);
  });
};

function get(dataSourceId, callback) {
  db.datasources.findOne({_id: db.ObjectId(dataSourceId)}, callback);
};

function update(dataSourceId, dataSource, callback) {
  db.datasources.findAndModify({
    query: { _id: db.ObjectId(dataSourceId) },
    update: dash.omit(dataSource, '_id'),
    new: true
  }, function(err, data, lastErrorObject) {
    callback(err, data);
  });
};

function deleteDataSource(dataSourceId, callback) {
  db.datasources.remove({_id: db.ObjectId(dataSourceId)}, function(err, data) {
    metrics.stopPoll(callback);
  });
};

function loadData(dataSourceId, limit, callback) {
  metrics.query(dataSourceId, +limit, callback);
};

function pollAllSources(callback) {
  var sources = [];
  list(function(err, data) {
    sources = data;
    metrics.startAllPolls(sources, callback)
  });
}

module.exports = {
  list: list,
  add: add,
  get: get,
  update: update,
  delete: deleteDataSource,
  loadData: loadData,
  pollAllSources: pollAllSources
};
