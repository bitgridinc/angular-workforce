"use strict";

describe('the message sending service', function() {
  var socket,
      provider;

  beforeEach(module('modules.providers'));
  beforeEach(inject(function(_socket_, _MessageSendingService_) {
    socket = _socket_;
    provider = _MessageSendingService_;
  }));

  it('should utilize SocketIO to send messages to the server', function() {
    var message = {};

    spyOn(socket, 'emit');
    provider.send(message);
    expect(socket.emit).toHaveBeenCalledWith('message', message);
  });
});
