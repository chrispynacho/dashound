var request = require('request');
var should = require('should');

var main = require('../../server/routes/index.js');

var SERVER = "http://localhost:9000";

describe('routes: wallboards', function() {
	it('should list wallboards', function(done) {
		request(SERVER + '/', function(err, response, data) {
			should.not.exist(err);
//			console.log(err, response.statusCode, data);
			done();
		});
	});
});