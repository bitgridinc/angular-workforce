"use strict";

require('./_module_init.js')
  .service('MessageSendingService',
    [         'socket',
      function(socket) {
        return {
          send: function(message) {
            console.log('Sending message:', message);
            socket.emit('message', message);
          }
        };
      }
    ]
  );
