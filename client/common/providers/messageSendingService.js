"use strict";

require('./_module_init.js')
  .service('MessageSendingService',
    [         'socket',
      function(socket) {
        return {
          send: function(treeId, replyToId, message) {
            socket.emit('send:message', treeId, replyToId, message);
          }
        };
      }
    ]
  );
