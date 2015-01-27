"use strict";

var apiRoutes = require('../../../shared/apiRoutes');

require('./_module_init.js')
  .service('RestService',
    [         '$http',
      function($http) {
        return {
          createBeacon: function(newBeaconData) {
            console.log('Sending data to create a new beacon:', newBeaconData);
            $http.post(apiRoutes.createBeacon, newBeaconData)
              .success(function(data, status, headers, config) {
                console.log('success!');
              })
              .error(function(data, status, headers, config) {
                console.log('error!');
              });
          },
          offerAssistance: function(newOfferData) {
            console.log('Sending data to create a new offer:', newOfferData);
            $http.post(apiRoutes.offerAssistance, newOfferData);
          }
        };
      }
    ]
  );
