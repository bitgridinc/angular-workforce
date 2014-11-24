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
    var deps;
    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };
    beforeEach(function() {
      deps = module.value('app').requires;
    });

    it ('should include our directives module so that all our modules can access them', function() {
      expect(hasModule('modules.directives')).toEqual(true);
    });
    it ('should include our services module so that all our modules can access them', function() {
      expect(hasModule('modules.services')).toEqual(true);
    });
    it ('should include our dashboard module', function() {
      expect(hasModule('modules.dashboard')).toEqual(true);
    });
    it ('should include Angular\'s routing module', function() {
      expect(hasModule('ngRoute')).toEqual(true);
    });
  })
});