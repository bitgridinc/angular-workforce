"use strict";

require('./_module_init.js')
  .service('MessagePacketizer',
    [         '$rootScope',
      function($rootScope) {
        return {
          packetize: function(contents, rootMessageId, replyToId) {
            return {
              contents: contents,
              senderId: $rootScope.requestService.currentEntity.id,
              rootMessageId: rootMessageId,
              replyToId: replyToId
            };
          }
        };
      }
    ]
  );
