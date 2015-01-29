"use strict";

var db = require('./storage');

describe('the database', function() {
  it('should initialize with three entities defined', function() {
    expect(db.getAllEntities().length).toBe(3);
  });

  it('should save a new beacon', function() {
  });
});
