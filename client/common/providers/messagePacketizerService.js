"use strict";

require('./_module_init.js')
  .service('MessagePacketizer',
    [         '$rootScope',
      function($rootScope) {
        return {
          // TODO: Somehow test that rootMessageId is passed in, the server requires
          packetize: function(contents, rootMessageId) {
            var packetizedMessage = {
              contents: contents,
              senderId: $rootScope.socketState.currentEntity.id,
              rootMessageId: rootMessageId
            };
            console.log('Packetized:', packetizedMessage);
            return packetizedMessage;
          }
        };
      }
    ]
  );
