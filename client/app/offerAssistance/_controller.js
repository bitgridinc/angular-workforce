"use strict";

require('./_module')
  .controller('OfferAssistanceController',
    [         '$scope', '$rootScope', 'MessagePacketizerService', 'RestService',
      function($scope,   $rootScope,   MessagePacketizerService,   RestService) {
        // For debugging purposes
        $scope.name = 'OfferAssistanceController';

        RestService.getAllUsers().then(function(users) {
          $scope.users = users.data.users;
        });

        $scope.selectionState = $rootScope.selectionState;
        $scope.assistanceOffer = {
          numResponders: 2
        };

        $scope.respond = function(assist) {
          console.log("You've responded to a beacon with", assist);
          if (assist) {
            // TODO: Prevent responding to a null beacon
            var message = MessagePacketizerService.packetize($scope.assistanceOffer, $scope.selectionState.currentBeacon.id);
            RestService.offerAssistance(message);
          }
          $rootScope.userNavigationService.navigateTo('dashboard.beacons.list');
        };
      }
    ]
  );
