"use strict";

describe("the map module (unit)", function() {
  var scope,
      controller;

  beforeEach(module("app"));
  beforeEach(module("modules.providers"));
  beforeEach(module("modules.map"));
  beforeEach(inject(function($rootScope, $controller) {
    $rootScope.socketState = {
      currentEntity: {
        center: {
          lat: 1,
          lng: 2,
          zoom: 3
        }
      }
    };
    scope = $rootScope.$new();
    controller = $controller('MapController', {
      '$scope': scope
    });
  }));

  it('should define a defaults object', function() {
    expect(scope.defaults).toBeDefined();
    // This must be an empty string. Leaving it undefined negatively impacts performance as does not defining it.
    expect(scope.defaults.tileLayer).toBe("");
    expect(scope.defaults.zoomControl).toBe(false);
  });
  it('should define a center object', function() {
    expect(scope.socketState.currentEntity.center).toBeDefined();
    expect(scope.socketState.currentEntity.center.lat).toBeDefined();
    expect(scope.socketState.currentEntity.center.lng).toBeDefined();
    expect(scope.socketState.currentEntity.center.zoom).toBeDefined();
  });
});
