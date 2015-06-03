"use strict";

var apiRoutes = require('../../../../shared/apiRoutes');

require('./../_module_init.js')
  .service('RestService',
    [         '_', '$http',
      function(_,   $http) {
        return {
          createBeacon: function(newBeaconData, errorCallback) {
            var errors = _.filter(['title', 'description', 'streetAddress', 'zip', 'numberOfPeople'], function(requiredProperty) {
              /* jshint -W116 */
              return newBeaconData[requiredProperty] == null || // Type coercion covers both null and undefined
              /* jshint +W116 */
                     newBeaconData[requiredProperty] === '';
            });

            if (errors.length > 0) {
              console.log('New beacon data had the following errors:', newBeaconData, errors);
              errorCallback(errors);
            } else {
              console.log('Sending data to create a new beacon:', newBeaconData);
              $http.post(apiRoutes.createBeacon, newBeaconData);
            }
          },
          offerAssistance: function(newOfferData) {
            console.log('Sending data to create a new offer:', newOfferData);
            $http.post(apiRoutes.offerAssistance, newOfferData);
          },
          acceptAssistance: function(acceptedOfferData) {
            console.log('Sending data to accept an offer:', acceptedOfferData);
            $http.post(apiRoutes.acceptAssistance, acceptedOfferData);
          },
          getAllUsers: function() {
            console.log('Getting all users of our organization: ');
            return $http.get(apiRoutes.getAllUsers);
          }
        };
      }
    ]
  );
