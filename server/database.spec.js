"use strict";

var db = require('./database');

describe('the database', function() {
  it('should initialize with three entities defined', function() {
    expect(db.getAllEntities().length).toBe(3);
  });
});
