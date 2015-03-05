"use strict";

require('./../_module_init.js')
  .service('MessagePacketizer',
    [         '$rootScope',
      function($rootScope) {
        return {
          // TODO: Somehow test that beaconId is passed in, the server requires
          packetize: function(contents, beaconId, recipientIds) {
            var packetizedMessage = {
              contents: contents,
              senderId: $rootScope.dataFromServer.currentEntity.id,
              beaconId: beaconId,
              recipientIds: recipientIds
            };
            console.log('Packetized:', packetizedMessage);
            return packetizedMessage;
          }
        };
      }
    ]
  );
