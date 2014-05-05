var db = require('./db');

function list(callback) {
	db.wallboards.find({}, callback);
};

function add(wallboard, callback) {
  db.wallboards.insert(wallboard, callback);
}

function get(wallboardId, callback) {
  db.wallboards.findOne({_id: db.ObjectId(wallboardId)}, callback);
}

module.exports = {
	list: list,
  add: add,
  get: get
};

