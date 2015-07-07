"use strict";

describe('the mouseLocationController', function() {
  var $scope
    , usngService
    , leafletData
    , mapCallback
    , mapSpyObj;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function(_$controller_, $rootScope, _UsngService_) {
    $scope = $rootScope.$new();
    usngService = _UsngService_;

    $scope.beaconData = {};

    leafletData = jasmine.createSpyObj('leafletData', ['getMap']);
    leafletData.getMap.and.returnValue({
      then: function(callback) {
        mapCallback = callback;
      }
    });

    _$controller_('MouseLocationController', {
      $scope: $scope,
      leafletData: leafletData,
      UsngService: usngService
    });

    mapSpyObj = jasmine.createSpyObj('map', ['on']);
    mapCallback(mapSpyObj);
  }));

  it('should set a mousemove handler', function () {
    // Assert
    expect(mapSpyObj.on).toHaveBeenCalledWith('mousemove', jasmine.any(Function));
  });
  it('should set a click handler', function () {
    // Assert
    expect(mapSpyObj.on).toHaveBeenCalledWith('click', jasmine.any(Function));
  });

  describe('testing the event handlers', function() {
    var eventArgs = {
      latlng: {
        lat: 38.598,
        lng: -86.23
      }
    };
    var expectedUsngCoordinate = '16SEH6705272449';

    it('should set a mousemove handler that updates $scope.mouseLocation.usng', function() {
      // Arrange
      var handler = mapSpyObj.on.calls.argsFor(0)[1];

      // Act
      handler(eventArgs);

      // Assert
      expect($scope.mouseLocation.usng).toBe(expectedUsngCoordinate);
    });
    it('should set a click handler that updates $scope.beaconData.usng', function() {
      // Arrange
      var handler = mapSpyObj.on.calls.argsFor(1)[1];

      // Act
      handler(eventArgs);

      // Assert
      expect($scope.beaconData.usng).toBe(expectedUsngCoordinate);
    });
  });
});