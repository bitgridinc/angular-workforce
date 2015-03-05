"use strict";

require('./_module')
  .controller('OfferAssistanceController',
    [         '$scope', '$rootScope', '$state', 'MessagePacketizer', 'RestService',
      function($scope,   $rootScope,   $state,   MessagePacketizer,   RestService) {
        // For debugging purposes
        $scope.name = 'OfferAssistanceController';

        $scope.selectionState = $rootScope.selectionState;
        $scope.assistanceOffer = {
          numResponders: 2,
          arrivalDate: new Date()
        };

        $scope.open = function($event) {
          console.log("open called.", $event);
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
        };

        $scope.respond = function(assist) {
          console.log("You've responded to a beacon with", assist);
          if (assist) {
            // TODO: Prevent responding to a null beacon
            var message = MessagePacketizer.packetize($scope.assistanceOffer, $scope.selectionState.currentBeacon.id);
            RestService.offerAssistance(message);
          }
          $state.go('dashboard.beacons.list');
        };
      }
    ]
  );
