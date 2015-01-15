"use strict";

require('./_module_init.js')
  .directive('closeablePanel',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/closeablePanel.tpl.html'
      }
    }
  );
