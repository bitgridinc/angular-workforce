"use strict";

describe("the map module (unit)", function() {
  var $scope;

  beforeEach(module("app"));
  beforeEach(module("modules.providers"));
  beforeEach(module("modules.map"));
  beforeEach(inject(function(_$rootScope_, _$controller_, _MapExtentService_, _LeafletService_) {
    $scope = _$rootScope_.$new();
    $scope.dataFromServer = {
      currentOrganization: {
        center: {
          lat: 1,
          lng: 2,
          zoom: 3
        }
      }
    };

    _$controller_('MapController', {
      '$scope': $scope,
      'MapExtentService': _MapExtentService_,
      'LeafletService' : _LeafletService_
    });
  }));

  /*it('should copy the data from the server onto the local scope, so the map can access the lat, lng, and zoom properties', function() {
    //expect($scope.dataFromServer).toBe($rootScope.dataFromServer);
  });*/
});
