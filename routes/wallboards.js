var db = require('../lib/db');

function routes(app) {
  app.get('/wallboards', list);
}

function list(req, res){
  db.get('wallboards', function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

module.exports = {
  routes: routes
};
