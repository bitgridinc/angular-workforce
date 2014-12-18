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
          } else if (angular.isUndefined($scope.organization.name)) {
            console.log('organization.name is undefined and it never should be');
          }
        }
      }
    }
  );
