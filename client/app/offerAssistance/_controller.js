"use strict";

require('./_module')
  .controller('OfferAssistanceController',
    [         '$scope',
      function($scope) {
        // For debugging purposes
        $scope.name = 'OfferAssistanceController';

        $scope.assistanceOffer = {};
      }
    ]
  );
