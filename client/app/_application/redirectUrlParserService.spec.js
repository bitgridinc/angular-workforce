"use strict";

describe("the ArcGIS Online redirect URL parser", function() {
  var service;

  beforeEach(module("app"));
  beforeEach(inject(function(_RedirectUrlParserService_) {
    service = _RedirectUrlParserService_;
  }));

  it('should parse out the access token and username from an ArcGIS Online redirect', function() {
    // Arrange
    var redirectPath = '/access_token=OLLnGCVGkO&expires_in=7200&username=chairfield';

    // Act
    var result = service.parse(redirectPath);

    // Assert
    expect(result).toEqual({
      accessToken: 'OLLnGCVGkO',
      username: 'chairfield'
    });
  });
  it('should return undefined if the url is null', function() {
    // Arrange
    var url = null;

    // Act
    var result = service.parse(url);

    // Assert
    expect(result).toBeUndefined();
  })
});
