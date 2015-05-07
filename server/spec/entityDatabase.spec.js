"use strict";

var db = require('../inMemory/entities/entityDatabase');

describe('the entity database', function() {
  describe('when the aat env var is not present', function() {
    beforeEach(function() {
      // Arrange the environment so that our aat env var is not present
      delete process.env.aat;
    });

    it('should initialize with 4 entities defined', function() {
      expect(db.getAllEntities().length).toBe(4);
    });
    it('should return a different entity on each call', function() {
      // Act by calling getCurrentEntity twice
      var firstCallEntity = db.getCurrentEntity();
      var secondCallEntity = db.getCurrentEntity();

      // Assert that they are the same
      expect(firstCallEntity).not.toBe(secondCallEntity);
    });
  });

  describe('when the aat env var is present', function() {
    beforeEach(function() {
      // Arrange the environment to use our hardcoded data instead of hitting ArcGIS Online
      process.env.aat = true;
    });

    // This is necessary as I have code to switch the current entity for demo and hand-testing reasons
    it('should return the same entity on subsequent calls', function() {
      // Act by calling getCurrentEntity twice
      var firstCallEntity = db.getCurrentEntity();
      var secondCallEntity = db.getCurrentEntity();

      // Assert that they are the same
      expect(firstCallEntity).toBe(secondCallEntity);
    });
    it('should not return the Murfreesboro entity as our AATs would fail', function() {
      // Act by getting the entity
      var entity = db.getCurrentEntity();

      // Assert
      expect(entity.name).not.toContain('Murfreesboro');
    });
  });
});
