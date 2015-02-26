"use strict";

require('./_module_init.js')
  .directive('dateTimePicker',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/dateTimePicker.tpl.html',
        scope: {
          model: '='
        }
      }
    }
  );
