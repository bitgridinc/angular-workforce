"use strict";

describe('the module managing the dashboard', function() {
  var module;
  beforeEach(function() {
    module = angular.module('modules.dashboard');
  });

  it('should be registered', function() {
    expect(module).toBeDefined();
  });

  describe('and its dependencies', function() {
    var deps;
    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };
    beforeEach(function() {
      deps = module.value('modules.dashboard').requires;
    });

    it('should include our Leaflet module', function() {
      expect(hasModule('modules.leaflet')).toEqual(true);
    });
    it('should include the Angular routing service', function() {
      expect(hasModule('ngRoute')).toEqual(true);
    });
    it('should include the Angular bootstrap module', function() {
      expect(hasModule('ui.bootstrap')).toEqual(true);
    });

    it('should not include our directives module because the app module does', function() {
      expect(hasModule('modules.directives')).not.toEqual(true);
    });
    it('should not include our services module because the app module does', function() {
      expect(hasModule('modules.services')).not.toEqual(true);
    });
    it('should not include Leaflet directives; they should be wrapped by the Leaflet module', function() {
      expect(hasModule('leaflet-directive')).not.toEqual(true);
    });
  })
});