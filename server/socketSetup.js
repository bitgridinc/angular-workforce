/* jslint node: true */
"use strict";

var SocketIO = require('socket.io');

// TODO: Verify if this is needed and test
module.exports = function(server){
  console.log('starting socketIO server');

  if(module.exports.instance !== undefined){
    console.log('already initialized', server);
    return;
  }

  module.exports.instance = SocketIO.listen(server.listener);
};
