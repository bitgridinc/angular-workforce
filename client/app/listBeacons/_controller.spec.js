"use strict";

describe('the beacon list controller', function() {
  var $scope
    , $rootScope;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;

    _$controller_('ListBeaconsController', {
      '$scope': $scope,
      '$rootScope': $rootScope
    });

    // Set up a mock navigationService and spy on the navigateTo method
    $rootScope.navigationService = {
      navigateTo: function() {}
    };
    spyOn($rootScope.navigationService, 'navigateTo');
  }));

  it('should navigate to the beacon\'s details page when it is clicked', function() {
    // Arrange
    var beacon = { id: 1 };

    // Act
    $scope.onSelectBeacon(beacon);

    // Assert
    expect($rootScope.navigationService.navigateTo).toHaveBeenCalledWith('^.detail', { id: beacon.id });
  });
  it('should navigate to the beacon\'s offers of assistance when the mail icon on a beacon is clicked', function() {
    // Arrange
    var beacon = { id: 1 };

    // Act
    $scope.onReviewAssistance(beacon);

    // Assert
    expect($rootScope.navigationService.navigateTo).toHaveBeenCalledWith('^.detail.review', { id: beacon.id });
  });
});
