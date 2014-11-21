"use strict";

describe('the modules.leaflet module', function() {
  var module;
  beforeEach(function() {
    module = angular.module('modules.leaflet');
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
      deps = module.value('modules.leaflet').requires;
    });

    it ('should have leaflet-directive as a dependency', function() {
      expect(hasModule('leaflet-directive')).toEqual(true);
    });
    it ('should have app.services as a dependency', function() {
      expect(hasModule('app.services')).toEqual(true);
    });
  })
});