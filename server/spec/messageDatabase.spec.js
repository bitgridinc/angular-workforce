"use strict";

var db = require('../inMemory/messages/messageDatabase');

describe('the message database', function() {
  it('should have nothing for beacon -1', function() {
    expect(db.getMessagesByBeaconId(-1).length).toBe(0);
  });

  describe('during normal operation', function() {
    beforeEach(function() {
      // Arrange the environment so that our aat env var is not present
      delete process.env.aat;
    });

    it('should return no messages for beacon 30', function() {
      expect(db.getMessagesByBeaconId(30).length).toBe(0);
    });
    it('should return no messages for beacon 32', function() {
      expect(db.getMessagesByBeaconId(32).length).toBe(0);
    });
  });

  describe('during AATs', function() {
    beforeEach(function() {
      // Arrange the environment to use our hardcoded data instead of hitting ArcGIS Online
      process.env.aat = true;
    });

    describe('for beacon 30', function() {
      var messages;
      beforeEach(function() {
        // Act by getting messages for beacon 30
        messages = db.getMessagesByBeaconId(30);
      });
      it('should have one message', function() {
        expect(messages.length).toBe(1);
      });
      it('should be correctly formed for AAT testing purposes', function() {
        var message = messages[0];
        expect(message.id).toBe('2cf8faaa-5760-41c9-adbf-5a4482ac3469');
        expect(message.senderId).toBe('323f8a60-37c6-4d97-a2f8-331c2231e92b');
        expect(message.numResponders).toBe('4');
        expect(message.arrivalDate).toEqual(new Date(2015, 1, 1, 1, 1, 1));
      });
    });

    describe('for beacon 32', function() {
      var messages;
      beforeEach(function() {
        // Act by getting messages for beacon 32
        messages = db.getMessagesByBeaconId(32);
      });
      it('should have one message', function() {
        expect(messages.length).toBe(1);
      });
      it('should be correctly formed for AAT testing purposes', function() {
        var message = messages[0];
        expect(message.id).toBe('eb6cd1ad-d115-49de-aac0-cfbb887d9ad0');
        expect(message.senderId).toBe('7a95759f-3df8-4f16-bb43-24f4329fe3df');
        expect(message.numResponders).toBe('2');
        expect(message.arrivalDate).toEqual(new Date(2015, 1, 1, 1, 1, 1));
      });
    });
  });
});
