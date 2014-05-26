dashControllers.directive('widget', function($compile) {
  return {
    restrict: 'E',
    scope: true,
    transclude: true,
    templateUrl: 'partials/widget.html',
    link: function(scope, element, attrs) {
      // update widget data to server when closing
      scope.showWidgetConfig = function() {
        if (scope.showConfig) {
          scope.$parent.$parent.updateCurrentWallboard();
        }
        scope.showConfig = !scope.showConfig;
      };

      // replace contents of .widget-content with new widget type
      scope.loadWidgetByType = function() {
        var w = angular.element('<' + scope.widget.type + '></' + scope.widget.type + '>');
        element.find('.widget-content').empty();
        element.find('.widget-content').append(w);
        $compile(w)(scope);
      };

      // change the widget type from config panel
      scope.changeWidgetType = function() {
        scope.loadWidgetByType();
      };

      // TODO: find out how to load widget types from subset of directives
      scope.widgetTypes = ['day-counter', 'list-data'];
      scope.loadWidgetByType();
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
    restrict: 'E',
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

dashControllers.directive('listData', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'partials/widgetListData.html',
    link: function(scope, element, attrs) {

      // set up config
      var userConfig = scope && scope.widget && scope.widget.config || {};
      var config = {label: 'Top Contributors', column: 'name', list: [{name: 'Alice'},{name: 'Bob'},{name: 'Carol'},{name: 'Dave'}], interval: 300000};
      angular.extend(config, userConfig);

      // Apply new config to scope
      scope.listText = angular.toJson(config.list);
      scope.widget.config = config;

      // Watch list data for changes, convert the text to json
      scope.$watch('listText', function() {
        scope.widget.config.list = angular.fromJson(scope.listText);
      });

      // setup refresh on configured interval
      setInterval(function() {
        scope.$apply();
      }, config.interval);
    }
  };
});
