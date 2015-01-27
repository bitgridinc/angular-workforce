"use strict";

require('./_module_init.js')
  .service('RestService',
    [         '$http',
      function($http) {
        return {
          createBeacon: function(newBeaconData) {
            console.log('Sending data to create a new beacon:', newBeaconData);
            $http.post('/beacon', newBeaconData)
              .success(function(data, status, headers, config) {
                console.log('success!');
              })
              .error(function(data, status, headers, config) {
                console.log('error!');
              });
          },
          offerAssistance: function(newOfferData) {
            console.log('Sending data to create a new offer:', newOfferData);
            $http.post('/beacon/offer', newOfferData);
          }
        };
      }
    ]
  );
