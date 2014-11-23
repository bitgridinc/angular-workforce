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

    it ('should include our beacon service', function() {
      expect(hasModule('services.beacon')).toEqual(true);
    });
    it ('should include our service to manage showing beacon details when their summaries are clicked', function() {
      expect(hasModule('services.beaconDetailsFromSummary')).toEqual(true);
    });
    it ('should include our Leaflet module', function() {
      expect(hasModule('modules.leaflet')).toEqual(true);
    });
    it ('should include our cascading collapse module', function() {
      expect(hasModule('modules.cascadingCollapse')).toEqual(true);
    });
    it ('should include the Angular routing service', function() {
      expect(hasModule('ngRoute')).toEqual(true);
    });
    it ('should include the Angular bootstrap module', function() {
      expect(hasModule('ui.bootstrap')).toEqual(true);
    });
    it ('should include an open source dialog module', function() {
      expect(hasModule('ngDialog')).toEqual(true);
    });
    it ('should not include Leaflet directives; they should be wrapped by the Leaflet module', function() {
      expect(hasModule('leaflet-directive')).not.toEqual(true);
    });
  })
});