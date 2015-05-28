"use strict";

var db = require('../inMemory/messages/messageDatabase')
  , dbBackend = require('../inMemory/messages/messageDatabase.test.js')
  , factories = require('../../shared/factories')
  , environment = require('../environment.js');

describe('the message database', function() {
  it('should have nothing for beacon -1', function() {
    expect(db.getMessagesByBeaconId(-1).length).toBe(0);
  });

  describe('in Production', function() {
    beforeEach(function() {
      environment.changeToProductionMode();
    });

    describe('the getMessagesByBeaconId method', function() {
      it('should return no messages for beacon 30', function() {
        expect(db.getMessagesByBeaconId(30).length).toBe(0);
      });
      it('should return no messages for beacon 32', function() {
        expect(db.getMessagesByBeaconId(32).length).toBe(0);
      });
    });
    describe('the saveMessage method', function() {
      it('should make the message available for retrieval', function() {
        // Use a beaconId that ArcGIS is designed never to return (they start at 1)
        var beaconId = -1;

        // Assert the precondition that database doesn't have the message already (just to be safe)
        expect(db.getMessagesByBeaconId(beaconId).length).toBe(0);

        // Arrange a message to add
        var message = factories.newAssistanceResponseFactory()
                               .withIds('eb6cd1ad-d115-49de-aac0-cfbb887d9ad0', '7a95759f-3df8-4f16-bb43-24f4329fe3df', beaconId)
                               .withResponderCrew('1337', new Date(2015, 1, 1, 1, 1, 1))
                               .createAssistanceResponse();

        // Act by adding it to the database
        db.saveMessage(message);

        // Assert it's there now
        expect(db.getMessagesByBeaconId(beaconId).length).toBe(1);
      });
    });
  });

  describe('in Test', function() {
    beforeEach(function() {
      environment.changeToTestMode();
    });

    describe('for beacon 30', function() {
      var messages;
      beforeEach(function() {
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

    describe('the saveMessage method', function() {
      it('should make the message available for retrieval', function() {
        // Use a beaconId that will break other tests if this is not cleaned up
        var beaconId = 31;

        // Assert the precondition that database doesn't have the message already (just to be safe)
        expect(db.getMessagesByBeaconId(beaconId).length).toBe(0);

        // Arrange a message to add
        var message = factories.newAssistanceResponseFactory()
                               .withIds('eb6cd1ad-d115-49de-aac0-cfbb887d9ad0', '7a95759f-3df8-4f16-bb43-24f4329fe3df', beaconId)
                               .withResponderCrew('1337', new Date(2015, 1, 1, 1, 1, 1))
                               .createAssistanceResponse();

        // Act by adding it to the database
        db.saveMessage(message);

        // Assert it's there now
        expect(db.getMessagesByBeaconId(beaconId).length).toBe(1);

        // Clean up what we created
        dbBackend.pop();
      });
    });
  });
});
