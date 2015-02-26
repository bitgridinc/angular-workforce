"use strict";

require('./_module_init.js')
  .directive('dateTimePicker',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/dateTimePicker.tpl.html',
        scope: {
          dtpModel: '=',
          dtpDateId: '@',
          dtpTimeId: '@',
          dtpDatePlaceholder: '@'
        },
        link: function(scope, element, attrs) {
          console.log('Hello', scope);
          if (angular.isUndefined(scope.dtpModel) || scope.dtpModel < new Date().getTime()) {
            scope.dtpModel = new Date();
          }
        }
      }
    }
  );
