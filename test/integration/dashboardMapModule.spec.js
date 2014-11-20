"use strict";

describe('the dashboard.map module', function() {
  var module;
  beforeEach(function() {
    module = angular.module('dashboard.map');
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
      deps = module.value('dashboard.map').requires;
    });

    it ('should have leaflet-directive as a dependency', function() {
      expect(hasModule('leaflet-directive')).toEqual(true);
    });
  })
});