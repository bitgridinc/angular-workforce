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
    var treeId = "634",
        replyToId = "8584",
        message = {};

    spyOn(socket, 'emit');
    provider.send(treeId, replyToId, message);
    expect(socket.emit).toHaveBeenCalledWith('send:message', treeId, replyToId, message);
  });
});
