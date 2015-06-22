"use strict";

require('./_module')
  .controller('ButtonController',
    [         '$scope', '$rootScope', 'MessagePacketizerService', 'RestService',
      function($scope,   $rootScope,   MessagePacketizerService,   RestService) {
        // For debugging purposes
        $scope.name = 'ButtonController';

        $scope.respond = function(assist) {
          console.log("You've responded to a beacon with", assist);
          if (assist) {
            // TODO: Prevent responding to a null beacon
            var message = MessagePacketizerService.packetize($scope.assistanceOffer, $rootScope.selectionState.currentBeacon.id);
            RestService.offerAssistance(message);
          }

          $rootScope.userNavigationService.navigateTo('dashboard.beacons.list');
        };
      }
    ]
  );
