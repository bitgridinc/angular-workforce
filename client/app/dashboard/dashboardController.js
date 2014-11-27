"use strict";

var app = require('./_module_init.js');

app.controller('DashboardController', function($scope, UserSelectionService, DashboardUiState) {

  $scope.dashboardUiState = DashboardUiState;

  // TODO: Remove this by exposing it through ReviewAssistance controller
  $scope.userSelectionService = UserSelectionService;
});

app.controller('requestController', function($scope, BeaconService, DashboardUiState) {
  angular.extend($scope, {
    newBeaconData: {
      title: 'Job Title',
      description: 'Project Description',
      organization: 'Organization',
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
      this.closeCreateBeaconView();
    },
    deleteNewBeacon: function() {
      console.log("deleteNewBeacon called.");
      this.closeCreateBeaconView();
    },
    closeCreateBeaconView: function() {
      DashboardUiState.isCreatingBeacon = false;
    }
  });

  // I'm using this to easily populate the latitude and longitude fields on Create Beacon
  $scope.$on("leafletDirectiveMap.click", function(clickEvent, clickArgs) {
    console.log('leafletDirectiveMap.click');
    $scope.newBeaconData.latitude = clickArgs.leafletEvent.latlng.lat;
    $scope.newBeaconData.longitude = clickArgs.leafletEvent.latlng.lng;
  });
});

app.controller('respondController', function($scope) {
  $scope.assistForm = {};
  $scope.assistForm.responderName = "Helper";
  $scope.assistForm.numResponders = 2;

  $scope.assistForm.offerAssistance = function() {
    console.log("You've accepted! $scope:", $scope);
    angular.extend($scope.ngDialogData, {
      responderName: $scope.assistForm.responderName,
      numResponders: $scope.assistForm.numResponders
    });
  };
  $scope.assistForm.declineAssistance = function() {
    console.log("You've declined! $scope:", $scope);
  };
});