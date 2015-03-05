"use strict";

var apiRoutes = require('../../../../shared/apiRoutes');

require('./../_module_init.js')
  .service('RestService',
    [         '$http',
      function($http) {
        return {
          createBeacon: function(newBeaconData) {
            console.log('Sending data to create a new beacon:', newBeaconData);
            $http.post(apiRoutes.createBeacon, newBeaconData);
          },
          offerAssistance: function(newOfferData) {
            console.log('Sending data to create a new offer:', newOfferData);
            $http.post(apiRoutes.offerAssistance, newOfferData);
          },
          acceptAssistance: function(acceptedOfferData) {
            console.log('Sending data to accept an offer:', acceptedOfferData);
            $http.post(apiRoutes.acceptAssistance, acceptedOfferData);
          }
        };
      }
    ]
  );
