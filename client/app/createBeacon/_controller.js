"use strict";

var CreateBeaconController = function($scope, NewBeaconFactory, RecipientService, _, toaster) {
  var _this = this;
  _this.chain = _.chain;
  _this.recipientService = RecipientService;

  NewBeaconFactory.initScope($scope);

  $scope.completeNewBeacon = function() {
    var recipientIds = _this.recipientService.getIncludedRecipientIds();
    NewBeaconFactory.postNewBeacon(recipientIds).then(function(result) {
      // I'm just putting this here to remember how it's done. I expect to move this around.
      toaster.pop(_this.bread(result));
      $scope.navigationService.navigateTo(
        'dashboard.beacons.detail',
        { id: result.data.newBeaconId });
    });
  };
};

CreateBeaconController.prototype.bread = function(result) {
  // TODO: Handle error in result and test
  return { // pass a high timeout to keep the toaster longer
    type: 'success',
    title: 'Success!',
    body: 'Your aid beacon is in effect'
  };
};

CreateBeaconController.$inject = ['$scope', 'NewBeaconFactory', 'RecipientService', '_', 'toaster'];

require('./_module').controller('CreateBeaconController', CreateBeaconController);
