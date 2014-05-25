dashControllers.directive('widget', function() {
  return {
    restrict: 'E',
    scope: true,
    template: '<div>{{widget.name}}</div>',
    link: function(scope, element, attrs) {
      console.log('widget', scope, element, attrs);
    }
  };
});