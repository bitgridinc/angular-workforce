"use strict";

require('./_module_init.js')
  .directive('coloredContainer',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/coloredContainer.tpl.html'
      }
    }
  );
