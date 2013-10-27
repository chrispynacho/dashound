var should = require('should');
var fs = require('fs');
var config = require('../config').db;
config.path = '/tmp/test';

var db = require('../lib/db');

describe('db', function() {
  it('should connect to the databse', function (done) {
    db.location.should.eql(config.path);
    fs.exists(config.path, function(exists) {
      should(exists).ok;
      done();
    });
  });
});

