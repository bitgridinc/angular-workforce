"use strict";

// TODO: Test everything!
function MapBehaviorController($scope, MapExtentService) {
  var cleanup;

  cleanup = $scope.$watch('$stateParams.id', function(selectedBeaconId) {
    var selectedBeacon = $scope.findBeaconById(selectedBeaconId);
    if (angular.isDefined(selectedBeacon)) {
      var mustContainPoints = [
        [ $scope.dataFromServer.currentOrganization.center.lat, $scope.dataFromServer.currentOrganization.center.lng ],
        [ selectedBeacon.lat, selectedBeacon.lng ]
      ];
      MapExtentService.ensureContainsPoints(mustContainPoints);
    }
  });

  $scope.$on('$destroy', function() {
    cleanup();
  });
}

MapBehaviorController.$inject = ['$scope', 'MapExtentService'];

require('./_module').controller('MapBehaviorController', MapBehaviorController);
