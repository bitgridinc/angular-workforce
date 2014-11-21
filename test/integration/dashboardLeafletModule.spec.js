"use strict";

describe('the dashboard.leaflet module', function() {
  var module;
  beforeEach(function() {
    module = angular.module('dashboard.leaflet');
  });

  it('should be registered', function() {
    expect(module).toBeDefined();
  });

  describe('dependencies', function() {
    var deps;
    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };
    beforeEach(function() {
      deps = module.value('dashboard.leaflet').requires;
    });

    it ('should have leaflet-directive as a dependency', function() {
      expect(hasModule('leaflet-directive')).toEqual(true);
    });
  })
});