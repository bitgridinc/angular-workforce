"use strict";

require('./../_module_init.js')
  .directive('dateTimePicker',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/dateTimePicker.tpl.html',
        scope: {
          dtpModel: '=',
          dtpDateId: '@',
          dtpTimeId: '@',
          dtpDatePlaceholder: '@'
        }
      }
    }
  );
