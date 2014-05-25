dashControllers.directive('widget', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'partials/widget.html',
    link: function(scope, element, attrs) {
      console.log('widget', scope, element, attrs);
    }
  };
});