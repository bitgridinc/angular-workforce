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
    var moduleDependencies;
    var dependencyListHasModule = function(moduleName) {
      return moduleDependencies.indexOf(moduleName) >= 0;
    };

    beforeEach(function() {
      moduleDependencies = module.value('app').requires;
    });

    beforeEach(function() {
      moduleDependencies = module.value('modules.leaflet').requires;
    });

    it ('should only depend on a single module - haha, gotta TDD!', function() {
      expect(moduleDependencies.length).toEqual(1);
    });
    it ('should include Angular directives for Leaflet', function() {
      expect(dependencyListHasModule('leaflet-directive')).toEqual(true);
    });
  })
});