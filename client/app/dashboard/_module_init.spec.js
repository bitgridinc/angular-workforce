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

    it ('should only depend on the following three modules - haha, gotta TDD!', function() {
      expect(moduleDependencies.length).toEqual(3);
    });
    it('should include our Leaflet module', function() {
      expect(dependencyListHasModule('modules.leaflet')).toEqual(true);
    });
    it('should include the Angular routing service', function() {
      expect(dependencyListHasModule('ngRoute')).toEqual(true);
    });
    it('should include the Angular bootstrap module', function() {
      expect(dependencyListHasModule('ui.bootstrap')).toEqual(true);
    });

    it('should not include our directives module because the app module does', function() {
      expect(dependencyListHasModule('modules.directives')).not.toEqual(true);
    });
    it('should not include our services module because the app module does', function() {
      expect(dependencyListHasModule('modules.services')).not.toEqual(true);
    });
    it('should not include Leaflet directives; they should be wrapped by the Leaflet module', function() {
      expect(dependencyListHasModule('leaflet-directive')).not.toEqual(true);
    });
  })
});