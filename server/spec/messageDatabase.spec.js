"use strict";

var db = require('../inMemory/messages/messageDatabase')
  , factories = require('../../shared/factories')
  , environment = require('../environment.js');

describe('the message database', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  it('should have nothing for beacon -1', function() {
    expect(db.getMessagesByBeaconId(-1).length).toBe(0);
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
