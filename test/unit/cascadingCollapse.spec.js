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

  it('should set the cascadingCollapse property', function() {
    expect(scope.cascadingCollapse).toBeDefined();
  });
  it('should set the cascadingCollapse.showMidColumn property to true', function() {
    expect(scope.cascadingCollapse.showMidColumn).toBe(true);
  });
  it('should set the cascadingCollapse.showRightColumn property to true', function() {
    expect(scope.cascadingCollapse.showRightColumn).toBe(true);
  });
  it('should return false for only showRightColumn after it is set to false', function() {
    controller.showRightColumn = false;
    expect(scope.cascadingCollapse.showMidColumn).toBe(true);
    expect(scope.cascadingCollapse.showRightColumn).toBe(false);
  });
  /*it('should return false for both properties after showMidColumn is set to false', function() {
    controller.showMidColumn = false;
    expect(scope.cascadingCollapse.showMidColumn).toBe(false);
    expect(scope.cascadingCollapse.showRightColumn).toBe(false);
  });*/
});
