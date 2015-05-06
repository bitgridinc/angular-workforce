var io = require('socket.io-client')
  , constants = require('./constants');

var options = {
  transports: ['websocket'],
  'force new connection': true
};

module.exports = function() {
  return io.connect(constants.serverUrl, options);
};