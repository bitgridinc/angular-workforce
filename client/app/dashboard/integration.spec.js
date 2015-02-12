"use strict";

describe('the module managing the dashboard (integration)', function() {
  var module;
  beforeEach(function() {
    module = angular.module('modules.dashboard');
  });

  it('should be registered', function() {
    expect(module).toBeDefined();
  });

  describe('and its dependencies', function() {
    var moduleDependencies;
    var dependencyListHasModule = function(moduleName) {
      return moduleDependencies.indexOf(moduleName) >= 0;
    };

    beforeEach(function() {
      moduleDependencies = module.value('app').requires;
    });

    beforeEach(function() {
      moduleDependencies = module.value('modules.dashboard').requires;
    });

    it ('should only depend on the following two modules - haha, gotta TDD!', function() {
      expect(moduleDependencies.length).toEqual(3);
    });
    it('should include our Leaflet module', function() {
      expect(dependencyListHasModule('modules.beaconControl')).toEqual(true);
    });
    it('should include our Leaflet module', function() {
      expect(dependencyListHasModule('modules.header')).toEqual(true);
    });
    it('should include our Leaflet module', function() {
      expect(dependencyListHasModule('modules.map')).toEqual(true);
    });

    it('should not include our directives module because the app module does', function() {
      expect(dependencyListHasModule('modules.directives')).not.toEqual(true);
    });
    it('should not include our services module because the app module does', function() {
      expect(dependencyListHasModule('modules.providers')).not.toEqual(true);
    });
    it('should not include Leaflet directives; they should be wrapped by the Leaflet module', function() {
      expect(dependencyListHasModule('leaflet-directive')).not.toEqual(true);
    });
  })
});
