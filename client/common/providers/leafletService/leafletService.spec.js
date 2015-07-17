"use strict";

describe('the leaflet service', function() {
  var mockWindow
    , mockLeafletData
    , leafletService;

  beforeEach(module('modules.providers'));
  beforeEach(function() {
    mockWindow = jasmine.createSpyObj('$window', ['L']);
    mockWindow.L.esri = jasmine.createSpy();
    mockLeafletData = jasmine.createSpyObj('leafletData', ['getMap']);

    module(function($provide) {
      $provide.value('$window', mockWindow);
      $provide.value('leafletData', mockLeafletData);
    });

    inject(function($injector) {
      leafletService = $injector.get('LeafletService');
    });
  });
});
