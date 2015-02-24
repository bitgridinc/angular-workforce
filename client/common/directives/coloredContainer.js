"use strict";

require('./_module_init.js')
  .directive('coloredContainer',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/coloredContainer.tpl.html',
        transclude: true,
        scope: {
          height: '='
        },
        link: function(scope, element, attrs) {
          if (angular.isDefined(scope.height)) {
            scope.$watch('height', function() {
              element.css('height', scope.height + 'px');
            });

            element.css('height', scope.height + 'px');
          }
        }
      }
    }
  );
