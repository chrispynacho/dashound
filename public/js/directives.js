dashControllers.directive('widget', function($compile) {
  return {
    restrict: 'E',
    scope: true,
    transclude: true,
    templateUrl: 'partials/widget.html',
    link: function(scope, element, attrs) {
      scope.widgetTypes = ['day-counter'];
      // load sub-widget by name
      var w = angular.element('<' + scope.widget.name + '></' + scope.widget.name + '>');
      element.append(w);
      $compile(w)(scope);

      scope.showWidgetConfig = function() {
        scope.showConfig = !scope.showConfig;
        scope.$parent.$parent.updateCurrentWallboard();
      }
    }
  };
});

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

dashControllers.directive('dayCounter', function() {
  return {
    restrict: 'AEC',
    scope: true,
    templateUrl: 'partials/widgetDayCounter.html',
    link: function(scope, element, attrs) {
      // set up config
      var userConfig = scope && scope.widget && scope.widget.config || {};
      var config = {label: 'Unix Epoch', date: '1970-01-01', interval: 1000};
      angular.extend(config, userConfig);

      // setup refresh on configured interval
      setInterval(function() {
        scope.$apply();
      }, config.interval);
    }
  };
});
