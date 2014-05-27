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