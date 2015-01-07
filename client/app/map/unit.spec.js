"use strict";

describe("the map module (unit)", function() {
  var scope,
      controller;

  beforeEach(module("app"));
  beforeEach(module("modules.providers"));
  beforeEach(module("modules.map"));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('MapController', {
      '$scope': scope
    });
  }));

  it('should define a defaults object', function() {
    expect(scope.defaults).toBeDefined();
    expect(scope.defaults.tileLayer).toBeDefined();
    expect(scope.defaults.zoomControl).toBe(false);
  });
  it('should define a center object', function() {
    expect(scope.center).toBeDefined();
    expect(scope.center.lat).toBeDefined();
    expect(scope.center.lng).toBeDefined();
    expect(scope.center.zoom).toBeDefined();
  });
});
