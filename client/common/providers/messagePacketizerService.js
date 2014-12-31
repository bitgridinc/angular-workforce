"use strict";

require('./_module_init.js')
  .service('MessagePacketizer',
    [         '$rootScope',
      function($rootScope) {
        return {
          packetize: function(contents, rootMessageId) {
            var packetizedMessage = {
              contents: contents,
              senderId: $rootScope.requestService.currentEntity.id,
              rootMessageId: rootMessageId
            };
            console.log('Packetized:', packetizedMessage);
            return packetizedMessage;
          }
        };
      }
    ]
  );
