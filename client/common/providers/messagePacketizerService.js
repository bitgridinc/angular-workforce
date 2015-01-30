"use strict";

require('./_module_init.js')
  .service('MessagePacketizer',
    [         '$rootScope',
      function($rootScope) {
        return {
          // TODO: Somehow test that rootMessageId is passed in, the server requires
          packetize: function(contents, rootMessageId, recipientIds) {
            var packetizedMessage = {
              contents: contents,
              senderId: $rootScope.socketState.currentEntity.id,
              rootMessageId: rootMessageId,
              recipientIds: recipientIds
            };
            console.log('Packetized:', packetizedMessage);
            return packetizedMessage;
          }
        };
      }
    ]
  );
