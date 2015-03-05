"use strict";

require('./../_module_init.js')
  .directive('centeredImage',
    function() {
      return {
        restrict: 'E',
        scope: {
          iconUrl: '=',
          width: '='
        },
        template: '<img class="center-block" src="{{iconUrl}}">',
        link: function(scope, element, attrs) {
          if (angular.isDefined(scope.width)) {
            element.css('width', scope.width + 'px');
          }
        }
      }
    }
  );
