"use strict";

describe('the offer assistance controller', function() {
  var $scope;

  beforeEach(module('modules.offerAssistance'));
  beforeEach(inject(function (_$rootScope_, _$controller_) {
    $scope = _$rootScope_.$new();

    _$controller_('OfferAssistanceController', {
      $scope: $scope
    });
  }));

  it ('should configure scope with the default values for an assistance offer', function () {
    expect($scope.assistanceOffer.numResponders).toBe(2);
  });
});
