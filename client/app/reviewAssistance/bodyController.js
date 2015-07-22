"use strict";

var BodyController = function(_, $scope, MessagePacketizerService, RestService) {
  console.log('Entering ReviewAssistanceBodyController');

  $scope.$watchCollection('dataFromServer.beacons', function(newValue) {
    console.log('dataFromServer.beacons changed', newValue);
    if (angular.isDefined(newValue) && newValue.length > 0) {
      // TODO: Factor this out. I've seen it repeated.
      $scope.currentBeacon = $scope.findBeaconById($scope.$stateParams.id);
      $scope.currentResponse = $scope.currentBeacon && _.find($scope.currentBeacon.responses, function(response) {
          return response.id === $scope.$stateParams.responseId;
        });
      $scope.senderOrganization = $scope.currentResponse && $scope.findOrganizationById($scope.currentResponse.senderId);
    }
  });

  $scope.acceptAssistance = function() {
    // TODO: This is garbage :P
    console.log("Offering this many people to help: ", $scope.currentResponse.numResponders);
    var message = MessagePacketizerService.packetize($scope.currentResponse.id);
    RestService.acceptAssistance(message);

    // Clear the watch we set in ReviewAssistanceController
    $scope.responsesWatch();

    $scope.navigationService.navigateTo('dashboard.beacons.list');
  };
};

BodyController.$inject =['_', '$scope', 'MessagePacketizerService', 'RestService'];

require('./_module').controller('BodyController', BodyController);
