"use strict";

require('./_module')
  // TODO: Mock backend so I can AAT this.
  .controller('ReviewAssistanceBodyController',
    [         '_', '$scope', '$rootScope', 'MessagePacketizerService', 'RestService',
      function(_,   $scope,   $rootScope,   MessagePacketizerService,   RestService) {
        console.log('Entering ReviewAssistanceBodyController');

        var currentBeacon = $rootScope.findBeaconById($rootScope.$stateParams.id);
        $scope.currentItem = _.find(currentBeacon.responses, function(response) {
          return response.id === $rootScope.$stateParams.responseId;
        });
        $scope.currentEntity = $rootScope.findEntityById($scope.currentItem.senderId);

        $scope.acceptAssistance = function() {
          // TODO: This is garbage :P
          console.log("Offering this many people to help: ", $scope.currentItem.numResponders);
          var message = MessagePacketizerService.packetize($scope.currentItem.id, $scope.selectionState.currentBeacon.id);
          RestService.acceptAssistance(message);
          $rootScope.$state.go('dashboard.beacons.list');
        };
      }
    ]
  );
