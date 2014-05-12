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

	describe('GET /api/wallboards', function() {
    var idx = 3;

    before(function(done) {
      wallboards.add(newWallboard(idx), done);
    });

    it('should list wallboards', function(done) {
      supertest('http://localhost:3000')
        .get('/api/wallboards')
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

  describe('GET /api/wallboards/:wallboardId', function() {
    
    var wb4 = newWallboard();
    before(function(done) {
      wallboards.add(wb4, done);
    });

    it('should get a single wallboard by id', function(done) {
     var wallboardId = wb4._id;
     supertest('http://localhost:3000')
        .get('/api/wallboards/' + wallboardId)
        .send()
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body.should.containDeep(wb4);
          done();
        });
    });

    it('should return a 404 if the wallboard is not found', function(done) {
      supertest('http://localhost:3000')
        .get('/api/wallboards/999999999999999999999999')
        .send()
        .expect(404)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body.should.be.empty;
          done();
        });
    });

  });

  describe('POST /api/wallboards', function() {
    it('should add a wallboard', function(done) {
      var wb5 = {name: "walboard #5"};
      supertest('http://localhost:3000')
        .post('/api/wallboards')
        .set('Content-Type', 'application/json')
        .send(wb5)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.containDeep(wb5);
          done();
        });
    });

  });

  describe('PUT /api/wallboards/:wallboardId', function() {
    it('should update a wallboard', function(done) {
      var wb6 = {name: "walboard #6"};

      wallboards.add(wb6, function(err, data) {
      var wallboardId = data._id;
      wallboards.get(wallboardId, function(err, wb) {
        should.not.exist(err);

        wb6.name += " rocks";
        supertest('http://localhost:3000')
          .put('/api/wallboards/' + wallboardId)
          .set('Content-Type', 'application/json')
          .send(wb6)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.containDeep(wb6);
            done();
          });
      });
    });

    });
  });
  
  describe('DELETE /api/wallboards/:wallboardId', function() {
    it('should delete a wallboard', function(done) {
      var wb7 = {name: "walboard #7"};

      wallboards.add(wb7, function(err, data) {
      var wallboardId = data._id;
      wallboards.get(wallboardId, function(err, wb) {
        should.not.exist(err);

        supertest('http://localhost:3000')
          .delete('/api/wallboards/' + wallboardId)
          .set('Content-Type', 'application/json')
          .send(wb7)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.n.should.eql(1);

            wallboards.get(wb._id, function(err, data) {
              should.not.exist(data);
              done();
            });

          });
      });
    });

    });
  });

});

