var dashApp = angular.module('dashApp', [
  'ngRoute',
  'dashControllers',
  'dashServices'
  ]);

dashApp.config(['$routeProvider', '$locationProvider', 
  function routes($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'partials/wallboards.html',
      controller: 'WallboardCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  }
  ]);
