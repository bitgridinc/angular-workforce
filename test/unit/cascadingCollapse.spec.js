"use strict";

describe("cascadingCollapse", function() {
  var scope,
      controller;

  beforeEach(module("dashboard.cascadingCollapse"));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('CascadingCollapseCtrl', {
      '$scope': scope
    });
  }));

  it('should define the cascadingCollapse object with showMidColumn and showRightColumn properties', function() {
    expect(scope.cascadingCollapse).toBeDefined();
    expect(scope.cascadingCollapse.showMidColumn).toBeDefined();
    expect(scope.cascadingCollapse.showRightColumn).toBeDefined();
  });
  it('should set the cascadingCollapse.showMidColumn property to true', function() {
    expect(scope.cascadingCollapse.showMidColumn).toBe(true);
  });
  it('should set the cascadingCollapse.showRightColumn property to true', function() {
    expect(scope.cascadingCollapse.showRightColumn).toBe(true);
  });
  it('should allow showRightColumn to be set to false', function() {
    scope.cascadingCollapse.showRightColumn = false;
    expect(scope.cascadingCollapse.showMidColumn).toBe(true);
    expect(scope.cascadingCollapse.showRightColumn).toBe(false);
  });
  it('should return false for both properties after showMidColumn is set to false', function() {
    scope.cascadingCollapse.showMidColumn = false;
    expect(scope.cascadingCollapse.showMidColumn).toBe(false);
    expect(scope.cascadingCollapse.showRightColumn).toBe(false);
  });
});
