"use strict";

describe('the map module (integration)', function() {
  var module;
  beforeEach(function() {
    module = angular.module('modules.map');
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
      moduleDependencies = module.value('modules.map').requires;
    });

    it ('should only depend on a single module - haha, gotta TDD!', function() {
      expect(moduleDependencies.length).toEqual(1);
    });
    it ('should include Angular directives for Leaflet', function() {
      expect(dependencyListHasModule('esri.map')).toEqual(true);
    });
  })
});
