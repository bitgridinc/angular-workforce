"use strict";

var app = angular.module('modules.createBeacon', []);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard.mycompany.create', {
      name: 'dashboard.mycompany.create',
      parent: 'dashboard.mycompany',
      url: '/create',
      templateUrl: 'templates/createBeacon/view.tpl.html'
    })
}]);

app.controller('CreateBeaconController', function($scope, $state, BeaconService) {
  // For debugging purposes
  $scope.name = 'CreateBeaconController';

  function closeCreateBeaconView() {
    $state.go('^.list');
  }

  angular.extend($scope, {
    newBeaconData: {
      title: 'My Project',
      description: 'My Description',
      organization: 'My Company',
      latitude: 38.914268,
      longitude: -77.021098
    },
    submitNewBeacon: function() {
      console.log("submitNewBeacon called.", $scope);
      BeaconService.createBeacon({
        title: $scope.newBeaconData.title,
        description: $scope.newBeaconData.description,
        organization: $scope.newBeaconData.organization,
        lat: $scope.newBeaconData.latitude,
        lng: $scope.newBeaconData.longitude
      });
      closeCreateBeaconView();
    },
    deleteNewBeacon: function() {
      console.log("deleteNewBeacon called.");
      closeCreateBeaconView();
    }
  });

  // When the map is clicked, update the latitude and longitude fields in the form
  $scope.$on("leafletDirectiveMap.click", function(clickEvent, clickArgs) {
    console.log('leafletDirectiveMap.click');
    $scope.newBeaconData.latitude = clickArgs.leafletEvent.latlng.lat;
    $scope.newBeaconData.longitude = clickArgs.leafletEvent.latlng.lng;
  });
});