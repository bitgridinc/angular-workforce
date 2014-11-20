"use strict";

describe('the dashboard module', function() {
  var module;
  beforeEach(function() {
    module = angular.module('dashboard');
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
      deps = module.value('dashboard').requires;
    });

    it ('should have dashboard.map as a dependency', function() {
      expect(hasModule('dashboard.map')).toEqual(true);
    });
    it ('should have dashboard.cascadingCollapse as a dependency', function() {
      expect(hasModule('dashboard.cascadingCollapse')).toEqual(true);
    });
  })
});