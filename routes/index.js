var wallboards = require('./wallboards');
var system = require('./system');
var dataSources = require('./data_sources');

function index(req, res){
  res.render('index', { title: 'Dashound' });
};

function routes(app) {
  app.get('/', index);
  app.get('/index', index);

  wallboards.routes(app);
  system.routes(app);
  dataSources.routes(app);
};

module.exports = {
  routes: routes
};
