"use strict";

describe('the root module', function() {
  var module;
  beforeEach(function() {
    module = angular.module('app');
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

    it ('should include our directives module so that all our modules can access them', function() {
      expect(dependencyListHasModule('modules.directives')).toEqual(true);
    });
    it ('should include our services module so that all our modules can access them', function() {
      expect(dependencyListHasModule('modules.providers')).toEqual(true);
    });
    it ('should include our dashboard module', function() {
      expect(dependencyListHasModule('modules.dashboard')).toEqual(true);
    });
    it('should include the Angular bootstrap module', function() {
      expect(dependencyListHasModule('ui.bootstrap')).toEqual(true);
    });
    it ('should include the UI router module', function() {
      expect(dependencyListHasModule('ui.router')).toEqual(true);
    });
  })
});