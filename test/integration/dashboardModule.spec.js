"use strict";

describe('the dashboard module', function() {
  var module;
  beforeEach(function() {
    module = angular.module('modules.dashboard');
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
      deps = module.value('modules.dashboard').requires;
    });

    it ('should have modules.leaflet as a dependency', function() {
      expect(hasModule('modules.leaflet')).toEqual(true);
    });
    it ('should have dashboard.cascadingCollapse as a dependency', function() {
      expect(hasModule('dashboard.cascadingCollapse')).toEqual(true);
    });
    it ('should not have leaflet-directive as a dependency', function() {
      expect(hasModule('leaflet-directive')).not.toEqual(true);
    });
  })
});