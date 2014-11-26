"use strict";

var app = require('./_module_init.js');

app.controller('DashboardController', function($scope, leafletData, ngDialog, BeaconService, UserSelectionService) {

  // This is currently needed by the ng-repeat in dashboard.html. TODO: Factor out the dashboard UI.
  $scope.markers = BeaconService.beacons;

  // TODO: Remove this by exposing it through ReviewAssistance controller
  $scope.userSelectionService = UserSelectionService;

  //TODO: Why does this only work when wrapped with status object?
  $scope.status = {
    showReviewAssistancePartial: undefined,
    offerAssistance: undefined
  };

  // I'm using this to easily populate the latitude and longitude fields on Create Beacon
  $scope.$on("leafletDirectiveMap.click", function(clickEvent, clickArgs) {
    console.log('leafletDirectiveMap.click');
    $scope.lastlatlng = clickArgs.leafletEvent.latlng;
  });

  // clickArgs will contain the marker name and other relevant information
  $scope.$on('leafletDirectiveMarker.click', function(clickEvent, clickArgs) {
    console.log('Opening dialog to respond to clicked beacon.', clickArgs.leafletEvent.target);
    var lastSelectedMarker = clickArgs.leafletEvent.target;

    ngDialog.openConfirm({
      template: '/templates/respond.html',
      className: 'ngdialog-theme-default',
      controller: 'respondController',
      data: clickArgs.leafletEvent.target.options
    }).then(function(ngDialogData) {
      console.log('Modal response dialog promise resolved. Value: ', ngDialogData);
      for (var i = 0; i < BeaconService.beacons.length; i++) {
        if (BeaconService.beacons[i].$$hashKey === lastSelectedMarker.options.$$hashKey) {
          BeaconService.beacons[i].responderName = ngDialogData.responderName;
          BeaconService.beacons[i].numResponders = ngDialogData.numResponders;
        }
      }
    }, function(reason) {
      console.log('Modal response dialog promise rejected. Reason: ', reason);
    });
  });
});

app.controller('requestController', function($scope, BeaconService) {
  angular.extend($scope, {
    newBeaconData: {
      title: 'Job Title',
      description: 'Project Description',
      organization: 'Organization'
    },
    submitNewBeacon: function() {
      console.log("submitNewBeacon called.", $scope);
      BeaconService.createBeacon({
        title: $scope.newBeaconData.title,
        description: $scope.newBeaconData.description,
        organization: $scope.newBeaconData.organization,
        lat: $scope.lastlatlng.lat,
        lng: $scope.lastlatlng.lng
      });
      $scope.cascadingCollapse.showRightColumn = false;
    },
    deleteNewBeacon: function() {
      console.log("deleteNewBeacon called.");
      $scope.cascadingCollapse.showRightColumn = false;
    }
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