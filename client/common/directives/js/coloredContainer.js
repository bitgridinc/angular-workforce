"use strict";

require('./../_module_init.js')
  .directive('coloredContainer',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/coloredContainer.tpl.html',
        transclude: true,
        scope: {
          height: '='
        },
        link: function(scope, element, attrs) {
          if (angular.isDefined(scope.height)) {
            var cleanup;

            cleanup = scope.$watch('height', function() {
              element.css('height', scope.height + 'px');
            });

            element.css('height', scope.height + 'px');

            scope.$on('$destroy', function() {
              cleanup();
            });
          }
        }
      }
    }
  );
