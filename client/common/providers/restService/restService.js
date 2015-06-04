"use strict";

var apiRoutes = require('../../../../shared/apiRoutes');

require('./../_module_init.js')
  .service('RestService',
    [         '$http',
      function($http) {
        return {
          createBeacon: function(newBeaconData) {
            console.log('Sending data to create a new beacon:', newBeaconData);
            return $http.post(apiRoutes.createBeacon, newBeaconData);
          },
          offerAssistance: function(newOfferData) {
            console.log('Sending data to create a new offer:', newOfferData);
            return $http.post(apiRoutes.offerAssistance, newOfferData);
          },
          acceptAssistance: function(acceptedOfferData) {
            console.log('Sending data to accept an offer:', acceptedOfferData);
            return $http.post(apiRoutes.acceptAssistance, acceptedOfferData);
          },
          getAllUsers: function() {
            console.log('Getting all users of our organization: ');
            return $http.get(apiRoutes.getAllUsers);
          }
        };
      }
    ]
  );
