"use strict";

require('./_module')
  // TODO: Mock backend so I can AAT this.
  .controller('ReviewAssistanceBodyController',
    [         '_', '$scope', '$rootScope', '$state', '$stateParams', 'MessagePacketizer', 'RestService',
      function(_,   $scope,   $rootScope,   $state,   $stateParams,   MessagePacketizer,   RestService) {
        console.log('Entering ReviewAssistanceBodyController');

        var currentBeacon = $rootScope.findBeaconById($stateParams.id);
        $scope.currentItem = _.find(currentBeacon.responses, function(response) {
          return response.id === $stateParams.responseId;
        });
        $scope.currentEntity = $rootScope.findEntityById($scope.currentItem.senderId);

        $scope.acceptAssistance = function() {
          // TODO: This is garbage :P
          console.log("Offering this many people to help: ", $scope.currentItem.numResponders);
          var message = MessagePacketizer.packetize($scope.currentItem.id, $scope.selectionState.currentBeacon.id);
          RestService.acceptAssistance(message);
          $state.go('dashboard.beacons.list');
        };
      }
    ]
  );
