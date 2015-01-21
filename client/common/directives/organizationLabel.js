"use strict";

require('./_module_init.js')
  .directive('organizationLabel',
    function() {
      return {
        restrict: 'E',
        scope: {
          organization: '='
        },
        template: '{{organization.name}}',
        controller: function($scope) {
          if (angular.isUndefined($scope.organization)) {
            console.log('organization is undefined and it never should be');
          } else if (!angular.isObject($scope.organization)) {
            console.log('organization isn\'t an object and it must be.');
          } else if (angular.isUndefined($scope.organization.name)) {
            console.log('organization.name is undefined and it never should be');
          } else if (!angular.isString($scope.organization.name)) {
            console.log('organization.name isn\'t a string is and must be');
          }
        }
      }
    }
  );
