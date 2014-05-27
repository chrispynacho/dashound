var dashServices = angular.module('dashServices', ['ngResource']);

dashServices.factory('Wallboards', ['$resource',
  function($resource) {
    return $resource('/api/wallboards/:wallboardId', {wallboardId:'@_id'}, {'update':{method:'PUT'}});
  }
]);

dashServices.factory('DataSources', ['$resource',
  function($resource) {
    return $resource('/api/data/:dataSourceId', {dataSourceId:'@_id'},
      {
        'update': {method: 'PUT'},
        'feed': {method: 'GET', url: '/api/data/:dataSourceId/feed', isArray: true}
      }
    );
  }
]);
