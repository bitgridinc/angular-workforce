"use strict";

describe('the colored container height controller', function() {
  var $scope;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function (_$rootScope_, _$controller_) {
    $scope = _$rootScope_.$new();

    _$controller_('ColoredContainerHeightController', {
      $scope: $scope
    });
  }));

  it('should set a reasonable starting height for the colored container', function() {
    expect($scope.coloredContainerHeight).toBe(130);
  });
  it('should expand the colored container height when the description textarea grows and include some space for the title input', function() {
    var newDescriptionTextareaHeight = 300;
    $scope.$broadcast('elastic:resize', [{ offsetHeight: newDescriptionTextareaHeight }]);
    expect($scope.coloredContainerHeight).toBeGreaterThan(newDescriptionTextareaHeight + 50);
  });
});