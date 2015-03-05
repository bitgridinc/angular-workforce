"use strict";

require('./../_module_init.js')
  .directive('organizationLabel',
    function() {
      return {
        restrict: 'E',
        scope: {
          organizationId: '='
        },
        template: '{{organization.name}}',
        controller: function($rootScope, $scope) {
          $scope.$watch('organizationId', function(newVal) {
            if (angular.isDefined(newVal)) {
              $scope.organization = $rootScope.findEntityById(newVal);
            }
          });
        }
      }
    }
  );
