var dashServices = angular.module('dashServices', ['ngResource']);

dashServices.factory('Wallboards', ['$resource',
    function($resource) {
        return $resource('/api/wallboards', {}, {
            query: {method: 'GET', isArray: true}
        });
    }
]);