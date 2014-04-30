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

  it('should add objects to the database', function (done) {
    db.put('dink', 'blam', function(err) {
        should.not.exist(err);
        db.get('dink', function (err, value) {
            should.not.exist(err);
            value.should.eql('blam');
            done();
        });
    });
  });

  it('should add objects to the database', function (done) {
    db.put('dink', 'blam', function(err) {
      db.del('dink', function (err, value) {
        db.get('dink', function (err, value) {
          err.notFound.should.be.ok;
          done();
        });
      });
    });
  });
});

