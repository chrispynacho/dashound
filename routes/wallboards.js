var wallboards = require('../lib/wallboards');

function routes(app) {
  app.get('/wallboards', list);
  app.post('/wallboards', post);
  app.get('/wallboards/:wallboardId', get);
  app.put('/wallboards/:wallboardId', put);
  app.delete('/wallboards/:wallboardId', deleteWallboard);
}

function list(req, res) {
  wallboards.list(function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function get(req, res) {
  wallboards.get(req.params.wallboardId, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function post(req, res) {
  wallboards.add(req.body, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function put(req, res) {
  wallboards.update(req.params.wallboardId, req.body, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function deleteWallboard(req, res) {
  wallboards.delete(req.params.wallboardId, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

module.exports = {
  routes: routes
};
