"use strict";

describe('the offer assistance controller', function() {
  var $rootScope,
      $scope,
      stateService,
      restService;

  beforeEach(module('modules.offerAssistance'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _StateService_, MessagePacketizerService, RestService) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    stateService = _StateService_;
    restService = RestService;

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

    _$controller_('OfferAssistanceController', {
      $scope: $scope,
      $rootScope: $rootScope,
      StateService: stateService,
      MessagePacketizerService: MessagePacketizerService,
      RestService: restService
    })
  }));

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
      spyOn(stateService, 'go');
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
        expect(stateService.go).toHaveBeenCalled();
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
        expect(stateService.go).toHaveBeenCalled();
      });
    });
  });
});
