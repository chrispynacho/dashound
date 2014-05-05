var wallboards = require('../lib/wallboards');

function routes(app) {
  app.get('/wallboards', list);
  app.get('/wallboards/:wallboardId', get);
}

function list(req, res){
  wallboards.list(function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function get(req, res){
  wallboards.get(req.params.wallboardId, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

module.exports = {
  routes: routes
};
