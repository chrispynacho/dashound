var dash = require('lodash');
var request = require('superagent');
var db = require('./db');

function list(callback) {
  db.datasources.find({}, callback);
};

function add(dataSource, callback) {
  db.datasources.insert(dataSource, callback);
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
  db.datasources.remove({_id: db.ObjectId(dataSourceId)}, callback);
};

function loadData(dataSourceId, callback) {
  get(dataSourceId, function(err, data) {
    if (err) return callback(err);

    request
      .get(data.url)
      .set('Accept', 'application/json')
      .end(callback);
  });
};

module.exports = {
  list: list,
  add: add,
  get: get,
  update: update,
  delete: deleteDataSource,
  loadData: loadData
};

