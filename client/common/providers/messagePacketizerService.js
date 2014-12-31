"use strict";

require('./_module_init.js')
  .service('MessagePacketizer',
    [         '$rootScope',
      function($rootScope) {
        return {
          packetize: function(message, treeId, replyToId) {
            return {
              contents: message,
              metadata: {
                senderId: $rootScope.requestService.currentEntity.id,
                treeId: treeId,
                replyToId: replyToId
              }
            };
          }
        };
      }
    ]
  );
