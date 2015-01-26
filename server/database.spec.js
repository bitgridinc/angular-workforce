"use strict";

var db = require('./database');

describe('the database', function() {
  it('should initialize with three entities defined', function() {
    expect(db.getAllEntities().length).toBe(3);
  });

  it('should save a new beacon', function() {
    var beacon = {
      title: 'a',
      description: 'b',
      lat: 1,
      lng: 2
    };

    db.getAllEntities().get(0);
    db.createNewBeacon(beacon);
  });
});
