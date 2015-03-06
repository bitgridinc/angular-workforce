"use strict";

require('./../_module_init.js')
  .directive('acceptedAssistanceSummary',
    function() {
      return {
        restrict: 'E',
        scope: {
          acceptedAssistance: '='
        },
        template: '<div class="panel panel-info">' +
                    '<organization-label organization-id="acceptedAssistance.senderId"></organization-label> ' +
                    'is coming with ' +
                    '{{acceptedAssistance.numResponders}} people at ' +
                    '{{acceptedAssistance.arrivalDate}}.' +
                  '</div>',
        controller: [
                  '$scope',
          function($scope) {
            if (angular.isUndefined($scope.acceptedAssistance)) {
              console.log('acceptedAssistance is undefined and it never should be');
            } else if (!angular.isObject($scope.acceptedAssistance)) {
              console.log('acceptedAssistance isn\'t an object and it must be.');
            }
            // TODO: We'd like the functionality to log if the object isn't how we expect, but I don't like checking
            // TODO: against every property here. Consider alternatives.
          }
        ]
      }
    }
  );
