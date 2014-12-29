"use strict";

require('./_module_init.js')
  .service('MessageSendingService',
    [         'socket',
      function(socket) {
        return {
          send: function(message, treeId, replyToId) {
            socket.emit('send:message', message, treeId, replyToId);
          }
        };
      }
    ]
  );
