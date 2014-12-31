"use strict";

require('./_module_init.js')
  .service('MessagePacketizer',
    [         '$rootScope',
      function($rootScope) {
        return {
          packetize: function(message, rootMessageId, replyToId) {
            return {
              contents: message,
              senderId: $rootScope.requestService.currentEntity.id,
              rootMessageId: rootMessageId,
              replyToId: replyToId
            };
          }
        };
      }
    ]
  );
