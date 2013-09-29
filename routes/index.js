var wallboards = require('./wallboards');

function index(req, res){
  res.render('index', { title: 'Dashound' });
};

function routes(app) {
  app.get('/', index);
  app.get('/index', index);

  wallboards.routes(app);
};

module.exports = {
  routes: routes
};
