"use strict";

require('./_module')
  .controller('OfferAssistanceController',
    [         '$scope', '$rootScope',
      function($scope,   $rootScope) {
        // For debugging purposes
        $scope.name = 'OfferAssistanceController';

        $scope.assistanceOffer = {
          numResponders: 2
        };
      }
    ]
  );
