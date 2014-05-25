var dashServices = angular.module('dashServices', ['ngResource']);

dashServices.factory('Wallboards', ['$resource',
  function($resource) {
    return $resource('/api/wallboards/:wallboardId', {wallboardId:'@_id'}, {'update':{method:'PUT'}});
  }
]);