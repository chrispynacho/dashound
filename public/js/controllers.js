var dashControllers = angular.module('dashControllers', []);

dashControllers.controller('WallboardCtrl', ['$scope', 'Wallboards',
    function WallboardCtrl($scope, Wallboards) {
        $scope.wallboards = Wallboards.query();
    }
]);
