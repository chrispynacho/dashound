var db = require('./db');
var dash = require('lodash');

function list(callback) {
	db.wallboards.find({}, callback);
};

function add(wallboard, callback) {
  db.wallboards.insert(wallboard, callback);
};

function get(wallboardId, callback) {
  db.wallboards.findOne({_id: db.ObjectId(wallboardId)}, callback);
};

function update(wallboardId, wallboard, callback) {
  db.wallboards.findAndModify({
    query: { _id: db.ObjectId(wallboardId) },
    update: dash.omit(wallboard, '_id'),
    new: true
  }, function(err, data, lastErrorObject) {
    callback(err, data);
  });
};


module.exports = {
	list: list,
  add: add,
  get: get,
  update: update
};

