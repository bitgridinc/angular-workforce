"use strict";

describe('the module that displays the Leaflet map (modules.leaflet)', function() {
  var module;
  beforeEach(function() {
    module = angular.module('modules.leaflet');
  });

  it('should be registered with Angular', function() {
    expect(module).toBeDefined();
  });

  describe('and its dependencies', function() {
    var deps;
    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };
    beforeEach(function() {
      deps = module.value('modules.leaflet').requires;
    });

    it ('should include leaflet-directive, which wraps Leaflet in Angular directives', function() {
      expect(hasModule('leaflet-directive')).toEqual(true);
    });
    it ('should include services.beacon, which is a service that wraps our understanding of beacons', function() {
      expect(hasModule('services.beacon')).toEqual(true);
    });
  })
});