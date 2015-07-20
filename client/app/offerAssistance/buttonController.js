"use strict";

require('./_module')
  .controller('ButtonController',
    [         '$scope', 'MessagePacketizerService', 'RestService',
      function($scope,   MessagePacketizerService,   RestService) {
        // For debugging purposes
        $scope.name = 'ButtonController';

        $scope.respond = function(assist) {
          console.log("You've responded to a beacon with", assist);
          if (assist) {
            // TODO: Prevent responding to a null beacon
            var message = MessagePacketizerService.packetize($scope.assistanceOffer);
            RestService.offerAssistance(message);
          }

          $scope.navigationService.navigateTo('dashboard.beacons.list');
        };
      }
    ]
  );
