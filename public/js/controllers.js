var dashControllers = angular.module('dashControllers', []);

dashControllers.controller('WallboardCtrl', ['$scope', 'Wallboards',
  function WallboardCtrl($scope, Wallboards) {
    $scope.editing = false;
    $scope.wallboards = Wallboards.query();
    $scope.currentWallboard = $scope.wallboards[0];

    $scope.showAddWallboard = function showAddWallboard() {
      $scope.editing = true;
      $scope.currentWallboard = {name: "New Wallboard"};
    };

    $scope.addWallboard = function addWallboard() {
      Wallboards.save($scope.currentWallboard, function(wb) {
        $scope.editing = false;
        $scope.wallboards = Wallboards.query();
      });
    };

    $scope.removeWallboard = function removeWallboard() {
      $scope.currentWallboard.$delete(function() {
        $scope.wallboards = Wallboards.query();
      });
    };

  }
]);
