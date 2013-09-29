function routes(app) {
  app.get('/wallboards', list);
}

function list(req, res){
  res.send("wallboards! wooo!");
};

module.exports = {
  routes: routes
};
