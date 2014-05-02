var should = require('should');
var supertest = require('supertest');
var app = require('../app.js');

var config = require('../config');
config.db.path = '/tmp/test';
var db = require('../lib/db');

var wallboard1 = {name: 'Wallboard One'};

describe('wallboards API', function() {
	describe('GET /wallboards', function() {
    before(function(done) {
      db.put('wallboards', [wallboard1], done);
    });

    it('should list wallboards', function(done) {
      supertest('http://localhost:3000')
        .get('/wallboards')
        .send()
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body.should.eql([wallboard1]);
          done();
        });
      });

  });
});
