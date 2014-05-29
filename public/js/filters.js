dashControllers.filter('intervalToDays', function() {
  return function(targetText) {
    var interval = new Date(targetText) - new Date();
    return Math.abs(Math.floor(interval / (1000 * 60 * 60 * 24))); // milliseconds -> days
  };
});

dashControllers.filter('intervalPreposition', function() {
  return function(targetText) {
    var interval = new Date(targetText) - new Date();
    return (interval > 0)? 'until': 'since';
  };
});

dashControllers.filter('keypath', function() {
  return function(input, path) {
    if (input) {
      return _.keypath(input, path);
    }
    return input;
  };
});

dashControllers.filter('sprintf', function() {
  return function(input, format) {
    if (input) {
      return sprintf(format, input);
    }
    return input;
  };
});
