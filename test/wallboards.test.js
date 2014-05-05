var should = require('should');
var db = require('../lib/db');
var supertest = require('supertest');
var app = require('../app.js');
var wallboards = require('../lib/wallboards');


wallboardIndex = 1;
function newWallboard(index) {
  index = index || wallboardIndex++;
  return {name: 'Wallboard #' + index};
}

describe('wallboards lib', function() {

  before(function(done) {
    db.wallboards.drop(done);
  });

  it('should create a wallboard', function(done) {
    var wb1 = newWallboard();
    wallboards.add(wb1, function(err, data) {
      should.not.exist(err);
      data.should.containEql(wb1);
      done();
    });
  });

  it('should get a single wallboard', function(done) {
    var wb1 = newWallboard();
    var wallboardId;
    wallboards.add(wb1, function(err, data) {
      wallboardId = data._id;
      wallboards.get(wallboardId, function(err, wb) {
        should.not.exist(err);
        wb.should.containEql(wb1);
        done();
      });
    });
  });

  it('should get a list of wallboards', function(done) {
    var wb1 = newWallboard();
    var wb2 = newWallboard();
    wallboards.add(wb1, function(err, data) {
      wallboards.add(wb2, function(err, data) {
        wallboards.list(function(err, data) {
          should.not.exist(err);
          data.should.containEql(wb1);
          data.should.containEql(wb2);
          done();
        });
      });
    });
  });

});

describe('wallboards API', function() {

	describe('GET /wallboards', function() {
    var idx = 3;

    before(function(done) {
      wallboards.add(newWallboard(idx), done);
    });

    it('should list wallboards', function(done) {
      supertest('http://localhost:3000')
        .get('/wallboards')
        .send()
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          var wb3 = newWallboard(3);
          res.body.should.containDeep([wb3]);
          done();
        });
      });
  });

  describe('GET /wallboards/:wallboardId', function() {
    
    var wb4 = newWallboard();
    before(function(done) {
      wallboards.add(wb4, done);
    });

    it('should get a single wallboard by id', function(done) {
     var wallboardId = wb4._id;
     supertest('http://localhost:3000')
        .get('/wallboards/' + wallboardId)
        .send()
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body.should.containDeep(wb4);
          done();
        });
    });

    it.only('should return a 404 if the wallboard is not found', function(done) {
      supertest('http://localhost:3000')
        .get('/wallboards/999999999999999999999999')
        .send()
        .expect(404)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body.should.be.empty;
          done();
        });
    });

  });



});

