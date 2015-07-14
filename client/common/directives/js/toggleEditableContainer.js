"use strict";

require('./../_module_init.js')
  .directive('toggleEditableContainer',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/toggleEditableContainer.tpl.html',
        transclude: true,
        scope: {
        },
        link: function(scope, element, attrs) {
        }
      }
    }
  );
