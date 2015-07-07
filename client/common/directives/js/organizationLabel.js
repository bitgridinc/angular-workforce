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
        controller: [
                  '$rootScope', '$scope',
          function($rootScope,   $scope) {
            var cleanup;
            cleanup = $scope.$watch('organizationId', function(newVal) {
              if (angular.isDefined(newVal)) {
                $scope.organization = $rootScope.findOrganizationById(newVal);
              }
            });
            $scope.$on('$destroy', function() {
              cleanup();
            });
          }
        ]
      }
    }
  );
