var should = require('should');
var supertest = require('supertest');
var app = require('../app.js');

describe('wallboards API', function() {
	describe('GET /wallboards', function() {
    it('should list wallboards', function(done) {
      supertest('http://localhost:3000')
        .get('/wallboards')
        .expect(200)
        .end(function(err, res) {
          res.text.should.eql('wallboards! wooo!');
          done()
        });
    });
  });
});
