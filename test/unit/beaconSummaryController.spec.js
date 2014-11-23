"use strict";

describe("the controller for beacon summaries", function() {
  var scope,
    controller;

  beforeEach(module("modules.dashboard"));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('BeaconSummaryController', {
      '$scope': scope
    });
  }));

  it('should should be defined in Angular', function() {
    expect(controller).toBeDefined();
  });

  it('should expose a click handler', function() {
    expect(scope.onClick).toBeDefined();
  });
});