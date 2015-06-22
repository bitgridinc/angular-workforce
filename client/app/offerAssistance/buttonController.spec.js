"use strict";

describe('the ButtonController', function() {
  var $rootScope
    , $scope
    , restService;

  beforeEach(module('modules.offerAssistance'));
  beforeEach(inject(function (_$rootScope_, _$controller_, UserNavigationService, MessagePacketizerService, RestService) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();

    restService = RestService;
    spyOn(restService, 'offerAssistance');

    $rootScope.userNavigationService = UserNavigationService;
    spyOn($rootScope.userNavigationService, 'navigateTo');

    $rootScope.selectionState = {
      currentBeacon: {
        id: '1'
      }
    };
    $rootScope.dataFromServer = {
      currentOrganization: {
        id: '2'
      }
    };
    $scope.assistanceOffer = {
      numResponders: 2,
      arrivalDate: new Date()
    };

    _$controller_('ButtonController', {
      $scope: $scope,
      $rootScope: $rootScope,
      MessagePacketizerService: MessagePacketizerService,
      RestService: restService
    })
  }));

  describe ('sending the assistance offer', function () {
    beforeEach(function () { $scope.respond(true); });

    it('should pass the packetized message data to the socket', function () {
      expect(restService.offerAssistance).toHaveBeenCalledWith({
        contents: {
          numResponders: $scope.assistanceOffer.numResponders,
          arrivalDate: $scope.assistanceOffer.arrivalDate
        },
        senderId : $rootScope.dataFromServer.currentOrganization.id,
        beaconId : $rootScope.selectionState.currentBeacon.id,
        recipientIds: undefined
      });
    });
    it('should change our page state', function () {
      expect($rootScope.userNavigationService.navigateTo).toHaveBeenCalledWith('dashboard.beacons.list');
    });
  });

  describe ('cancelling the assistance offer', function () {
    beforeEach(function () { $scope.respond(false); });

    it('should not make a socket call', function () {
      expect(restService.offerAssistance).not.toHaveBeenCalled();
    });
    it('should change our page state', function () {
      expect($rootScope.userNavigationService.navigateTo).toHaveBeenCalledWith('dashboard.beacons.list');
    });
  });
});
