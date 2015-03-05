"use strict";

require('./../_module_init.js')
  .directive('iconContainer',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/iconContainer.tpl.html',
        transclude: true,
        scope: {
          iconUrl: '@'
        },
        link: function(scope, element, attrs) {
          if (angular.isDefined(scope.height)) {
            element.css('height', scope.height + 'px');
          }
        }
      }
    }
  );
