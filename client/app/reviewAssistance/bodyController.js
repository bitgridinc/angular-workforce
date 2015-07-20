"use strict";

require('./_module')
  .controller('BodyController',
    [         '_', '$scope', '$rootScope', 'MessagePacketizerService', 'RestService',
      function(_,   $scope,   $rootScope,   MessagePacketizerService,   RestService) {
        console.log('Entering ReviewAssistanceBodyController');

        $rootScope.$watchCollection('dataFromServer.beacons', function(newValue) {
          console.log('dataFromServer.beacons changed', newValue);
          if (angular.isDefined(newValue) && newValue.length > 0) {
            $scope.currentBeacon = $rootScope.findBeaconById($rootScope.$stateParams.id);
            $scope.currentResponse = $scope.currentBeacon && _.find($scope.currentBeacon.responses, function(response) {
              return response.id === $rootScope.$stateParams.responseId;
            });
            $scope.senderOrganization = $scope.currentResponse && $rootScope.findOrganizationById($scope.currentResponse.senderId);
          }
        });

        $scope.acceptAssistance = function() {
          // TODO: This is garbage :P
          console.log("Offering this many people to help: ", $scope.currentResponse.numResponders);
          var message = MessagePacketizerService.packetize($scope.currentResponse.id, $scope.selectionState.currentBeacon.id);
          RestService.acceptAssistance(message);

          // Clear the watch we set in reviewAssistanceHeaderController
          $scope.responsesWatch();

          $rootScope.navigationService.navigateTo('dashboard.beacons.list');
        };
      }
    ]
  );
