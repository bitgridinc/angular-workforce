"use strict";

require('./_module')
  .controller('ReviewAssistanceBodyController',
    [         '_', '$scope', '$rootScope', 'MessagePacketizerService', 'RestService',
      function(_,   $scope,   $rootScope,   MessagePacketizerService,   RestService) {
        console.log('Entering ReviewAssistanceBodyController');

        $scope.currentBeacon = $rootScope.findBeaconById($rootScope.$stateParams.id);
        $scope.currentResponse = _.find($scope.currentBeacon.responses, function(response) {
          return response.id === $rootScope.$stateParams.responseId;
        });
        $scope.senderOrganization = $rootScope.findOrganizationById($scope.currentResponse.senderId);

        $scope.acceptAssistance = function() {
          // TODO: This is garbage :P
          console.log("Offering this many people to help: ", $scope.currentResponse.numResponders);
          var message = MessagePacketizerService.packetize($scope.currentResponse.id, $scope.selectionState.currentBeacon.id);
          RestService.acceptAssistance(message);
          $rootScope.userNavigationService.navigateTo('dashboard.beacons.list');
        };
      }
    ]
  );
