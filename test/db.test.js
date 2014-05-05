var should = require('should');
var fs = require('fs');
var config = require('../config');

config.db.name = "dashound_test";

var db = require('../lib/db');

var testObj = {dink: 'blam'};

describe('db', function() {

  before(function(done) {
    db.test.drop(function(err) {
      db.createCollection('test', done);
    });
  });

  it('should connect to the databse', function (done) {
    db.stats(function(err, stats) {
      stats.should.be.ok;
      done();
    });
  });

  it('should add objects to the database', function (done) {
    db.test.insert(testObj, function(err) {
      should.not.exist(err);
      db.test.find(testObj, function (err, data) {
        should.not.exist(err);
        data.should.containEql(testObj);
        done();
      });
    });
  });

  it('should delete objects to the database', function (done) {
    db.test.insert(testObj, function(err) {
      db.test.remove(testObj, function (err, value) {
        db.test.find(testObj, function (err, value) {
          value.should.be.empty;
          done();
        });
      });
    });
  });

});

