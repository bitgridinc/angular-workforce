"use strict";

describe('the module that displays the Leaflet map', function() {
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

    it ('should include our services module', function() {
      expect(hasModule('modules.services')).toEqual(true);
    });
    it ('should include Angular directives for Leaflet', function() {
      expect(hasModule('leaflet-directive')).toEqual(true);
    });
  })
});