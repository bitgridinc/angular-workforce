"use strict";

var db = require('../entities/entityStorage');

describe('the entity storage', function() {
  it('should initialize with three entities defined', function() {
    expect(db.getAllEntities().length).toBe(4);
  });
});
