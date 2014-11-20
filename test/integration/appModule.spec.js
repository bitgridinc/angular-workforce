"use strict";

describe('app module', function() {
  var module;
  beforeEach(function() {
    module = angular.module('app');
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
      deps = module.value('app').requires;
    });

    it ('should have ngRoute as a dependency', function() {
      expect(hasModule('ngRoute')).toEqual(true);
    });
    it ('should have dashboard as a dependency', function() {
      expect(hasModule('dashboard')).toEqual(true);
    });
    it ('should have leaflet-directive as a dependency', function() {
      expect(hasModule('leaflet-directive')).toEqual(true);
    });
  })
});