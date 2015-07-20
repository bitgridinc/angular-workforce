"use strict";

require('./../_module_init.js')
  .service('MessagePacketizerService',
    [         '$rootScope',
      function($rootScope) {
        return {
          // TODO: Somehow test that beaconId is passed in, the server requires
          packetize: function(contents, recipientIds) {
            if (angular.isUndefined($rootScope.$stateParams) ||
                angular.isUndefined($rootScope.$stateParams.id)) {
              throw new Error('No beacon is selected');
            }

            var packetizedMessage = {
              contents: contents,
              senderId: $rootScope.dataFromServer.currentOrganization.id,
              beaconId: $rootScope.$stateParams.id,
              recipientIds: recipientIds
            };
            console.log('Packetized:', packetizedMessage);
            return packetizedMessage;
          }
        };
      }
    ]
  );
