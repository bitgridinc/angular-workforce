"use strict";

describe('the offer assistance controller', function() {
  var $rootScope,
      $scope,
      restService;

  beforeEach(module('modules.offerAssistance'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _UserNavigationService_, MessagePacketizerService, RestService) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    restService = RestService;

    $rootScope.userNavigationService = _UserNavigationService_;
    $rootScope.selectionState = {
      currentBeacon: {
        id: '1'
      }
    };
    $rootScope.dataFromServer = {
      currentEntity: {
        id: '2'
      }
    };

    spyOn(restService, 'getAllUsers').and.callThrough();

    _$controller_('OfferAssistanceController', {
      $scope: $scope,
      $rootScope: $rootScope,
      MessagePacketizerService: MessagePacketizerService,
      RestService: restService
    })
  }));

  it ('should call to get all users', function() {
    expect(restService.getAllUsers).toHaveBeenCalled();
    // TODO: verify that $scope.users gets set
  });

  it ('should configure scope with the default values for an assistance offer', function () {
    expect($scope.assistanceOffer).toBeDefined();
    expect($scope.assistanceOffer.numResponders).toBeDefined();
    expect($scope.assistanceOffer.arrivalDate).toBeDefined();
  });

  describe ('after the scope values are changed', function () {
    var newNumResponders = 5,
        newArrivalDate = new Date();

    beforeEach(function () {
      $scope.assistanceOffer.numResponders = newNumResponders;
      $scope.assistanceOffer.arrivalDate = newArrivalDate;
    });
    beforeEach(function () {
      spyOn(restService, 'offerAssistance');
      spyOn($rootScope.userNavigationService, 'navigateTo');
    });

    describe ('sending the assistance offer', function () {
      beforeEach(function () {
        $scope.respond(true);
      });

      it ('should pass the packetized message data to the socket', function () {
        expect(restService.offerAssistance).toHaveBeenCalledWith({
          contents: {
            numResponders: newNumResponders,
            arrivalDate: newArrivalDate
          },
          senderId : $rootScope.dataFromServer.currentEntity.id,
          beaconId : $rootScope.selectionState.currentBeacon.id,
          recipientIds: undefined
        });
      });
      it ('should change our page state', function () {
        expect($rootScope.userNavigationService.navigateTo).toHaveBeenCalled();
      });
    });

    describe ('cancelling the assistance offer', function () {
      beforeEach(function () {
        $scope.respond(false);
      });

      it ('should not make a socket call', function () {
        expect(restService.offerAssistance).not.toHaveBeenCalled();
      });
      it ('should change our page state', function () {
        expect($rootScope.userNavigationService.navigateTo).toHaveBeenCalled();
      });
    });
  });
});
