"use strict";

describe("beaconService", function() {
  var beaconService;

  beforeEach(module("app.services"));

  beforeEach(inject(function(_beaconService_) {
    beaconService = _beaconService_;
  }));

  it('should return the same information it was passed', function() {
    var expected = {
      org: "name"
    };
    var actual = beaconService.createBeacon(expected);
    expect(actual).toEqual(expected);
  });
});
