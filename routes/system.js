var os = require('os');

function routes(app) {
  app.get('/api/system/load', load);
  app.get('/api/system/memory', memory);
}

function load(req, res) {
  var loadData = os.loadavg();
  var load = {
    one: loadData[0],
    five: loadData[1],
    fifteen: loadData[2]
  };
  res.send(load);
};

function memory(req, res) {
  var mem = {
    total: os.totalmem(),
    free: os.freemem()
  };
  res.send(mem);
};

module.exports = {
  routes: routes
};