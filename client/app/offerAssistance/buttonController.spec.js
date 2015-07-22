"use strict";

describe('the ButtonController', function() {
  var $rootScope
    , restService
    , sut;

  beforeEach(module('modules.offerAssistance'));
  beforeEach(inject(function (_$rootScope_, _$controller_, NavigationService, MessagePacketizerService, RestService) {
    $rootScope = _$rootScope_;

    restService = RestService;
    spyOn(restService, 'offerAssistance');

    $rootScope.navigationService = NavigationService;
    spyOn($rootScope.navigationService, 'navigateTo');

    $rootScope.$stateParams = {
      id: '1'
    };
    $rootScope.dataFromServer = {
      currentOrganization: {
        id: '2'
      }
    };

    sut = _$controller_('ButtonController', {
      $rootScope: $rootScope,
      MessagePacketizerService: MessagePacketizerService,
      RestService: restService
    })
  }));

  describe ('sending the assistance offer', function () {
    var assistanceOffer;
    beforeEach(function () {
      // Arrange
      assistanceOffer = {
        numResponders: 2,
        arrivalDate: new Date()
      };

      // Act
      sut.respond(assistanceOffer);
    });

    it('should pass the packetized message data to the socket', function () {
      expect(restService.offerAssistance).toHaveBeenCalledWith({
        contents: {
          numResponders: assistanceOffer.numResponders,
          arrivalDate: assistanceOffer.arrivalDate
        },
        senderId : $rootScope.dataFromServer.currentOrganization.id,
        beaconId : $rootScope.$stateParams.id,
        recipientIds: undefined
      });
    });
    it('should change our page state', function () {
      expect($rootScope.navigationService.navigateTo).toHaveBeenCalledWith('dashboard.beacons.list');
    });
  });
});
