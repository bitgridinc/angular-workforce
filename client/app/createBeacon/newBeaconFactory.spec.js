"use strict";

describe('the new beacon creation factory', function() {
  var scope,
      factory,
      messagePacketizer,
      messageSendingService;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function ($rootScope, _NewBeaconFactory_, MessagePacketizer, MessageSendingService) {
    scope = $rootScope.$new();
    factory = _NewBeaconFactory_;
    messagePacketizer = MessagePacketizer;
    messageSendingService = MessageSendingService;
  }));
  beforeEach(function () {
    spyOn(scope, '$on');
    factory.initScope(scope);
  });

  it ('should configure scope with the default values for a new project', function () {
    expect(scope.title).toBeDefined();
    expect(scope.description).toBeDefined();
    expect(scope.latitude).toBeDefined();
    expect(scope.longitude).toBeDefined();
  });
  it ('should set up a watch to be notified when the user clicks on the map', function () {
    expect(scope.$on).toHaveBeenCalledWith('leafletDirectiveMap.click', factory.onMapClicked);
  });

  describe ('after the scope values are changed', function () {
    var newTitle = 'New Title',
        newDescription = 'New Description',
        newLatitude = 1,
        newLongitude = 2;

    beforeEach(function () {
      scope.title = newTitle;
      scope.description = newDescription;
      scope.latitude = newLatitude;
      scope.longitude = newLongitude;
    });

    describe ('the method to post a new beacon', function () {
      var packetizedMessage = {
        title: newTitle,
        description: newDescription,
        lat: newLatitude,
        lng: newLongitude
      };

      beforeEach(function () {
        spyOn(messagePacketizer, 'packetize').and.returnValue(packetizedMessage);
        spyOn(messageSendingService, 'send');
        factory.postNewBeacon();
      });

      it ('should pass the scoped values to the packetizer', function () {
        expect(messagePacketizer.packetize).toHaveBeenCalledWith(packetizedMessage);
      });
      it ('should pass the packetized message data to the socket', function () {
        expect(messageSendingService.send).toHaveBeenCalledWith(packetizedMessage);
      });
    });
  });
});