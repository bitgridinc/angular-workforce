"use strict";

describe("the map module", function() {
  var scope,
      controller;

  // TODO: I need this to load the BeaconService, but is there a better way?
  beforeEach(module("modules.services"));
  beforeEach(module("modules.map"));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('MapController', {
      '$scope': scope
    });
  }));

  it('should define a defaults object', function() {
    expect(scope.defaults).toBeDefined();
  });
  it('should define a center object', function() {
    expect(scope.center).toBeDefined();
  });
  it('should define a markers array', function() {
    expect(scope.markers).toBeDefined();
  });

  describe('the defaults object', function() {
    it('should define the tileLayer property', function() {
      expect(scope.defaults.tileLayer).toBeDefined();
    });
    it('should disable the zoom control', function() {
      expect(scope.defaults.zoomControl).toBe(false);
    });
  });

  describe('the center object', function() {
    it('should define a lat property', function() {
      expect(scope.center.lat).toBeDefined();
    });
    it('should define a lng property', function() {
      expect(scope.center.lng).toBeDefined();
    });
    it('should define a zoom property', function() {
      expect(scope.center.zoom).toBeDefined();
    });
  });
});
