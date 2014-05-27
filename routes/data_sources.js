var sources = require('../lib/data_sources');

function routes(app) {
  app.get('/api/data', listSources);
  app.post('/api/data', addSource);
  app.get('/api/data/:dataSourceId', getSource);
  app.put('/api/data/:dataSourceId', updateSource);
  app.delete('/api/data/:dataSourceId', deleteSource);
  app.get('/api/data/:dataSourceId/feed', loadDataFeed);
  app.get('/api/data/:dataSourceId/feed/:limit', loadDataFeed);
}

function listSources(req, res) {
  sources.list(function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function getSource(req, res) {
  sources.get(req.params.dataSourceId, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function addSource(req, res) {
  sources.add(req.body, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function updateSource(req, res) {
  sources.update(req.params.dataSourceId, req.body, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function deleteSource(req, res) {
  sources.delete(req.params.dataSourceId, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

function loadDataFeed(req, res) {
  sources.loadData(req.params.dataSourceId, req.params.limit || 1, function(err, data) {
    data = data || [];
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
};

module.exports = {
  routes: routes
};