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

      // TODO: find out how to introspect directives to get list of them, exclude 'widget'
      scope.widgetTypes = ['day-counter', 'list-data', 'live-value', 'line-graph'];
      scope.loadWidgetByType();
    }
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
      var config = {label: 'Unix Epoch', date: '1970-01-01', interval: 60000};
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

dashControllers.directive('liveValue', ['DataSources',
  function (DataSources) {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'partials/widgetLiveValue.html',
      link: function(scope, element, attrs) {
        var userConfig = (scope && scope.widget && scope.widget.config) || {};
        var config = {label: 'Server Load', keyPath: '0.value.one', dataSourceId: '0', interval: 5000};
        angular.extend(config, userConfig);

        DataSources.query(function(datasources) {
          scope.datasources = datasources;
          scope.loadDataFeed();
        });

        scope.loadDataFeed = function loadDataFeed() {
          DataSources.feed({'dataSourceId': scope.widget.config.dataSourceId._id}, function(dataFeed) {
            scope.dataFeed = dataFeed || [];
          });
        };

        setInterval(function() {
          scope.loadDataFeed();
          scope.$apply();
        }, config.interval);
      }
    };
  }
]);

dashControllers.directive('lineGraph', ['DataSources',
  function (DataSources) {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'partials/widgetLineGraph.html',
      link: function(scope, element, attrs) {
        // set up config
        var userConfig = (scope && scope.widget && scope.widget.config) || {};
        var config = {label: 'Server Load', keyPath: 'value.one', dataSourceId: '0', interval: 10000};
        angular.extend(config, userConfig);

        var svg = d3.select(element.find('svg')[0]);

        // Load list of datasources - then load data from source in config
        DataSources.query(function(datasources) {
          scope.datasources = datasources;
          scope.loadDataFeed();
        });

        // Loads data feed
        scope.loadDataFeed = function loadDataFeed() {
          DataSources.feed({'dataSourceId': scope.widget.config.dataSourceId._id, limit: 50}, function(dataFeed) {
            dataFeed = _.map(dataFeed, function (item) {
              return _.keypath(item, scope.widget.config.keyPath);
            });
            scope.dataFeed = dataFeed || [];
            scope.render(scope.dataFeed);
          });
        };

        // Render Graph
        scope.render = function render(data) {
          svg.selectAll('*').remove();

          if (!data) return;

          var width = element.find('.widget-content').width();
          var height = element.find('.widget-content').height();

          svg.attr('width', width)
            .attr('height', height);

          var linearScale = d3.scale.linear()
            .domain([0, 8])
            .range([0, 200]);

          var lineFunction = d3.svg.line()
            .x(function (d, i) { return i * (width / 50); })
            .y(function (d) { return linearScale(d); })
            .interpolate('cardinal');

          var lineGraph = svg.append('path')
            .attr('d', lineFunction(data))
            .attr('stroke', '#66A')
            .attr('stroke-width', 3);
        };

        // Update data using interval from config
        setInterval(function() {
          scope.loadDataFeed();
          scope.$apply();
        }, config.interval);
      }
    };
  }
]);
