dashControllers.directive('widget', function($compile) {
  return {
    restrict: 'E',
    scope: true,
    transclude: true,
    templateUrl: 'partials/widget.html',
    link: function(scope, element, attrs) {
      // load sub-widget by name
      var w = angular.element('<' + scope.widget.name + '></' + scope.widget.name + '>');
      element.append(w);
      $compile(w)(scope);
    }
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
      var config = {label: 'Unix Epoch', date: '1970-01-01 00:00:00', interval: 1000};
      angular.extend(config, userConfig);

      // update
      function updateTime() {
        var current = new Date();
        var target = new Date(config.date);
        var days = Math.floor((target - current) / (1000 * 60 * 60 * 24));

        console.log(days, 'days');
        scope.days = days;
        scope.preposition = (days > 0)? 'until': 'since';
      };

      // setup refresh
      setInterval(updateTime, config.interval);
      updateTime();
    }
  };
});
