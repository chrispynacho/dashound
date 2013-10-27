var db = require('./db');

function list(callback) {
	db.get('wallboard', callback);
};

module.exports = {
	list: list
};

