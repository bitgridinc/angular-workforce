"use strict";

describe("the map module (unit)", function() {
  var $rootScope,
      $scope;

  beforeEach(module("app"));
  beforeEach(module("modules.providers"));
  beforeEach(module("modules.map"));
  beforeEach(inject(function(_$rootScope_, _$controller_, _MapExtentService_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    $rootScope.dataFromServer = {
      currentEntity: {
        center: {
          lat: 1,
          lng: 2,
          zoom: 3
        }
      }
    };
    _$controller_('MapController', {
      '$rootScope': $rootScope,
      '$scope': $scope,
      'MapExtentService': _MapExtentService_
    });
  }));

  it('should copy the data from the server onto the local scope, so the map can access the lat, lng, and zoom properties', function() {
    expect($scope.dataFromServer).toBe($rootScope.dataFromServer);
  });
});
