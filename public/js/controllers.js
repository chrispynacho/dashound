var dashControllers = angular.module('dashControllers', []);

dashControllers.controller('WallboardCtrl', ['$scope', 'Wallboards',
  function WallboardCtrl($scope, Wallboards) {
    $scope.editing = false;
    Wallboards.query(function(wallboards) {
      $scope.wallboards = wallboards;
      $scope.currentWallboard = $scope.wallboards[0];
    });

    $scope.showAddWallboard = function showAddWallboard() {
      $scope.editing = true;
      $scope.currentWallboard = {name: 'New Wallboard', widgets: [{name: 'New Widget'}]};
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

    $scope.selectWallboard = function selectWallboard() {
      console.log('selectWallboard: ', $scope.currentWallboard.name);
      console.log('        widgets: ', $scope.currentWallboard.widgets);
    };

    $scope.updateCurrentWallboard = function updateCurrentWallboard(callback) {
      Wallboards.update($scope.currentWallboard, function(wb) {
        $scope.wallboards = Wallboards.query(callback);
      });
    }

    $scope.addWidget = function addWidget() {
      var widgets = $scope.currentWallboard.widgets = $scope.currentWallboard.widgets || [];
      var widget = {name: 'New Widget' + (widgets.length + 1)};
      widgets.push(widget);
      
      $scope.updateCurrentWallboard();
    };

    $scope.deleteWidget = function deleteWidget(widget, index) {
      var widgets = $scope.currentWallboard.widgets;
      widgets.splice(index, 1);

      $scope.updateCurrentWallboard();
    };
  }
]);
