var repeat = require('repeat');
var request = require('superagent');
var dash = require('lodash');
var async = require('async');
var db = require('./db');

// TODO: this should probably by replaced by Square's cube project or something similar

var polls = [];

function startPoll(dataSource, callback) {
  // prevent starting polls that have already started
  if (dash.find(polls, {dataSourceId: dataSource._id})) {
    callback(null, dataSource);
    return;
  }

  function requestAndPush(done) {
    request
      .get(dataSource.url)
      .set('Accept', 'application/json')
      .end(function(err, data) {
        if (data && data.body) {
          pushMetric(dataSource, data && data.body, done);
        } else {
          done('No data from ' + dataSource.url);
        }
      });
  };

  var poll = repeat(requestAndPush).every(dataSource.interval, 'ms').start.now();
  poll.dataSourceId = dataSource._id;
  polls.push(poll);
  callback(null, dataSource);
};

function stopPoll(dataSource, callback) {
  var poll = dash.find({dataSourceId: dataSource._id});
  if (poll) {
    poll.stop();
  }
  callback(null, dataSource);
};

function pushMetric(dataSource, object, callback) {
  var now = new Date();
  var metric = {
    date: now,
    datasource_id: dataSource._id,
    value: object
  };
  db.datametrics.insert(metric, callback);
};

function query(dataSourceId, limit, callback) {
  db.datametrics.find({datasource_id: db.ObjectId(dataSourceId)}).sort({date: -1}).limit(limit, callback);
};

function startAllPolls(datasources, callback) {
  async.map(datasources, startPoll, callback)
};

module.exports = {
  start: startPoll,
  stop: stopPoll,
  push: pushMetric,
  query: query,
  startAllPolls: startAllPolls
};
